import { ConflictError } from "./Conflict";
import { PrismaClientError } from "./PrismaClient";

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;

    super(`A record with this ${uniqueField} already exists.`);
  }
}
