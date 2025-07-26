import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsUUID,
  IsDateString,
  IsEmail,
} from "class-validator";

/**
 * Generic string decorator
 */
export function ApiString(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: String, required })(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    IsString()(target, propertyKey);
  };
}

/**
 * Generic number decorator
 */
export function ApiNumber(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: Number, required })(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    IsNumber()(target, propertyKey);
  };
}

/**
 * Generic boolean decorator
 */
export function ApiBoolean(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: Boolean, required })(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    IsBoolean()(target, propertyKey);
  };
}

/**
 * UUID string
 */
export function ApiUUID(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: String, format: "uuid", required })(
      target,
      propertyKey
    );
    if (required) IsNotEmpty()(target, propertyKey);
    IsUUID()(target, propertyKey);
  };
}

/**
 * ISO date string
 */
export function ApiDate(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: String, format: "date-time", required })(
      target,
      propertyKey
    );
    if (required) IsNotEmpty()(target, propertyKey);
    IsDateString()(target, propertyKey);
  };
}

/**
 * Email
 */
export function ApiEmail(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: String, format: "email", required })(
      target,
      propertyKey
    );
    if (required) IsNotEmpty()(target, propertyKey);
    IsEmail()(target, propertyKey);
  };
}

/**
 * Array of strings
 */
export function ApiStringArray(description: string, required = true) {
  return function (target: any, propertyKey: string) {
    ApiProperty({ description, type: [String], required })(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    IsArray()(target, propertyKey);
    IsString({ each: true })(target, propertyKey);
  };
}
