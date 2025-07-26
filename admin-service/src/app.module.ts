import { Module } from "@nestjs/common";
import { UserModule } from "./endpoints/adminuser/admin-user.module";
import { BankModule } from "./endpoints/bank/bank.module";
import { DatabaseModule } from "./db/database.module";
import { PlayerModule } from "./endpoints/players/player.module";
import { AgentModule } from "./endpoints/agent/agent.module";

@Module({
  imports: [UserModule, BankModule, DatabaseModule, PlayerModule, AgentModule],
})
export class AppModule {}
