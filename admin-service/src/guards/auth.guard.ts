import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AuthService } from "../endpoints/auth/auth.service";
import {
  JwtPayload,
  AuthenticatedUser,
} from "../endpoints/auth/auth.interface";
import { ResponseStatus } from "../enum/response-status.enum";

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

@Injectable()
export class AuthenticateTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException(ResponseStatus.NO_AUTH_TOKEN);
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      const user = await this.authService.validateUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException(
          ResponseStatus.INVALID_TOKEN_USER_NOT_FOUND
        );
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(ResponseStatus.INVALID_EXPIRED_TOKEN);
    }
  }

  private extractToken(request: AuthenticatedRequest): string | null {
    const cookieName = this.configService.get<string>(
      "JWT_COOKIE_NAME",
      "auth_token"
    );
    const cookieToken = request.cookies?.[cookieName];

    if (cookieToken) {
      return cookieToken;
    }

    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }

    return null;
  }
}

@Injectable()
export class AuthenticateCookieGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const cookieName = this.configService.get<string>(
      "JWT_COOKIE_NAME",
      "auth_token"
    );
    const token = request.cookies?.[cookieName];

    if (!token) {
      throw new UnauthorizedException(ResponseStatus.NO_AUTH_COOKIE);
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      const user = await this.authService.validateUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException(
          ResponseStatus.INVALID_TOKEN_USER_NOT_FOUND
        );
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(ResponseStatus.INVALID_EXPIRED_COOKIE);
    }
  }
}

@Injectable()
export class AuthenticateBearerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(ResponseStatus.NO_BEARER_TOKEN);
    }

    const token = authHeader.substring(7);

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      const user = await this.authService.validateUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException(
          ResponseStatus.INVALID_TOKEN_USER_NOT_FOUND
        );
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException(ResponseStatus.INVALID_EXPIRED_BEARER);
    }
  }
}
