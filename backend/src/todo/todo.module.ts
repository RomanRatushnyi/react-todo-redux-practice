import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.model";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "../jwt-auth.guard";

@Module({
  imports: [
    SequelizeModule.forFeature([Todo]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "mySecretKey",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService, JwtAuthGuard],
})
export class TodoModule {}
