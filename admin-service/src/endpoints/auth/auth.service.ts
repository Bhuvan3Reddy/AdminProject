import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { Response } from "express";
import { setCookie, clearCookie } from "../../utils/cookie.util";
import { AdminUser } from "../adminuser/admin-user.model";
import { Role } from "../../role/role.model";
import { BaseService, FindAllParams } from "../../services/base.service";
import { ErrorResponse, SuccessResponse } from "../../shared/api-response.dto";
import { ResponseStatus } from "../../enum/response-status.enum";
import {
  LoginDto,
  LoginResponseDto,
  ProfileResponseDto,
  RefreshTokenResponseDto,
} from "./auth.dto";
import { JwtPayload, AuthenticatedUser } from "./auth.interface";

@Injectable()
export class AuthService extends BaseService<AdminUser> {
  private readonly jwtExpiresIn: string;
  private readonly cookieName: string;

  constructor(
    @InjectModel(AdminUser)
    private readonly adminUserModel: typeof AdminUser,
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super(adminUserModel);
    this.jwtExpiresIn = this.configService.get<string>("JWT_EXPIRES_IN", "24h");
    this.cookieName = this.configService.get<string>(
      "JWT_COOKIE_NAME",
      "auth_token"
    );
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<AuthenticatedUser | null> {
    // Use dynamic findOne from BaseService
    const params: FindAllParams<AdminUser> = {
      filters: { username: email, isActive: true },
      include: [{ model: Role, attributes: ["roleName"] }],
    };
    const user = await this.findOne(params);
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return {
      userId: user.userId,
      email: user.username,
      role: user.role?.roleName || "user",
      username: user.username,
    };
  }

  /**
   * Validate user by ID (for JWT strategy)
   */
  async validateUserById(userId: string): Promise<AuthenticatedUser | null> {
    // Use dynamic findOne from BaseService
    const params: FindAllParams<AdminUser> = {
      filters: { userId, isActive: true },
      include: [{ model: Role, attributes: ["roleName"] }],
    };
    const user = await this.findOne(params);
    if (!user) return null;
    return {
      userId: user.userId,
      email: user.username,
      role: user.role?.roleName || "user",
      username: user.username,
    };
  }

  generateToken(user: AuthenticatedUser): string {
    const payload: JwtPayload = {
      sub: user.userId,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }

  getTokenExpiry(): string {
    const expiresInMs = this.parseExpiresIn(this.jwtExpiresIn);
    const expiryDate = new Date(Date.now() + expiresInMs);
    return expiryDate.toISOString();
  }

  /**
   * Parse expires in string to milliseconds
   */
  private parseExpiresIn(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case "s":
        return value * 1000;
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "d":
        return value * 24 * 60 * 60 * 1000;
      default:
        return 24 * 60 * 60 * 1000; // Default to 24 hours
    }
  }

  /**
   * Set auth cookie
   */
  setAuthCookie(response: Response, token: string): void {
    const expiresInMs = this.parseExpiresIn(this.jwtExpiresIn);
    setCookie(response, this.cookieName, token, {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "production",
      sameSite: "strict",
      maxAge: expiresInMs,
    });
  }

  /**
   * Clear auth cookie
   */
  clearAuthCookie(response: Response): void {
    clearCookie(response, this.cookieName);
  }

  /**
   * Get user profile
   */
  async getProfile(
    userId: string
  ): Promise<SuccessResponse<ProfileResponseDto> | ErrorResponse> {
    // Use dynamic findOne from BaseService
    const params: FindAllParams<AdminUser> = {
      filters: { userId, isActive: true },
      include: [{ model: Role, attributes: ["roleName"] }],
    };
    const user = await this.findOne(params);
    if (!user) {
      return {
        status: ResponseStatus.STATUS_ERROR,
        message: "User not found or inactive",
      };
    }
    const profile: ProfileResponseDto = {
      id: user.userId,
      email: user.username,
      role: user.role?.roleName || "user",
      username: user.username,
    };
    return {
      status: ResponseStatus.STATUS_SUCCESS,
      message: "Profile retrieved successfully",
      data: profile,
    };
  }

  async refreshToken(
    user: AuthenticatedUser,
    response: Response
  ): Promise<SuccessResponse<RefreshTokenResponseDto> | ErrorResponse> {
    try {
      // Validate user still exists and is active
      const currentUser = await this.validateUserById(user.userId);
      if (!currentUser) {
        return {
          status: ResponseStatus.STATUS_ERROR,
          message: "User not found or inactive",
        };
      }

      const newToken = this.generateToken(currentUser);
      const expiresAt = this.getTokenExpiry();

      this.setAuthCookie(response, newToken);

      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: "Token refreshed successfully",
        data: {
          message: "Token refreshed successfully",
          expiresAt,
        },
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Login with token (returns token in response body)
   */
  async loginWithToken(
    loginDto: LoginDto
  ): Promise<SuccessResponse<LoginResponseDto> | ErrorResponse> {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return {
          status: ResponseStatus.STATUS_ERROR,
          message: "Invalid email or password",
        };
      }

      const token = this.generateToken(user);
      const expiresAt = this.getTokenExpiry();

      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: "Login successful",
        data: {
          token,
          expiresAt,
          email: user.email,
          message: "Login successful",
        },
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  /**
   * Login with cookie (sets token as HTTP-only cookie)
   */
  async loginWithCookie(
    loginDto: LoginDto,
    response: Response
  ): Promise<SuccessResponse<RefreshTokenResponseDto> | ErrorResponse> {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return {
          status: ResponseStatus.STATUS_ERROR,
          message: "Invalid email or password",
        };
      }

      const token = this.generateToken(user);
      const expiresAt = this.getTokenExpiry();

      this.setAuthCookie(response, token);

      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: "Login successful",
        data: {
          message: "Login successful",
          expiresAt,
        },
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  async loginHybrid(
    loginDto: LoginDto,
    response: Response
  ): Promise<SuccessResponse<LoginResponseDto> | ErrorResponse> {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return {
          status: ResponseStatus.STATUS_ERROR,
          message: "Invalid email or password",
        };
      }

      const token = this.generateToken(user);
      const expiresAt = this.getTokenExpiry();

      this.setAuthCookie(response, token);

      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: "Login successful",
        data: {
          token,
          expiresAt,
          email: user.email,
          message: "Login successful",
        },
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }

  async logout(
    response: Response
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      this.clearAuthCookie(response);

      return {
        status: ResponseStatus.STATUS_SUCCESS,
        message: "Logout successful",
      };
    } catch (error) {
      throw new Error(`${ResponseStatus.UNEXCEPTED_ERROR}: ${error.message}`);
    }
  }
}
