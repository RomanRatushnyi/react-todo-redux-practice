import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../../../shared/types';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
