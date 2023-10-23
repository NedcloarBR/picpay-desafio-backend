import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedError } from "src/common/errors/Unauthorized";
import {
  ITransactionsRepository,
  ITransactionsService,
  IUserService,
} from "src/types";
import { Repositories, Services } from "src/types/constants";
import { TransactionsEntity } from "./transactions.entity";
import { TransactionsDTO } from "./transactionsDTO";

@Injectable()
export class TransactionsService implements ITransactionsService {
  constructor(
    @Inject(Repositories.TRANSACTIONS)
    private readonly repository: ITransactionsRepository,
    @Inject(Services.USER) private readonly userService: IUserService,
  ) {}

  public async create(data: TransactionsDTO): Promise<TransactionsEntity> {
    const sender = await this.userService.getByDocument(data.senderDocument);
    const receiver = await this.userService.getByDocument(
      data.receiverDocument,
    );

    if (sender.money < data.value) {
      throw new UnauthorizedError("Sender não tem dinheiro o suficiente");
    }

    if (sender.userType === "CNPJ") {
      throw new UnauthorizedError("CNPJ não pode enviar");
    }

    if (receiver.document === sender.document) {
      throw new UnauthorizedError("Não é possível se enviar");
    }

    const transaction = await this.repository.create(data);
    await this.userService.update(sender.document, sender.money - data.value);
    await this.userService.update(
      receiver.document,
      receiver.money + data.value,
    );

    return transaction;
  }
}
