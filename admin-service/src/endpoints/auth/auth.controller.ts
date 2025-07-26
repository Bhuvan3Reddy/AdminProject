import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Res,
  Query,
} from "@nestjs/common";
import { CreateQueryDto } from "../../decorators/query.decorator";
import { ApiTags, ApiBearerAuth, ApiCookieAuth } from "@nestjs/swagger";
import { Response } from "express";
import { AuthService } from "./auth.service";
import {
  LoginDto,
  LoginResponseDto,
  ProfileResponseDto,
  RefreshTokenResponseDto,
} from "./auth.dto";
import {
  AuthenticateTokenGuard,
  AuthenticateCookieGuard,
  AuthenticateBearerGuard,
} from "../../guards/auth.guard";
import { ApiOperationSummary } from "../../decorators/api-operation.decorator";
import {
  ApiPostResponses,
  ApiGetResponses,
} from "../../decorators/api-responses.decorator";
import { CurrentUser } from "../../decorators/auth.decorator";
import { AuthenticatedUser } from "./auth.interface";
import { SuccessResponse, ErrorResponse } from "../../shared/api-response.dto";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login-token")
  @ApiOperationSummary(
    "Login with email and password, returns JWT token in response body"
  )
  @ApiPostResponses()
  async loginWithToken(
    @Body() loginDto: LoginDto
  ): Promise<SuccessResponse<LoginResponseDto> | ErrorResponse> {
    return this.authService.loginWithToken(loginDto);
  }

  @Post("login-cookie")
  @ApiOperationSummary(
    "Login with email and password, sets JWT token as HTTP-only cookie"
  )
  @ApiPostResponses()
  async loginWithCookie(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SuccessResponse<LoginResponseDto> | ErrorResponse> {
    return this.authService.loginWithCookie(loginDto, response);
  }

  @Post("login-hybrid")
  @ApiOperationSummary(
    "Login with email and password, returns JWT token in body AND sets as HTTP-only cookie"
  )
  @ApiPostResponses()
  async loginHybrid(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SuccessResponse<LoginResponseDto> | ErrorResponse> {
    return this.authService.loginHybrid(loginDto, response);
  }

  @Post("refresh-token")
  @UseGuards(AuthenticateTokenGuard)
  @ApiOperationSummary("Refresh JWT token for authenticated user")
  @ApiBearerAuth()
  @ApiCookieAuth()
  @ApiPostResponses()
  async refreshToken(
    @CurrentUser() user: AuthenticatedUser,
    @Res({ passthrough: true }) response: Response
  ): Promise<SuccessResponse<RefreshTokenResponseDto> | ErrorResponse> {
    return this.authService.refreshToken(user, response);
  }

  @Get("profile")
  @UseGuards(AuthenticateTokenGuard)
  @ApiOperationSummary("Get authenticated user's profile")
  @ApiBearerAuth()
  @ApiCookieAuth()
  @ApiGetResponses()
  async getProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: CreateQueryDto
  ): Promise<SuccessResponse<ProfileResponseDto> | ErrorResponse> {
    return this.authService.getProfile(user.userId);
  }

  @Post("logout")
  @UseGuards(AuthenticateTokenGuard)
  @ApiOperationSummary("Logout user and clear authentication cookie")
  @ApiBearerAuth()
  @ApiCookieAuth()
  @ApiPostResponses()
  async logout(
    @Res({ passthrough: true }) response: Response
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    return this.authService.logout(response);
  }

  @Get("profile-cookie")
  @UseGuards(AuthenticateCookieGuard)
  @ApiOperationSummary("Get profile using cookie authentication only")
  @ApiCookieAuth()
  @ApiGetResponses()
  async getProfileWithCookie(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: CreateQueryDto
  ): Promise<SuccessResponse<ProfileResponseDto> | ErrorResponse> {
    return this.authService.getProfile(user.userId);
  }

  @Get("profile-bearer")
  @UseGuards(AuthenticateBearerGuard)
  @ApiOperationSummary("Get profile using Bearer token authentication only")
  @ApiBearerAuth()
  @ApiGetResponses()
  async getProfileWithBearer(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: CreateQueryDto
  ): Promise<SuccessResponse<ProfileResponseDto> | ErrorResponse> {
    return this.authService.getProfile(user.userId);
  }
}
