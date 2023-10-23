import { Inject, Injectable } from "@nestjs/common";
import { ConflictError } from "src/common/errors/Conflict";
import { NotFoundError } from "src/common/errors/NotFound";
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
    const DocUser = await this.getByDocument(userDTO.document);
    const EmailUser = await this.getByEmail(userDTO.email);
    if (DocUser || EmailUser) {
      throw new ConflictError("Usuário já existe");
    }
    return await this.repository.create(userDTO);
  }

  public async getByDocument(document: string): Promise<UserEntity> {
    const user = await this.repository.getByDocument(document);
    if (!user) throw new NotFoundError("Usuário não encontrado");
    return user;
  }

  public async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.getByEmail(email);
    if (!user) throw new NotFoundError("Usuário não encontrado");
    return user;
  }

  public async getAll(): Promise<UserEntity[]> {
    return await this.repository.getAll();
  }

  public async update(document: string, money: number): Promise<UserEntity> {
    return this.repository.update(document, money);
  }
}
