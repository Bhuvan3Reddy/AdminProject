import React from 'react';
import { Label, TextInput } from 'flowbite-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: any;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  error,
  required,
  register,
}) => (
  <div className="col-span-1">
    <div className="mb-2 flex items-center gap-1">
      <Label htmlFor={id} value={label} />
      {required && <span className="text-red-500">*</span>}
    </div>
    <TextInput
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      spellCheck={false}
      sizing="md"
      className="form-control"
      {...register}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default TextInputField;
