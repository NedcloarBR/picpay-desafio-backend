import { Module } from "@nestjs/common";
import { Repositories, Services } from "src/types/constants";
import { PrismaService } from "../database/prisma.service";
import { UserModule } from "../user/user.module";
import { TransactionsController } from "./transactions.controller";
import { TransactionsRepository } from "./transactions.repository";
import { TransactionsService } from "./transactions.service";

@Module({
  imports: [UserModule],
  controllers: [TransactionsController],
  providers: [
    {
      provide: Services.PRISMA,
      useClass: PrismaService,
    },
    {
      provide: Services.TRANSACTIONS,
      useClass: TransactionsService,
    },
    {
      provide: Repositories.TRANSACTIONS,
      useClass: TransactionsRepository,
    },
  ],
})
export class TransactionsModule {}
