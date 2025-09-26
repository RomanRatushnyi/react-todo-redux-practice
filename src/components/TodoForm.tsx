import { useState, useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'

interface TodoFormProps {
  onSubmit: (text: string) => void
  onCancel: () => void
  placeholder: string
  initialValue?: string
  isEditing?: boolean
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel,
  placeholder,
  initialValue = '',
  isEditing = false
}) => {
  const [text, setText] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (trimmedText) {
      onSubmit(trimmedText)
      setText('')
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
            placeholder={placeholder}
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
