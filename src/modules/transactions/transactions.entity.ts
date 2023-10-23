import { UserEntity } from "../user/user.entity";

export class TransactionsEntity {
  public value: number;
  public sender: UserEntity;
  public receiver: UserEntity;
}
