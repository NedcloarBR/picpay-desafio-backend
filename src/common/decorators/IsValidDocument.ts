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
  private valid: boolean;

  validate(document: string, args) {
    const { userType } = args.object;
    this.userType = userType;
    this.documentLength = document.toString().length;
    this.value = document;

    switch (this.userType) {
      case "CPF":
        this.length = 11;
        this.valid = true;
        return /^\d{11}$/.test(document);
      case "CNPJ":
        this.length = 14;
        this.valid = true;

        return /^\d{14}$/.test(document);
      default:
        this.valid = false;
        return;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    if (!this.valid) return `Tipo de usuário ${this.userType} inexistente`;
    return `O Documento do usuário do Tipo ${this.userType} deve ter ${this.length} caracteres - Inserido ${this.documentLength} caracteres (${this.value})`;
  }
}
