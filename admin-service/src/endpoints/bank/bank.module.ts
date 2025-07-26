import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BankController } from "./bank.controller";
import { BankService } from "./bank.service";
import { UserBankDetails } from "./bank.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([UserBankDetails]),
    AuthModule, // Import AuthModule to access guards and services
  ],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
