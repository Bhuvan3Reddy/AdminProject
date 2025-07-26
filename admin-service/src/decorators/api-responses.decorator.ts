import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ResponseStatus } from "../enum/response-status.enum";

export function ApiPostResponses() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: ResponseStatus.STATUS_201,
    }),
    ApiResponse({
      status: 500,
      description: ResponseStatus.STATUS_500,
    })
  );
}
export function ApiGetResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: ResponseStatus.STATUS_200,
    }),
    ApiResponse({
      status: 500,
      description: ResponseStatus.STATUS_500,
    }),
    ApiResponse({
      status: 404,
      description: ResponseStatus.STATUS_404,
    })
  );
}
export function ApiPostUpdateResponses() {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: ResponseStatus.STATUS_201,
    }),
    ApiResponse({
      status: 500,
      description: ResponseStatus.STATUS_500,
    }),
    ApiResponse({
      status: 404,
      description: ResponseStatus.STATUS_404,
    })
  );
}
