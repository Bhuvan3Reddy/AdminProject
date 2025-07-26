// decorators/with-defaults.decorator.ts
import { ColumnString, ColumnBoolean } from "./column.decorators";
import { Column } from "sequelize-typescript";

export function DefaultColumns(): ClassDecorator {
  return (target: any) => {
    //Active
    ColumnBoolean(
      "Whether the record is active",
      false,
      true
    )(target.prototype, "isActive");

    //Created By
    ColumnString(
      "User who created the record",
      false,
      255
    )(target.prototype, "createdBy");

    // createdAt: standard timestamp
    Column({ allowNull: false, type: "TIMESTAMP", defaultValue: new Date() })(
      target.prototype,
      "createdAt"
    );

    //Updated By
    ColumnString(
      "User who last modified the record",
      true,
      255
    )(target.prototype, "updatedBy");

    // updatedAt: optional, nullable timestamp
    Column({ allowNull: true, type: "TIMESTAMP" })(
      target.prototype,
      "updatedAt"
    );
  };
}
