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

  public async create(userDTO: UserDTO): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: userDTO,
    });
  }

  public async getByDocument(document: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: { document },
      include: {
        receivedTransactions: true,
        sentTransactions: true,
      },
    });
  }

  public async getByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.user.findFirst({
      where: { email },
      include: {
        receivedTransactions: true,
        sentTransactions: true,
      },
    });
  }

  public async getAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  public async update(document: string, money: number): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: {
        document,
      },
      data: {
        money,
      },
    });
  }
}
