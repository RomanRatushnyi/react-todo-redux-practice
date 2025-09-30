import { useState, useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'
import { useAppDispatch } from '../store/hooks'
import { createTodo, updateTodo } from '../store/todoSlice'

interface TodoFormProps {
  onCancel: () => void
  initialText?: string
  isEditing?: boolean
  todoId?: string
}

const TodoForm: React.FC<TodoFormProps> = ({
  onCancel,
  initialText = '',
  isEditing = false,
  todoId
}) => {
  const [text, setText] = useState(initialText)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (trimmedText) {
      if (isEditing && todoId) {
        dispatch(updateTodo({ id: todoId, text: trimmedText }))
      } else {
        dispatch(createTodo({ text: trimmedText }))
      }
      setText('')
      onCancel()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div className="todo-form-overlay">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-content">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isEditing ? 'Редагувати задачу...' : 'Нова задача...'}
            className="todo-input"
            maxLength={200}
          />

          <div className="form-actions">
            <button
              type="submit"
              className="form-button submit-button"
              disabled={!text.trim()}
            >
              <Check size={16} />
              {isEditing ? 'Зберегти' : 'Додати'}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="form-button cancel-button"
            >
              <X size={16} />
              Відмінити
            </button>
          </div>
        </div>

        <div className="form-hint">
          <span>Enter - зберегти, Esc - відмінити</span>
        </div>
      </form>
    </div>
  )
}

export default TodoForm
