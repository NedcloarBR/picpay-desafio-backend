import { $Enums } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Validate,
} from "class-validator";
import { IsValidDocument } from "src/common/decorators/IsValidDocument";

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(7, 150)
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsEnum($Enums.userType)
  @IsNotEmpty()
  public userType: $Enums.userType;

  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsValidDocument)
  public document: string;
}
