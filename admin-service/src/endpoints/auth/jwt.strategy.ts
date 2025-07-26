import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { JwtPayload, AuthenticatedUser } from "./auth.interface";
import { AuthService } from "./auth.service";
import { ResponseStatus } from "../../enum/response-status.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // Try to extract from cookie first, then from Authorization header
          const cookieName = configService.get<string>(
            "JWT_COOKIE_NAME",
            "auth_token"
          );
          return (
            request?.cookies?.[cookieName] ||
            ExtractJwt.fromAuthHeaderAsBearerToken()(request)
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    // Validate that the user still exists and is active
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        ResponseStatus.INVALID_TOKEN_USER_NOT_FOUND
      );
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      username: payload.username,
    };
  }
}
