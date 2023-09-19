import { Module } from "@nestjs/common";
import { Repositories, Services } from "src/types/constants";
import { PrismaService } from "../database/prisma.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: Services.PRISMA,
      useClass: PrismaService,
    },
    {
      provide: Services.USER,
      useClass: UserService,
    },
    {
      provide: Repositories.USER,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
