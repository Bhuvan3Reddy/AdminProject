import { applyDecorators } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";

export function ApiParamId(
  name: string,
  description = "ID",
  type: any = "string"
) {
  return applyDecorators(
    ApiParam({
      name,
      type,
      description,
    })
  );
}
