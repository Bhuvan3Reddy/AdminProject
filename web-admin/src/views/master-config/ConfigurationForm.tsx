import React, { useState, useEffect } from 'react';
import { Button, TextInput, Textarea, Select, Table, Checkbox, Card, Alert } from 'flowbite-react';
import { HiPlus, HiTrash } from 'react-icons/hi';
 
interface ConfigurationColumn {
  id?: number;
  columnName: string;
  dataType: string;
  isPrimaryKey: boolean;
  isRequired: boolean;
  defaultValue?: string;
}

interface Configuration {
  id?: number;
  name: string;
  tableName: string;
  description?: string;
  columns: ConfigurationColumn[];
}

interface ConfigurationFormProps {
  configuration?: Configuration | null;
  onSave: (config: Configuration) => void;
  onCancel: () => void;
}

const DATA_TYPES = [
  { value: 'string', label: 'String' },
  { value: 'integer', label: 'Integer' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
  { value: 'text', label: 'Text' },
];

export const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  configuration,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Configuration>({
    name: '',
    tableName: '',
    description: '',
    columns: [{ columnName: 'id', dataType: 'integer', isPrimaryKey: true, isRequired: true }],
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (configuration) {
      setFormData({ ...configuration });
    }
  }, [configuration]);

  const handleInputChange = (field: keyof Configuration, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Auto-generate table name from configuration name
    if (field === 'name' && !configuration) {
      const tableName = `mst_${value.toLowerCase().replace(/\s+/g, '_')}`;
      setFormData(prev => ({
        ...prev,
        tableName,
      }));
    }
  };

  const handleColumnChange = (index: number, field: keyof ConfigurationColumn, value: string | boolean) => {
    const newColumns = [...formData.columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setFormData(prev => ({ ...prev, columns: newColumns }));
  };

  const addColumn = () => {
    setFormData(prev => ({
      ...prev,
      columns: [
        ...prev.columns,
        { columnName: '', dataType: 'string', isPrimaryKey: false, isRequired: false },
      ],
    }));
  };

  const removeColumn = (index: number) => {
    if (formData.columns.length > 1) {
      const newColumns = formData.columns.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, columns: newColumns }));
    }
  };

  const validateForm = (): boolean => {
    const validationErrors: string[] = [];

    if (!formData.name.trim()) {
      validationErrors.push('Configuration name is required');
    }

    if (!formData.tableName.trim()) {
      validationErrors.push('Table name is required');
    }

    if (formData.columns.length === 0) {
      validationErrors.push('At least one column is required');
    }

    // Check for duplicate column names
    const columnNames = formData.columns.map(col => col.columnName);
    const uniqueNames = new Set(columnNames);
    if (columnNames.length !== uniqueNames.size) {
      validationErrors.push('Column names must be unique');
    }

    // Check for empty column names
    const emptyColumns = formData.columns.some(col => !col.columnName.trim());
    if (emptyColumns) {
      validationErrors.push('All columns must have a name');
    }

    // Check for at least one primary key
    const primaryKeyColumns = formData.columns.filter(col => col.isPrimaryKey);
    if (primaryKeyColumns.length === 0) {
      validationErrors.push('At least one primary key column is required');
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <Alert color="failure">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Configuration Name *
          </label>
          <TextInput
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Country"
            required
          />
        </div>

        <div>
          <label htmlFor="tableName" className="block text-sm font-medium text-gray-700 mb-1">
            Database Table Name *
          </label>
          <TextInput
            id="tableName"
            type="text"
            value={formData.tableName}
            onChange={(e) => handleInputChange('tableName', e.target.value)}
            placeholder="e.g., mst_country"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Optional description"
          rows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Columns</h3>
          <Button
            type="button"
            onClick={addColumn}
            color="blue"
            size="sm"
          >
            <HiPlus className="mr-2 h-4 w-4" />
            Add Column
          </Button>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Column Name</Table.HeadCell>
                <Table.HeadCell>Data Type</Table.HeadCell>
                <Table.HeadCell>Primary Key</Table.HeadCell>
                <Table.HeadCell>Required</Table.HeadCell>
                <Table.HeadCell>Default Value</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {formData.columns.map((column, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <TextInput
                        type="text"
                        value={column.columnName}
                        onChange={(e) => handleColumnChange(index, 'columnName', e.target.value)}
                        size="sm"
                        required
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Select
                        value={column.dataType}
                        onChange={(e) => handleColumnChange(index, 'dataType', e.target.value)}
                        size="sm"
                        required
                      >
                        {DATA_TYPES.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </Select>
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        checked={column.isPrimaryKey}
                        onChange={(e) => handleColumnChange(index, 'isPrimaryKey', e.target.checked)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        checked={column.isRequired}
                        onChange={(e) => handleColumnChange(index, 'isRequired', e.target.checked)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <TextInput
                        type="text"
                        value={column.defaultValue || ''}
                        onChange={(e) => handleColumnChange(index, 'defaultValue', e.target.value)}
                        size="sm"
                        placeholder="Optional"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        type="button"
                        color="failure"
                        size="xs"
                        onClick={() => removeColumn(index)}
                        disabled={formData.columns.length === 1}
                      >
                        <HiTrash className="h-3 w-3" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="blue">
          {configuration ? 'Update' : 'Create'} Configuration
        </Button>
      </div>
    </form>
  );
};
