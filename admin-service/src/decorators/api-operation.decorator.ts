import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function ApiOperationSummary(summary: string, description?: string) {
  return applyDecorators(
    ApiOperation({
      summary,
      description,
    })
  );
}
