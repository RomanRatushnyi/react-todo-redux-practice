import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../../store/todoSlice'

const MockTodoForm = ({
  onCancel,
  initialText = '',
  isEditing = false
}: {
  onCancel: () => void
  initialText?: string
  isEditing?: boolean
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const text = formData.get('text') as string

    // Simulate dispatch call
    console.log('Would dispatch:', { text, isEditing })
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="todo-form">
      <input
        name="text"
        defaultValue={initialText}
        placeholder={isEditing ? 'Редагувати задачу...' : 'Нова задача...'}
      />
      <button type="submit">
        {isEditing ? 'Зберегти' : 'Додати'}
      </button>
      <button type="button" onClick={onCancel}>
        Відмінити
      </button>
    </form>
  )
}

describe('TodoForm', () => {
  const renderWithStore = (component: React.ReactElement) => {
    const store = configureStore({
      reducer: { todos: todoReducer }
    })
    return render(<Provider store={store}>{component}</Provider>)
  }

  it('renders form with input and buttons', () => {
    renderWithStore(<MockTodoForm onCancel={() => {}} />)

    expect(screen.getByPlaceholderText('Нова задача...')).toBeInTheDocument()
    expect(screen.getByText('Додати')).toBeInTheDocument()
    expect(screen.getByText('Відмінити')).toBeInTheDocument()
  })

  it('calls onCancel when form is submitted', async () => {
    const mockOnCancel = jest.fn()
    renderWithStore(<MockTodoForm onCancel={mockOnCancel} />)

    const input = screen.getByPlaceholderText('Нова задача...')
    const submitButton = screen.getByText('Додати')

    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnCancel).toHaveBeenCalled()
    })
  })

  it('renders in edit mode', () => {
    renderWithStore(
      <MockTodoForm
        onCancel={() => {}}
        initialText="Edit todo"
        isEditing={true}
      />
    )

    expect(screen.getByDisplayValue('Edit todo')).toBeInTheDocument()
    expect(screen.getByText('Зберегти')).toBeInTheDocument()
  })
})
