import { ApiString, ApiEmail } from "../../decorators/validators.decorator";

export class LoginDto {
  @ApiEmail("User email address")
  email: string;

  @ApiString("User password", true)
  password: string;
}

export class LoginResponseDto {
  @ApiString("Authentication token")
  token?: string;

  @ApiString("Token expiry timestamp")
  expiresAt: string;

  @ApiString("User email")
  email?: string;

  @ApiString("Success message")
  message: string;
}

export class ProfileResponseDto {
  @ApiString("User ID")
  id: string;

  @ApiString("User email")
  email: string;

  @ApiString("User role")
  role: string;

  @ApiString("Username")
  username: string;
}

export class RefreshTokenResponseDto {
  @ApiString("Success message")
  message: string;

  @ApiString("Token expiry timestamp")
  expiresAt: string;
}
