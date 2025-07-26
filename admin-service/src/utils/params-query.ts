import { IsOptional, IsString, IsNumber, Min } from "class-validator";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FindAllQueryDto {
  @ApiPropertyOptional({
    description: "Page number for pagination",
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: "Number of items per page", example: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description:
      "Sort order string in the format field:direction, e.g. name:ASC",
    example: "createdAt:DESC",
  })
  @IsOptional()
  @IsString()
  order?: string; // e.g., 'name:ASC'

  @ApiPropertyOptional({
    description:
      'JSON string representing filter conditions, e.g. {"isActive":true}',
    example: '{"isActive":true}',
  })
  @IsOptional()
  @IsString()
  filters?: string; // JSON string like '{"status":"active"}'

  @ApiPropertyOptional({
    description: "Comma-separated list of fields to include",
    example: "id",
  })
  @IsOptional()
  @IsString()
  attributes?: string;
}
