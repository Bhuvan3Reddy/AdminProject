import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, TextInput, Checkbox, Alert, Card, Badge } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash, HiRefresh } from 'react-icons/hi';
import { useConfigurationData } from 'src/hooks/useConfigurationData';
 
interface Configuration {
  id: number;
  name: string;
  tableName: string;
  description?: string;
  columns: ConfigurationColumn[];
}

interface ConfigurationColumn {
  id: number;
  columnName: string;
  dataType: string;
  isPrimaryKey: boolean;
  isRequired: boolean;
  defaultValue?: string;
}

interface DataTableProps {
  configuration: Configuration;
  onConfigurationUpdate: () => void;
}

export const DataTable: React.FC<DataTableProps> = ({ configuration, onConfigurationUpdate }) => {
  const [showDataForm, setShowDataForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const {
    data,
    loading,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
    refreshData
  } = useConfigurationData(configuration.id);

  useEffect(() => {
    refreshData();
  }, [configuration.id]);

  useEffect(() => {
    // Initialize form data with default values
    const initialData: Record<string, any> = {};
    configuration.columns.forEach(column => {
      if (column.defaultValue) {
        initialData[column.columnName] = column.defaultValue;
      } else if (column.dataType === 'boolean') {
        initialData[column.columnName] = false;
      } else {
        initialData[column.columnName] = '';
      }
    });
    setFormData(initialData);
  }, [configuration]);

  const handleInputChange = (columnName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [columnName]: value,
    }));
  };

  const validateForm = (): boolean => {
    const validationErrors: string[] = [];

    configuration.columns.forEach(column => {
      if (column.isRequired && !formData[column.columnName]) {
        validationErrors.push(`${column.columnName} is required`);
      }
    });

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingRecord) {
        await updateRecord(editingRecord.id, formData);
      } else {
        await createRecord(formData);
      }
      setShowDataForm(false);
      setEditingRecord(null);
      resetForm();
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setFormData({ ...record });
    setShowDataForm(true);
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;

    try {
      await deleteRecord(recordToDelete.id);
      setShowDeleteModal(false);
      setRecordToDelete(null);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const resetForm = () => {
    const initialData: Record<string, any> = {};
    configuration.columns.forEach(column => {
      if (column.defaultValue) {
        initialData[column.columnName] = column.defaultValue;
      } else if (column.dataType === 'boolean') {
        initialData[column.columnName] = false;
      } else {
        initialData[column.columnName] = '';
      }
    });
    setFormData(initialData);
    setErrors([]);
  };

  const renderFormInput = (column: ConfigurationColumn) => {
    const value = formData[column.columnName] || '';

    switch (column.dataType) {
      case 'boolean':
        return (
          <Checkbox
            checked={value}
            onChange={(e) => handleInputChange(column.columnName, e.target.checked)}
          />
        );
      case 'integer':
        return (
          <TextInput
            type="number"
            value={value}
            onChange={(e) => handleInputChange(column.columnName, parseInt(e.target.value) || '')}
            required={column.isRequired}
            disabled={column.isPrimaryKey && editingRecord}
          />
        );
      case 'date':
        return (
          <TextInput
            type="date"
            value={value}
            onChange={(e) => handleInputChange(column.columnName, e.target.value)}
            required={column.isRequired}
          />
        );
      case 'text':
        return (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={value}
            onChange={(e) => handleInputChange(column.columnName, e.target.value)}
            required={column.isRequired}
            rows={3}
          />
        );
      default:
        return (
          <TextInput
            type="text"
            value={value}
            onChange={(e) => handleInputChange(column.columnName, e.target.value)}
            required={column.isRequired}
            disabled={column.isPrimaryKey && editingRecord}
          />
        );
    }
  };

  const renderTableCell = (record: any, column: ConfigurationColumn) => {
    const value = record[column.columnName];

    switch (column.dataType) {
      case 'boolean':
        return (
          <Badge color={value ? 'success' : 'gray'}>
            {value ? 'Yes' : 'No'}
          </Badge>
        );
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      default:
        return value || '';
    }
  };

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{configuration.name}</h1>
            <p className="text-gray-600">{configuration.description}</p>
            <Badge color="info" className="mt-2">
              Table: {configuration.tableName}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowDataForm(true)}
              color="blue"
            >
              <HiPlus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
            <Button
              onClick={() => refreshData()}
              color="gray"
              disabled={loading}
            >
              <HiRefresh className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              {configuration.columns.map((column) => (
                <Table.HeadCell key={column.columnName}>
                  {column.columnName}
                  {column.isPrimaryKey && <Badge color="warning" size="sm" className="ml-2">PK</Badge>}
                  {column.isRequired && <span className="text-red-500 ml-1">*</span>}
                </Table.HeadCell>
              ))}
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={configuration.columns.length + 1} className="text-center">
                    Loading...
                  </Table.Cell>
                </Table.Row>
              ) : data.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={configuration.columns.length + 1} className="text-center text-gray-500">
                    No records found
                  </Table.Cell>
                </Table.Row>
              ) : (
                data.map((record: any, index: number) => (
                  <Table.Row key={index}>
                    {configuration.columns.map((column) => (
                      <Table.Cell key={column.columnName}>
                        {renderTableCell(record, column)}
                      </Table.Cell>
                    ))}
                    <Table.Cell>
                      <div className="flex space-x-1">
                        <Button
                          size="xs"
                          color="gray"
                          onClick={() => handleEdit(record)}
                        >
                          <HiPencil className="h-3 w-3" />
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => {
                            setRecordToDelete(record);
                            setShowDeleteModal(true);
                          }}
                        >
                          <HiTrash className="h-3 w-3" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </Card>

      {/* Data Form Modal */}
      <Modal 
        show={showDataForm} 
        onClose={() => {
          setShowDataForm(false);
          setEditingRecord(null);
          resetForm();
        }}
      >
        <Modal.Header>
          {editingRecord ? 'Edit Record' : 'Add New Record'}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.length > 0 && (
              <Alert color="failure">
                <ul className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {configuration.columns.map((column) => (
              <div key={column.columnName}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {column.columnName}
                  {column.isRequired && <span className="text-red-500 ml-1">*</span>}
                  {column.isPrimaryKey && <Badge color="warning" size="sm" className="ml-2">Primary Key</Badge>}
                </label>
                {renderFormInput(column)}
              </div>
            ))}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                color="gray"
                onClick={() => {
                  setShowDataForm(false);
                  setEditingRecord(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" color="blue" disabled={loading}>
                {loading ? 'Saving...' : editingRecord ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            Are you sure you want to delete this record? This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            color="gray"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
