import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { PlayerController } from "./player.controller";
import { PlayerService } from "./player.service";
import { CreatePlayerDetails } from "./player.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([CreatePlayerDetails]), AuthModule],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
