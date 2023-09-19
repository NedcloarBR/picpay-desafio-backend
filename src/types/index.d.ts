import { UserEntity } from "src/modules/user/user.entity";

export interface IUserService {
  create(userDTO: UserDTO): Promise<UserEntity>;
  get(document: number): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
}

export interface IUserRepository {
  create(userDTO: UserDTO): Promise<UserEntity>;
  get(document: number): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
}
