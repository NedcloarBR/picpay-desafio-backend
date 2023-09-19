import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository, IUserService } from "src/types";
import { Repositories } from "src/types/constants";
import { UserEntity } from "./user.entity";
import { UserDTO } from "./userDTO";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(Repositories.USER) private readonly repository: IUserRepository,
  ) {}

  public async create(userDTO: UserDTO): Promise<UserEntity> {
    return await this.repository.create(userDTO);
  }

  public async get(document: number): Promise<UserEntity> {
    return await this.repository.get(document);
  }

  public async getAll(): Promise<UserEntity[]> {
    return await this.repository.getAll();
  }
}
