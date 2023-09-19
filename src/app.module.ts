import { Module } from "@nestjs/common";
import { UserModule } from "./modules";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
