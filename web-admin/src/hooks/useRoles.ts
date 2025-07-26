import { useState, useCallback } from 'react';

interface Role {
  roleId: string;
  roleName: string;
  createdBy: string;
  createdDate: string;
  modifiedBy?: string;
  modifiedDate: string;
  isActive: boolean;
}

interface CreateRoleRequest {
  roleName: string;
}

interface UpdateRoleRequest {
  roleName?: string;
  isActive?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api';

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCookieValue = (name: string) => {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  };

  const getAuthToken = () => {
    // Get token from localStorage, sessionStorage, or cookie
    const token = localStorage.getItem('authToken') || 
                  sessionStorage.getItem('authToken') ||
                  getCookieValue('auth_token') || '';
    
    return token;
  };

  const apiCall = useCallback(async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'An error occurred' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall('/roles');
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const createRole = useCallback(async (roleData: CreateRoleRequest) => {
    try {
      setError(null);
      
      const response = await apiCall('/roles', {
        method: 'POST',
        body: JSON.stringify(roleData),
      });
      
      const newRole = await response.json();
      setRoles(prev => [...prev, newRole]);
      return newRole;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    }
  }, [apiCall]);

  const updateRole = useCallback(async (roleId: string, roleData: UpdateRoleRequest) => {
    try {
      setError(null);
      
      const response = await apiCall(`/roles/${roleId}`, {
        method: 'PUT',
        body: JSON.stringify(roleData),
      });
      
      const updatedRole = await response.json();
      setRoles(prev => prev.map(role => 
        role.roleId === roleId ? updatedRole : role
      ));
      return updatedRole;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    }
  }, [apiCall]);

  const deleteRole = useCallback(async (roleId: string) => {
    try {
      setError(null);
      
      await apiCall(`/roles/${roleId}`, {
        method: 'DELETE',
      });
      
      setRoles(prev => prev.filter(role => role.roleId !== roleId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    }
  }, [apiCall]);

  const refreshRoles = useCallback(() => {
    return fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    refreshRoles,
  };
};
