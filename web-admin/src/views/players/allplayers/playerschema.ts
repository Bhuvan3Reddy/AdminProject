import { buildSchema, FieldDefinition } from "src/utils/schema-builder";

const playerFields: Record<string, FieldDefinition> = {
  id: { type: 'number', required: false, label: 'ID' },
  firstName: { type: 'string', label: 'First Name' },
  lastName: { type: 'string', label: 'Last Name' },
  email: { type: 'email', label: 'Email' },
  password: { type: 'password', label: 'Password' },
  confirmPassword: { type: 'confirmPassword', label: 'Confirm Password' },
  phone: { type: 'phone', label: 'Phone Number' },
  countryCode: { type: 'string', label: 'Country Code' },
  languangeCode: { type: 'string', label: 'Language Code' },
  timeZone: { type: 'string', label: 'Timezone' },
  birthDate: { type: 'date', label: 'Birth Date' },
  currency: { type: 'string', label: 'Currency' },
  vipLevel: { type: 'string', label: 'VIP Level' },
  nationalId: { type: 'string', label: 'National ID' },
  address: { type: 'string', label: 'Address' },
  modifiedBy: { type: 'string', required: false, label: 'Modified By' },
};
export const playerSchema = buildSchema(playerFields);
