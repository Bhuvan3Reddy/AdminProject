import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOptionalQueryDto {
  @ApiPropertyOptional({
    description: "Optional filters (as JSON string)",
    example: '{"userId":1}',
  })
  @IsOptional()
  @IsString()
  filters?: string;
}
