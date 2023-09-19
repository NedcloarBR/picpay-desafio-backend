import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/types";
import { Services } from "src/types/constants";
import { PrismaService } from "../database/prisma.service";
import { UserEntity } from "./user.entity";
import { UserDTO } from "./userDTO";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(Services.PRISMA) private readonly prisma: PrismaService,
  ) {}
  get(document: number): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  public async create(userDTO: UserDTO): Promise<UserEntity> {
    return this.prisma.user.create({
      data: userDTO,
    });
  }

  // public async get(document: number): Promise<UserEntity> {
  //   return this.prisma.user.findFirst({
  //     where: { document },
  //     include: {
  //       receivedTransactions: true,
  //       sentTransactions: true,
  //     },
  //   });
  // }

  public async getAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }
}
