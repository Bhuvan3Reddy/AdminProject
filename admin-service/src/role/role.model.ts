import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { AdminUser } from "../endpoints/adminuser/admin-user.model";
import { DefaultColumns } from "../decorators/default-columns.decorator";

@Table({
  tableName: "roles",
})
@DefaultColumns()
export class Role extends Model<Role> {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    field: "roleId",
  })
  roleId: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "roleName",
  })
  roleName: string;

  // Association
  @HasMany(() => AdminUser)
  adminUsers: AdminUser[];
}
