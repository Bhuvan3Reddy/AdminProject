import { buildSchema, FieldDefinition } from '../../utils/schema-builder';

const agentFields = (isEdit: boolean): Record<string, FieldDefinition> => ({
  id: { type: 'number', required: isEdit, label: 'ID' },
  firstName: { type: 'string', label: 'First Name' },
  lastName: { type: 'string', label: 'Last Name' },
  agentName: { type: 'string', label: 'Agent Name' },
  email: { type: 'email', label: 'Email' },
  password: { type: 'password', required: !isEdit, label: 'Password' },
  confirmPassword: { type: 'confirmPassword', required: !isEdit, label: 'Confirm Password' },
  phone: { type: 'phone', label: 'Phone Number' },
  agentType: { type: 'string', label: 'Agent Type' },
  permissionRoles: { type: 'string', label: 'Permission Roles' },
  currency: { type: 'string', label: 'Currency' },
  timezone: { type: 'string', label: 'Timezone' },
  agentAction: { type: 'string', label: 'Agent Action' },
  agentPin: { type: 'pin', label: 'Agent PIN' },
  accountHolderName: { type: 'string', label: 'Account Holder Name' },
  ifscCode: { type: 'ifsc', label: 'IFSC Code' },
  accountNumber: { type: 'accountNumber', label: 'Account Number' },
  confirmAccountNumber: { type: 'confirmAccountNumber', label: 'Confirm Account Number' },
  documents: { type: 'fileArray', required: false, label: 'Documents' },
  isActive: { type: 'boolean', label: 'Active' },
});

export const getAgentSchema = (isEdit: boolean) => buildSchema(agentFields(isEdit));
