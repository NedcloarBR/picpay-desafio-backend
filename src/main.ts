import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import { name } from "../package.json";
import { AppModule } from "./app.module";

async function bootstrap() {
  config();
  const logger = new Logger();
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  try {
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
