import { useState, useCallback } from 'react';

interface Configuration {
  id: number;
  name: string;
  tableName: string;
  description?: string;
  columns: ConfigurationColumn[];
  createdAt: string;
  updatedAt: string;
}

interface ConfigurationColumn {
  id: number;
  columnName: string;
  dataType: string;
  isPrimaryKey: boolean;
  isRequired: boolean;
  defaultValue?: string;
}

interface CreateConfigurationData {
  name: string;
  tableName: string;
  description?: string;
  columns: Omit<ConfigurationColumn, 'id'>[];
}

const API_BASE_URL = 'http://localhost:3002/api';

export const useConfigurations = () => {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = () => {
    // Get token from localStorage or context
    return localStorage.getItem('authToken') || '';
  };

  const apiCall = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  };

  const refreshConfigurations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall('/configurations');
      setConfigurations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch configurations');
      console.error('Error fetching configurations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createConfiguration = useCallback(async (configData: CreateConfigurationData): Promise<Configuration> => {
    setLoading(true);
    setError(null);
    try {
      const newConfig = await apiCall('/configurations', {
        method: 'POST',
        body: JSON.stringify(configData),
      });
      setConfigurations(prev => [...prev, newConfig]);
      return newConfig;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConfiguration = useCallback(async (id: number, configData: Partial<CreateConfigurationData>): Promise<Configuration> => {
    setLoading(true);
    setError(null);
    try {
      const updatedConfig = await apiCall(`/configurations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(configData),
      });
      setConfigurations(prev => 
        prev.map(config => config.id === id ? updatedConfig : config)
      );
      return updatedConfig;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteConfiguration = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiCall(`/configurations/${id}`, {
        method: 'DELETE',
      });
      setConfigurations(prev => prev.filter(config => config.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete configuration');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    configurations,
    loading,
    error,
    refreshConfigurations,
    createConfiguration,
    updateConfiguration,
    deleteConfiguration,
  };
};
