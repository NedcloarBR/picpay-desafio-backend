import { $Enums } from "@prisma/client";

export class UserEntity {
  public name: string;
  public document: string;
  public email: string;
  // public password: string; //! Disable for security of the user
  public userType: $Enums.userType;
  public money: number;
}
