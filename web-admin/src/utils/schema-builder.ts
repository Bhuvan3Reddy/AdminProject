import { z, ZodTypeAny, ZodString, ZodArray } from 'zod';

type FieldType =
  | 'string'
  | 'number'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'phone'
  | 'pin'
  | 'accountNumber'
  | 'confirmAccountNumber'
  | 'ifsc'
  | 'fileArray'
  | 'boolean'
  | 'date';

export interface FieldDefinition {
  type: FieldType;
  required?: boolean;
  label?: string;
}

export function buildSchema(fields: Record<string, FieldDefinition>): z.ZodTypeAny {
  const shape: Record<string, ZodTypeAny> = {};

  for (const [key, def] of Object.entries(fields)) {
    let schema: ZodTypeAny;

    switch (def.type) {
      case 'string':
        schema = z.string();
        break;

      case 'number':
        schema = z.number();
        break;

      case 'email':
        const emailSchema = z.string();
        schema =
          def.required !== false
            ? z.string().email(`${def.label || key} must be a valid email`)
            : emailSchema;
        break;

      case 'password':
        if (def.required === false) {
          schema = z
            .string()
            .optional()
            .refine((val) => !val || val.length >= 6, {
              message: `${def.label || key} must be at least 6 characters`,
            });
        } else {
          schema = z
            .string()
            .min(6, `${def.label || key} must be at least 6 characters`)
            .nonempty(`${def.label || key} is required`);
        }
        break;

      case 'confirmPassword':
        schema = z.string();
        break;

      case 'phone':
        const phoneSchema = z.string();
        schema =
          def.required !== false
            ? z.string().regex(/^\d{10}$/, `${def.label || key} must be exactly 10 digits`)
            : phoneSchema;
        break;

      case 'pin':
        const pinSchema = z.string();
        schema =
          def.required !== false
            ? z.string().regex(/^\d{4,6}$/, `${def.label || key} must be 4 to 6 digits`)
            : pinSchema;
        break;

      case 'accountNumber':
        const accountnumberSchema = z.string();
        schema =
          def.required !== false
            ? z.string().regex(/^\d{8,14}$/, `${def.label || key} must be 8 to 14 digits`)
            : accountnumberSchema;
        break;

      case 'confirmAccountNumber':
        schema = z.string();
        break;

      case 'date':
        schema = z.string();
        break;

      case 'ifsc':
        const ifscSchema = z.string();
        schema =
          def.required !== false
            ? z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, `${def.label || key} is invalid`)
            : ifscSchema;
        break;

      case 'fileArray':
        const fileArraySchema = z.array(z.instanceof(File));
        schema =
          def.required !== false
            ? fileArraySchema.min(1, `${def.label || key} must include at least one file`)
            : fileArraySchema;
        break;
      case 'boolean':
        schema = z.boolean();
        break;
      default:
        schema = z.any();
        break;
    }

    // Handle required vs optional
    if (def.required === false) {
      // For string or array, use optional() after nonempty()
      if (schema instanceof ZodString || schema instanceof ZodArray) {
        // For string, skip nonempty() if optional
        schema = schema.optional();
      } else {
        // For others, just optional
        schema = schema.optional();
      }
    } else {
      // required = true or undefined: add nonempty() to strings & arrays
      if (schema instanceof ZodString || schema instanceof ZodArray) {
        schema = schema.nonempty(`${def.label || key} is required`);
      }
    }

    shape[key] = schema;
  }

  let schema: z.ZodTypeAny = z.object(shape);

  if ('password' in fields && 'confirmPassword' in fields) {
    schema = schema.refine(
      (data) =>
        typeof data.password === 'string' &&
        typeof data.confirmPassword === 'string' &&
        data.password === data.confirmPassword,
      {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      },
    );
  }

  if ('accountNumber' in fields && 'confirmAccountNumber' in fields) {
    schema = schema.refine(
      (data) =>
        typeof data.accountNumber === 'string' &&
        typeof data.confirmAccountNumber === 'string' &&
        data.accountNumber === data.confirmAccountNumber,
      {
        path: ['confirmAccountNumber'],
        message: 'Account numbers do not match',
      },
    );
  }

  return schema;
}
