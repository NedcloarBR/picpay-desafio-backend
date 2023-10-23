import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ITransactionsService } from "src/types";
import { Routes, Services } from "src/types/constants";
import { TransactionsDTO } from "./transactionsDTO";

@Controller(Routes.TRANSACTIONS)
export class TransactionsController {
  constructor(
    @Inject(Services.TRANSACTIONS)
    private readonly service: ITransactionsService,
  ) {}

  @Post()
  public async create(@Body() transactionsDTO: TransactionsDTO) {
    return await this.service.create(transactionsDTO);
  }
}
