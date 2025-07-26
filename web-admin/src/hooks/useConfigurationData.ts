import { useCallback, useMemo } from 'react';
import { useTableData } from './useTableData';

export const useConfigurationData = (configurationId: number) => {
  const {
    tableData,
    loading,
    error,
    fetchTableData,
    createRecord: createTableRecord,
    updateRecord: updateTableRecord,
    deleteRecord: deleteTableRecord,
    clearTableData,
  } = useTableData();

  // Get the table name for this configuration
  // This would typically come from the configuration object or API call
  const tableName = useMemo(() => {
    // For now, we'll use a generic table name based on configuration ID
    // In a real implementation, you'd fetch the actual table name from the configuration
    return `config_table_${configurationId}`;
  }, [configurationId]);

  const refreshData = useCallback(async (page: number = 1, limit: number = 10) => {
    if (configurationId) {
      await fetchTableData(tableName, page, limit);
    }
  }, [configurationId, tableName, fetchTableData]);

  const createRecord = useCallback(async (record: Record<string, any>) => {
    return await createTableRecord(tableName, record);
  }, [tableName, createTableRecord]);

  const updateRecord = useCallback(async (id: number, record: Record<string, any>) => {
    return await updateTableRecord(tableName, id, record);
  }, [tableName, updateTableRecord]);

  const deleteRecord = useCallback(async (id: number) => {
    return await deleteTableRecord(tableName, id);
  }, [tableName, deleteTableRecord]);

  // Extract the data from tableData for convenience
  const data = useMemo(() => {
    return tableData?.records || [];
  }, [tableData]);

  const pagination = useMemo(() => {
    return tableData?.pagination || {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    };
  }, [tableData]);

  return {
    data,
    pagination,
    loading,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
    refreshData,
    clearData: clearTableData,
  };
};
