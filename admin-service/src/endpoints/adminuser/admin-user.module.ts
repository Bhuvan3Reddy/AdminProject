import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserController } from "./admin-user.controller";
import { UserService } from "./admin-user.service";
import { AdminUser } from "./admin-user.model";

@Module({
  imports: [SequelizeModule.forFeature([AdminUser])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
