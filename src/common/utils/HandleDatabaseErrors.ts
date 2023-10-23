import { DatabaseError } from "../errors/Database";
import { PrismaClientError } from "../errors/PrismaClient";
import { UniqueConstraintError } from "../errors/UniqueConstraint";

enum PrismaErrors {
  UniqueConstraintFail = "P2002",
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);
    default:
      return new DatabaseError(e.message);
  }
};
