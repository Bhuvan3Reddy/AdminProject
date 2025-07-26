import { PartialType } from "@nestjs/swagger";
import {
  ApiBoolean,
  ApiString,
} from "../../decorators/validators.decorator";

export class CreateAgentDto {

  @ApiString("First Name", true)
  firstName: string;

  @ApiString("Last Name", true)
  lastName: string;

  @ApiString("Email", true)
  email: string;

  @ApiString("Password", false)
  password?: string;

  @ApiString("Agent Name", true)
  agentName: string;

  @ApiString("Phone", true)
  phone: string;

  @ApiString("Agent Type", true)
  agentType: string;

  @ApiString("Permission Roles", true)
  permissionRoles: string;

  @ApiString("Currency", true)
  currency: string;

  @ApiString("Timezone", true)
  timezone: string;

  @ApiString("Agent Action", true)
  agentAction: string;

  @ApiString("Agent PIN", true)
  agentPin: string;

  @ApiString("Account Number", true)
  accountNumber: string;

  @ApiString("Account Holder Name", true)
  accountHolderName: string;

  @ApiString("IFSC Code", true)
  ifscCode: string;

  @ApiString("User who created the record", true)
  createdBy: string;

  @ApiBoolean("Whether the record is active")
  isActive?: boolean;
}

export class UpdateAgentDto extends PartialType(CreateAgentDto) {
  @ApiString("User who last modified the record", false)
  updatedBy?: string;
}
