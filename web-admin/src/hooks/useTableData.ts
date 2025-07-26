import { useState, useCallback } from 'react';

interface TableRecord {
  [key: string]: any;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface TableData {
  records: TableRecord[];
  pagination: PaginationInfo;
}

const API_BASE_URL = 'http://localhost:3002/api';

export const useTableData = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = () => {
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

  const fetchTableData = useCallback(async (tableName: string, page: number = 1, limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall(`/data/${tableName}?page=${page}&limit=${limit}`);
      setTableData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch table data');
      console.error('Error fetching table data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRecord = useCallback(async (tableName: string, record: Record<string, any>): Promise<TableRecord> => {
    setLoading(true);
    setError(null);
    try {
      const newRecord = await apiCall(`/data/${tableName}`, {
        method: 'POST',
        body: JSON.stringify(record),
      });
      
      // Update local state
      if (tableData) {
        setTableData(prev => prev ? {
          ...prev,
          records: [...prev.records, newRecord]
        } : null);
      }
      
      return newRecord;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create record');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableData]);

  const updateRecord = useCallback(async (tableName: string, id: string | number, record: Record<string, any>): Promise<TableRecord> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRecord = await apiCall(`/data/${tableName}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(record),
      });
      
      // Update local state
      if (tableData) {
        setTableData(prev => prev ? {
          ...prev,
          records: prev.records.map(r => 
            r.id === id || r[Object.keys(r)[0]] === id ? updatedRecord : r
          )
        } : null);
      }
      
      return updatedRecord;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update record');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableData]);

  const deleteRecord = useCallback(async (tableName: string, id: string | number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiCall(`/data/${tableName}/${id}`, {
        method: 'DELETE',
      });
      
      // Update local state
      if (tableData) {
        setTableData(prev => prev ? {
          ...prev,
          records: prev.records.filter(r => 
            r.id !== id && r[Object.keys(r)[0]] !== id
          )
        } : null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete record');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableData]);

  const clearTableData = useCallback(() => {
    setTableData(null);
    setError(null);
  }, []);

  return {
    tableData,
    loading,
    error,
    fetchTableData,
    createRecord,
    updateRecord,
    deleteRecord,
    clearTableData,
  };
};
