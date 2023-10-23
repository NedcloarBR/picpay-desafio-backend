import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import { name } from "../package.json";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ConflictInterceptor } from "./common/interceptors/Conflict";
import { DatabaseInterceptor } from "./common/interceptors/Database";
import { NotFoundInterceptor } from "./common/interceptors/NotFound";
import { UnauthorizedInterceptor } from "./common/interceptors/Unauthorized";

async function bootstrap() {
  config();
  const logger = new Logger();
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  try {
    app.setGlobalPrefix("api");
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(
      new ConflictInterceptor(),
      new DatabaseInterceptor(),
      new UnauthorizedInterceptor(),
      new NotFoundInterceptor(),
    );
    await app.listen(PORT);
    logger.log(
      `${name} Started on Port: ${PORT}, in ${
        process.env.ENVIRONMENT as string
      } environment mode`,
    );
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();
