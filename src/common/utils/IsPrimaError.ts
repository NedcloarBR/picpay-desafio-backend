import { PrismaClientError } from "../errors/PrismaClient";

export const isPrismaError = (e: PrismaClientError) => {
  return (
    typeof e.code === "string" &&
    typeof e.clientVersion === "string" &&
    (typeof e.meta === "undefined" || typeof e.meta === "object")
  );
};
