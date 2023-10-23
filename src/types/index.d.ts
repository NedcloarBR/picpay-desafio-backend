import { TransactionsDTO, TransactionsEntity } from "src/modules/transactions";
import { UserEntity } from "src/modules/user/user.entity";

export interface IUserService {
  create(userDTO: UserDTO): Promise<UserEntity | string>;
  getByDocument(document: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
  update(document: string, money: number): Promise<UserEntity>;
}

export interface IUserRepository {
  create(userDTO: UserDTO): Promise<UserEntity>;
  getByDocument(document: string): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
  update(document: string, money: number): Promise<UserEntity>;
}

export interface ITransactionsService {
  create(data: TransactionsDTO): Promise<TransactionsEntity>;
}

export interface ITransactionsRepository {
  create(data: TransactionsDTO): Promise<TransactionsEntity>;
}
