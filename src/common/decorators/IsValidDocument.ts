import { $Enums } from "@prisma/client";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "validDocument", async: false })
export class IsValidDocument implements ValidatorConstraintInterface {
  private documentLength: number;
  private value: string;
  private userType: $Enums.userType;
  private length: number;

  validate(document: string, args) {
    console.log(args);
    const { userType } = args.object;
    this.userType = userType;
    this.documentLength = document.toString().length;
    this.value = document;

    switch (this.userType) {
      case "CPF":
        this.length = 11;
        return /^\d{11}$/.test(document);
      case "CNPJ":
        this.length = 14;
        return /^\d{14}$/.test(document);
      default:
        return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `O Documento do usuário do Tipo ${this.userType} deve ter ${this.length} caracteres - Inserido ${this.documentLength} caracteres (${this.value})`;
  }
}
