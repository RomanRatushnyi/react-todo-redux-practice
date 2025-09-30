import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'todouser',
      password: 'todopassword',
      database: 'todoapp',
      models: [Todo],
      autoLoadModels: true,
      synchronize: true,
    }),
    TodoModule,
  ],
})
export class AppModule {}
