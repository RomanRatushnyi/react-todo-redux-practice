import { Todo, TodoStatus, CreateTodoDto, UpdateTodoDto } from '../types'

describe('Shared Types', () => {
  it('should create valid Todo object', () => {
    const todo: Todo = {
      id: '1',
      text: 'Test todo',
      status: 'todo',
      createdAt: '2025-09-30T00:00:00.000Z'
    }

    expect(todo.id).toBe('1')
    expect(todo.text).toBe('Test todo')
    expect(todo.status).toBe('todo')
    expect(todo.createdAt).toBeDefined()
  })

  it('should validate TodoStatus enum values', () => {
    const validStatuses: TodoStatus[] = ['todo', 'inProgress', 'completed']

    validStatuses.forEach(status => {
      expect(['todo', 'inProgress', 'completed']).toContain(status)
    })
  })

  it('should create valid CreateTodoDto', () => {
    const createDto: CreateTodoDto = {
      text: 'New todo'
    }

    expect(createDto.text).toBe('New todo')
  })

  it('should create valid UpdateTodoDto', () => {
    const updateDto: UpdateTodoDto = {
      text: 'Updated todo',
      status: 'completed'
    }

    expect(updateDto.text).toBe('Updated todo')
    expect(updateDto.status).toBe('completed')
  })
})
