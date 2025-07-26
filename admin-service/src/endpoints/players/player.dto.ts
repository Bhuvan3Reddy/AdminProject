import { PartialType } from "@nestjs/swagger";
import {
  ApiString,
  ApiUUID,
  ApiBoolean,
} from "../../decorators/validators.decorator";

export class CreatePlayerDto {
 
  @ApiString("First Name", true)
  firstName: string;

  @ApiString("Enter the Email", true)
  email: string;

  @ApiString("Last Name", true)
  lastName: string;

  @ApiString("Password", true)
  password: string;

  @ApiString("Select the country", true)
  countryCode: string;

  @ApiString("Select the Language", true)
  languangeCode: string;

  @ApiString("Select the Timezone", true)
  timeZone: string;

  @ApiString("Select the Birthdate", true)
  birthDate: string;

  @ApiString("Select the Address", true)
  address: string;

  @ApiString("Contact phone number", true)
  phone?: string;

  @ApiBoolean("Whether the record is active")
  isActive?: boolean;
}
export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiString("User who last modified the record", true)
  modifiedBy?: string;
}