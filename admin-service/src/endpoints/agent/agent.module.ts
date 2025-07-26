import { Module } from "@nestjs/common";
import { AgentService } from "./agent.service";
import { AgentController } from "./agent.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Agents } from "./agent.model";
import { HashService } from "../../services/hash.service";

@Module({
  imports: [SequelizeModule.forFeature([Agents])],
  providers: [AgentService, HashService],
  controllers: [AgentController],
  exports: [AgentService, HashService],
})
export class AgentModule {}
