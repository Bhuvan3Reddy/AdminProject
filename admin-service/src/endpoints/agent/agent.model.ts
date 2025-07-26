import { Model, Table } from "sequelize-typescript";
import {
  ColumnUUID,
  ColumnString,
  ColumnBoolean,
} from "../../decorators/column.decorators";
import { DefaultColumns } from "../../decorators/default-columns.decorator";

@Table({
  tableName: "agents",
})
@DefaultColumns()
export class Agents extends Model<Agents> {
  @ColumnUUID("Primary key for agent details", {
    primaryKey: true,
    defaultValue: true,
  })
  agentId: string;

  @ColumnString("First Name", true, 255)
  firstName: string;

  @ColumnString("Last Name", true, 255)
  lastName: string;

  @ColumnString("Email", true, 255)
  email: string;

  @ColumnString("Password", true, 255)
  password: string;

  @ColumnString("Agent Name", true, 255)
  agentName: string;

  @ColumnString("Phone", true, 50)
  phone: string;

  @ColumnString("Agent Type", true, 100)
  agentType: string;

  @ColumnString("Permission Roles", true, 255)
  permissionRoles: string;

  @ColumnString("Currency", true, 10)
  currency: string;

  @ColumnString("Timezone", true, 100)
  timezone: string;

  @ColumnString("Agent Action", true, 100)
  agentAction: string;

  @ColumnString("Agent PIN", true, 20)
  agentPin: string;

  @ColumnString("Account Number", true, 50)
  accountNumber: string;

  @ColumnString("Account Holder Name", true, 255)
  accountHolderName: string;

  @ColumnString("IFSC Code", true, 20)
  ifscCode: string;
}
