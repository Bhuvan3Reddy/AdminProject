import React from 'react';
import { Label, FileInput } from 'flowbite-react';

interface FileInputFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: any;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  id,
  label,
  required = false,
  error,
  multiple = false,
  onChange,
}) => (
  <div className="col-span-1">
    <div className="mb-2 flex items-center gap-1">
      <Label htmlFor={id} value={label} />
      {required && <span className="text-red-500">*</span>}
    </div>
    <FileInput
      id={id}
      multiple={multiple}
      sizing="md"
      className="form-control"
      onChange={onChange}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default FileInputField;
