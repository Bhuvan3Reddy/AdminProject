import React from 'react';
import { Label, Select } from 'flowbite-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  id: string;
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  error?: any;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  id,
  label,
  options,
  placeholder = '-- Select --',
  error,
  required,
  register,
}) => (
  <div className="col-span-1">
    <div className="mb-2 flex items-center gap-1">
      <Label htmlFor={id} value={label} />
      {required && <span className="text-red-500">*</span>}
    </div>
    <Select id={id} required={required} autoComplete="off" className="select-md" {...register}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default DropdownField;
