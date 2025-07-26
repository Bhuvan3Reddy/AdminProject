import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../role/role.model";
import { DefaultColumns } from "../../decorators/default-columns.decorator";

@Table({
  tableName: "adminusers",
})
@DefaultColumns()
export class AdminUser extends Model<AdminUser> {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    field: "userId",
  })
  userId: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "userName",
  })
  username: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "password",
  })
  password: string;

  @ApiProperty()
  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "roleId",
  })
  roleId: string;

  isActive?: boolean;

  // Association
  @BelongsTo(() => Role)
  role: Role;
}
