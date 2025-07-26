import React from 'react';
import { Label, Textarea } from 'flowbite-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  error?: any;
  required?: boolean;
  register?: UseFormRegisterReturn;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder = '',
  error,
  required,
  register,
  rows = 4,
}) => (
  <div className="col-span-1">
    <div className="mb-2 flex items-center gap-1">
      <Label htmlFor={id} value={label} />
      {required && <span className="text-red-500">*</span>}
    </div>
    <Textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      autoComplete="off"
      spellCheck={false}
      className="form-control"
      {...register}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default TextareaField;
