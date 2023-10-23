import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { DatabaseError } from "../errors/Database";
import { handleDatabaseErrors } from "../utils/HandleDatabaseErrors";
import { isPrismaError } from "../utils/IsPrimaError";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (isPrismaError(error)) error = handleDatabaseErrors(error);

        if (error instanceof DatabaseError)
          throw new BadRequestException(error.message);

        throw error;
      }),
    );
  }
}
