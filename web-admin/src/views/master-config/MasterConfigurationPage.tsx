import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Badge, Alert, Spinner } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash, HiDatabase, HiChevronRight } from 'react-icons/hi';
import { ConfigurationForm } from './ConfigurationForm';
import { DataTable } from './DataTable';
import { useConfigurations } from '../../hooks/useConfigurations';
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

export const MasterConfigurationPage: React.FC = () => {
  const {
    configurations,
    loading: configLoading,
    error: configError,
    refreshConfigurations,
    createConfiguration,
    updateConfiguration,
    deleteConfiguration,
  } = useConfigurations();

  const [selectedConfiguration, setSelectedConfiguration] = useState<Configuration | null>(null);
  const [editingConfig, setEditingConfig] = useState<Configuration | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'data' | 'form'>('list');

  useEffect(() => {
    refreshConfigurations();
  }, [refreshConfigurations]);

  const handleCreateConfiguration = () => {
    setEditingConfig(null);
    setViewMode('form');
  };

  const handleEditConfiguration = (config: Configuration) => {
    setEditingConfig(config);
    setViewMode('form');
  };

  const handleDeleteConfiguration = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      try {
        await deleteConfiguration(id);
        // If we're viewing data for the deleted config, switch back to list
        if (selectedConfiguration && selectedConfiguration.id === id) {
          setSelectedConfiguration(null);
          setViewMode('list');
        }
      } catch (err) {
        console.error('Failed to delete configuration:', err);
      }
    }
  };

  const handleViewData = (config: Configuration) => {
    setSelectedConfiguration(config);
    setViewMode('data');
  };

  const handleConfigurationSaved = async (configData: any) => {
    try {
      if (editingConfig) {
        await updateConfiguration(editingConfig.id, configData);
      } else {
        await createConfiguration(configData);
      }
      setEditingConfig(null);
      setViewMode('list');
    } catch (err) {
      console.error('Failed to save configuration:', err);
    }
  };

  const handleBackToList = () => {
    setSelectedConfiguration(null);
    setViewMode('list');
    setEditingConfig(null);
  };

  const renderMainContent = () => {
    if (viewMode === 'form') {
      return (
        <div className="h-full">
          <div className="flex items-center mb-6">
            <Button
              color="light"
              size="sm"
              onClick={handleBackToList}
              className="mr-4"
            >
              ← Back to Configurations
            </Button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editingConfig ? 'Edit Configuration' : 'Create New Configuration'}
            </h2>
          </div>
          <ConfigurationForm
            configuration={editingConfig}
            onSave={handleConfigurationSaved}
            onCancel={handleBackToList}
          />
        </div>
      );
    }

    if (viewMode === 'data' && selectedConfiguration) {
      return (
        <div className="h-full">
          <div className="flex items-center mb-6">
            <Button
              color="light"
              size="sm"
              onClick={handleBackToList}
              className="mr-4"
            >
              ← Back to Configurations
            </Button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Data: {selectedConfiguration.name}
            </h2>
          </div>
          <DataTable
            configuration={selectedConfiguration}
            onConfigurationUpdate={refreshConfigurations}
          />
        </div>
      );
    }

    // Default list view
    return (
      <div className="h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Master Configuration
          </h1>
          <Button onClick={handleCreateConfiguration}>
            <HiPlus className="mr-2 h-4 w-4" />
            New Configuration
          </Button>
        </div>

        {configError && (
          <Alert color="failure" className="mb-4">
            {configError}
          </Alert>
        )}

        {configLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="xl" />
          </div>
        ) : (
          <div className="space-y-4">
            {configurations.map((config: Configuration) => (
              <Card key={config.id} className="w-full">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {config.name}
                    </h3>
                    {config.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {config.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mb-3">
                      <Badge color="info">
                        <HiDatabase className="mr-1 h-3 w-3" />
                        {config.tableName}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {config.columns.length} columns
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(config.createdAt).toLocaleDateString()}
                      {config.updatedAt !== config.createdAt && (
                        <span className="ml-4">
                          Updated: {new Date(config.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      color="light"
                      onClick={() => handleViewData(config)}
                    >
                      View Data
                    </Button>
                    <Button
                      size="sm"
                      color="light"
                      onClick={() => handleEditConfiguration(config)}
                    >
                      <HiPencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      color="failure"
                      onClick={() => handleDeleteConfiguration(config.id)}
                    >
                      <HiTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Column Details */}
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Columns:
                  </h4>
                  <div className="overflow-x-auto">
                    <Table className="text-xs">
                      <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Primary Key</Table.HeadCell>
                        <Table.HeadCell>Required</Table.HeadCell>
                        <Table.HeadCell>Default</Table.HeadCell>
                      </Table.Head>
                      <Table.Body>
                        {config.columns.map((column: ConfigurationColumn, index: number) => (
                          <Table.Row key={index}>
                            <Table.Cell className="font-medium">{column.columnName}</Table.Cell>
                            <Table.Cell>{column.dataType}</Table.Cell>
                            <Table.Cell>
                              {column.isPrimaryKey ? (
                                <Badge color="success" size="sm">Yes</Badge>
                              ) : (
                                <Badge color="gray" size="sm">No</Badge>
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              {column.isRequired ? (
                                <Badge color="warning" size="sm">Yes</Badge>
                              ) : (
                                <Badge color="gray" size="sm">No</Badge>
                              )}
                            </Table.Cell>
                            <Table.Cell>{column.defaultValue || '-'}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900">
      {/* Main Content Area - Left Side */}
      <div className="flex-1 p-6 overflow-auto">
        {renderMainContent()}
      </div>

      {/* Sidebar - Right Side */}
      <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Configurations
          </h3>
          <Button
            size="xs"
            color="light"
            onClick={handleCreateConfiguration}
          >
            <HiPlus className="h-3 w-3" />
          </Button>
        </div>

        {configLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : (
          <div className="space-y-2">
            {configurations.map((config: Configuration) => (
              <div
                key={config.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedConfiguration?.id === config.id
                    ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleViewData(config)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {config.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {config.tableName}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {config.columns.length} columns
                    </p>
                  </div>
                  <HiChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
