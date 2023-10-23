import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IUserService } from "src/types";
import { Routes, Services } from "src/types/constants";
import { UserDTO } from "./userDTO";

@Controller(Routes.USER)
export class UserController {
  constructor(@Inject(Services.USER) private readonly service: IUserService) {}

  @Get()
  public async get() {
    return "UserController";
  }

  @Post()
  public async create(@Body() userDTO: UserDTO) {
    return await this.service.create(userDTO);
  }

  @Get(":document")
  public async getUser(@Param("document") document: string) {
    return await this.service.getByDocument(document);
  }

  @Get("all")
  public async getAll() {
    return await this.service.getAll();
  }
}
