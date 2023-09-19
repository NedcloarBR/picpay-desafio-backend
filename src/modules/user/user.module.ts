import { Module } from "@nestjs/common";
import { Repositories, Services } from "src/types/constants";
import { UserController, UserRepository, UserService } from ".";
import { PrismaService } from "../database/prisma.service";

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
