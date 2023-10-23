import { Inject } from "@nestjs/common";
import { ITransactionsRepository, IUserService } from "src/types";
import { Services } from "src/types/constants";
import { PrismaService } from "../database/prisma.service";
import { TransactionsEntity } from "./transactions.entity";
import { TransactionsDTO } from "./transactionsDTO";

export class TransactionsRepository implements ITransactionsRepository {
  constructor(
    @Inject(Services.PRISMA) private readonly prisma: PrismaService,
    @Inject(Services.USER) private readonly userService: IUserService,
  ) {}

  public async create(
    transactionsDTO: TransactionsDTO,
  ): Promise<TransactionsEntity> {
    const { id: senderId } = await this.userService.getByDocument(
      transactionsDTO.senderDocument,
    );
    const { id: receiverId } = await this.userService.getByDocument(
      transactionsDTO.receiverDocument,
    );
    const data = {
      value: transactionsDTO.value,
      senderId,
      receiverId,
    };

    return this.prisma.transactions.create({
      data,
      include: {
        receiver: true,
        sender: true,
      },
    });
  }
}
