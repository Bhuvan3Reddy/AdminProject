// src/decorators/column.decorators.ts

import { Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

export function ColumnString(
  description: string,
  allowNull = false,
  length = 255,
  defaultValue?: string
) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: String })(target, propertyKey);
    Column({
      type: DataType.STRING(length),
      allowNull,
      defaultValue,
    })(target, propertyKey);
  };
}

export function ColumnText(
  description: string,
  allowNull = false,
  defaultValue?: string
) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: String })(target, propertyKey);
    Column({
      type: DataType.TEXT,
      allowNull,
      defaultValue,
    })(target, propertyKey);
  };
}

export function ColumnInt(
  description: string,
  allowNull = false,
  defaultValue?: number
) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: Number })(target, propertyKey);
    Column({
      type: DataType.INTEGER,
      allowNull,
      defaultValue,
    })(target, propertyKey);
  };
}

export function ColumnBigInt(
  description: string,
  allowNull = false,
  defaultValue?: number
) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: Number })(target, propertyKey);
    Column({
      type: DataType.BIGINT,
      allowNull,
      defaultValue,
    })(target, propertyKey);
  };
}

export function ColumnBoolean(
  description: string,
  allowNull = false,
  defaultValue = false
) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: Boolean })(target, propertyKey);
    Column({
      type: DataType.BOOLEAN,
      allowNull,
      defaultValue,
    })(target, propertyKey);
  };
}

export function ColumnDate(description: string, allowNull = false) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: String, format: "date-time" })(
      target,
      propertyKey
    );
    Column({
      type: DataType.DATE,
      allowNull,
    })(target, propertyKey);
  };
}

export function ColumnUUID(
  description: string,
  options?: {
    allowNull?: boolean;
    primaryKey?: boolean;
    defaultValue?: boolean;
  }
) {
  const {
    allowNull = false,
    primaryKey = false,
    defaultValue = true,
  } = options || {};

  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: String, format: "uuid" })(
      target,
      propertyKey
    );

    // Mark as PrimaryKey using Sequelize's metadata
    if (primaryKey) {
      Reflect.defineMetadata("sequelize:primaryKey", true, target, propertyKey);
    }

    Column({
      type: DataType.UUID,
      allowNull,
      defaultValue: defaultValue ? DataType.UUIDV4 : undefined,
    })(target, propertyKey);
  };
}

export function ColumnDecimal(
  description: string,
  allowNull = false,
  precision = 10,
  scale = 2,
  defaultValue?: number
) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: Number })(target, propertyKey);
    Column({
      type: DataType.DECIMAL(precision, scale),
      allowNull,
      defaultValue,
    })(target, propertyKey);
  };
}

export function ColumnJson(description: string, allowNull = false) {
  return (target: any, propertyKey: string) => {
    ApiProperty({ description, type: Object })(target, propertyKey);
    Column({
      type: DataType.JSON,
      allowNull,
    })(target, propertyKey);
  };
}
