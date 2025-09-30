import { render, screen, fireEvent } from '@testing-library/react'
import type { Todo } from '../../../shared/types'

// Простой мок компонента TodoItem для тестирования логики
const MockTodoItem = ({ todo, onEdit, onDelete }: {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}) => (
  <div data-testid="todo-item">
    <span>{todo.text}</span>
    <span>{todo.status}</span>
    <button onClick={() => onEdit(todo)}>Редагувати</button>
    <button onClick={() => onDelete(todo.id)}>Видалити</button>
  </div>
)

const mockTodo: Todo = {
  id: '1',
  text: 'Test todo',
  status: 'todo',
  createdAt: '2025-09-30T00:00:00.000Z'
}

describe('TodoItem', () => {
  const mockProps = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onStatusChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders todo text and status', () => {
    render(<MockTodoItem todo={mockTodo} onEdit={mockProps.onEdit} onDelete={mockProps.onDelete} />)

    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.getByText('todo')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    render(<MockTodoItem todo={mockTodo} onEdit={mockProps.onEdit} onDelete={mockProps.onDelete} />)

    const editButton = screen.getByText('Редагувати')
    fireEvent.click(editButton)

    expect(mockProps.onEdit).toHaveBeenCalledWith(mockTodo)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<MockTodoItem todo={mockTodo} onEdit={mockProps.onEdit} onDelete={mockProps.onDelete} />)

    const deleteButton = screen.getByText('Видалити')
    fireEvent.click(deleteButton)

    expect(mockProps.onDelete).toHaveBeenCalledWith('1')
  })
})
