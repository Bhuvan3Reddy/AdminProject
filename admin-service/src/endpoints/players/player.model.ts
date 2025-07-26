import { Model, Table } from "sequelize-typescript";

import { ColumnString, ColumnUUID } from "../../decorators/column.decorators";
import { DefaultColumns } from "../../decorators/default-columns.decorator";

@Table({
  tableName: "players",
})
@DefaultColumns()
export class CreatePlayerDetails extends Model<CreatePlayerDetails> {
  @ColumnUUID("Primary key for Create Player details", {
    primaryKey: true,
    defaultValue: true,
  })
  userId: string;

  @ColumnString("First Name", true, 255)
  firstName: string;

  @ColumnString("Enter the Email", true, 255)
  email: string;

  @ColumnString("Last Name", true, 255)
  lastName: string;

  @ColumnString("Password", true, 255)
  password: string;

  @ColumnString("Select the country", true, 255)
  countryCode: string;

  @ColumnString("Select the Language", true, 255)
  languangeCode: string;

  @ColumnString("Select the Timezone", true, 255)
  timeZone: string;

  @ColumnString("Select the Birthdate", true, 255)
  birthDate: string;

  @ColumnString("Select the Address", true, 255)
  address: string;

  @ColumnString("Contact phone number", true, 255)
  phone?: string;

  @ColumnString("Currency", true, 255)
  currency: string;

  @ColumnString("National ID", true, 255)
  nationalId: string;

  @ColumnString("VIP Level", true, 255)
  vipLevel: string;

  isActive: boolean;
}
