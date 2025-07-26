import { ApiProperty } from "@nestjs/swagger";

export class SuccessResponse<T = any> {
  @ApiProperty()
  status: "success";

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;
}

export class ErrorResponse {
  @ApiProperty()
  status: "error";

  @ApiProperty()
  message: string;
}
