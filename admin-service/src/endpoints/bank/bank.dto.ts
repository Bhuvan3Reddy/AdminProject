import { PartialType } from "@nestjs/swagger";
import {
  ApiString,
  ApiUUID,
  ApiBoolean,
} from "../../decorators/validators.decorator";

export class CreateBankDto {
  @ApiUUID("User ID")
  userId: string;

  @ApiString("Bank Name", true)
  bankName: string;

  @ApiString("Bank account number", true)
  accountNumber: string;

  @ApiString("IFSC code or branch code", true)
  ifscOrBranchCode: string;

  @ApiString("Email address", true)
  email: string;

  @ApiString("Branch Name", true)
  branchName: string;

  @ApiString("Account Type", true)
  accountType: string;

  @ApiString("Currency", true)
  currency: string;

  @ApiString("Country Code", true)
  countryCode: string;

  @ApiString("Contact phone number", true)
  phone: string;

  @ApiString("IBAN", true)
  iban: string;

  @ApiString("SWIFT Code", true)
  swiftCode: string;

  @ApiString("User who created the record")
  createdBy: string;

}

export class UpdateBankDto extends PartialType(CreateBankDto) {
  @ApiBoolean("Whether the record is active")
  isActive?: boolean;

  @ApiString("User who last modified the record", true)
  modifiedBy?: string;
}
