import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { Todo } from './todo/todo.model';
import { User } from './user/user.model';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'todouser',
      password: 'todopassword',
      database: 'todoapp',
      models: [Todo, User],
      autoLoadModels: true,
      synchronize: true,
    }),
    TodoModule,
    UserModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
