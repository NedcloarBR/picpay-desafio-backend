import { Module } from "@nestjs/common";
import { TransactionsModule } from "./modules/transactions/transactions.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [UserModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
