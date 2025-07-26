import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AdminUser } from "../adminuser/admin-user.model";
import { Role } from "../../role/role.model";
import {
  AuthenticateTokenGuard,
  AuthenticateCookieGuard,
  AuthenticateBearerGuard,
} from "../../guards/auth.guard";

@Module({
  imports: [
    SequelizeModule.forFeature([AdminUser, Role]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN", "24h"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthenticateTokenGuard,
    AuthenticateCookieGuard,
    AuthenticateBearerGuard,
  ],
  exports: [
    AuthService,
    JwtStrategy,
    AuthenticateTokenGuard,
    AuthenticateCookieGuard,
    AuthenticateBearerGuard,
    JwtModule, // Export JwtModule to make JwtService available
  ],
})
export class AuthModule {}
