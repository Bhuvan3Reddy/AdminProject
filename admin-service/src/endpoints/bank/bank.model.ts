import { Model, Table } from "sequelize-typescript";

import { ColumnUUID, ColumnString } from "../../decorators/column.decorators";
import { DefaultColumns } from "../../decorators/default-columns.decorator";

@Table({
  tableName: "bankdetails",
})
@DefaultColumns()
export class UserBankDetails extends Model<UserBankDetails> {
  @ColumnUUID("Primary key for bank details", {
    primaryKey: true,
    defaultValue: true,
  })
  bankId: string;

  @ColumnString("User ID associated with bank details", true, 255)
  userId: string;

  @ColumnString("Name of the bank", true, 255)
  bankName: string;

  @ColumnString("Bank account number", true, 255)
  accountNumber: string;

  @ColumnString("IFSC code or branch code", true, 255)
  ifscOrBranchCode: string;

  @ColumnString("Email address", true, 255)
  email: string;

  @ColumnString("Branch Name", true, 255)
  branchName: string;

  @ColumnString("Account Type", true, 255)
  accountType: string;

  @ColumnString("Currency", true, 255)
  currency: string;

  @ColumnString("Country Code", true, 255)
  countryCode: string;

  @ColumnString("Contact phone number", true, 255)
  phone: string;

  @ColumnString("IBAN", true, 255)
  iban: string;

  @ColumnString("SWIFT Code", true, 255)
  swiftCode: string;
 
}
