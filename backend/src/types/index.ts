// This file must be backward compatible (identical) with the file types:
// shared/types.ts

export interface Todo {
  id: string
  text: string
  status: 'todo' | 'inProgress' | 'completed'
  createdAt: string
  updatedAt?: string
}

export type TodoStatus = 'todo' | 'inProgress' | 'completed'

export interface CreateTodoDto {
  text: string
}

export interface UpdateTodoDto {
  text?: string
  status?: TodoStatus
}

export interface TodoResponse {
  data: Todo[]
  total: number
}
