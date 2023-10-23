import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionsDTO {
  @IsNumber()
  @IsNotEmpty()
  public value: number;

  @IsString()
  @IsNotEmpty()
  public senderDocument: string;

  @IsString()
  @IsNotEmpty()
  public receiverDocument: string;
}
