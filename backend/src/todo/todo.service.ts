import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { CreateTodoDto, UpdateTodoDto, TodoResponse } from '../../../shared/types';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async findAll(): Promise<TodoResponse> {
    const todos = await this.todoModel.findAll({
      order: [['createdAt', 'DESC']],
    });

    return {
      data: todos.map(todo => todo.toJSON()),
      total: todos.length,
    };
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({
      text: createTodoDto.text,
      status: 'todo',
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoModel.update(updateTodoDto, {
      where: { id },
    });
    return this.todoModel.findByPk(id);
  }

  async remove(id: string): Promise<void> {
    await this.todoModel.destroy({
      where: { id },
    });
  }
}
