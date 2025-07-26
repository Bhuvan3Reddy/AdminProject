import { buildSchema, FieldDefinition } from "src/utils/schema-builder";

const bankDetailsFields: Record<string, FieldDefinition> = {
  userId: { type: 'string', label: 'User' },
  email: { type: 'email', label: 'Email' },

  bankName: { type: 'string', label: 'Bank Name' },
  branchName: { type: 'string', label: 'Branch Name' },

  accountNumber: { type: 'accountNumber', label: 'Account Number' },
  confirmAccountNumber: { type: 'confirmAccountNumber', label: 'Confirm Account Number' },

  accountType: { type: 'string', label: 'Account Type' },
  currency: { type: 'string', label: 'Currency' },
  countryCode: { type: 'string', label: 'Country Code' },
  phone: { type: 'phone', label: 'Phone Number' },

  iban: { type: 'string', label: 'IBAN' },
  swiftCode: { type: 'string', label: 'SWIFT Code' },
  ifscOrBranchCode: { type: 'ifsc', label: 'IFSC/Branch Code' },

  createdBy: { type: 'string', required: false, label: 'Created By' },
  modifiedBy: { type: 'string', required: false, label: 'Modified By' },

};

export const bankDetailsSchema = buildSchema(bankDetailsFields);
