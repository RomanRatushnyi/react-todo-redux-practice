import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Check, X, Edit2, GripVertical, Play } from 'lucide-react'
import type { Todo, TodoStatus } from '../../shared/types'

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TodoStatus) => void
  isDragging?: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
  isDragging = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: sortableIsDragging ? 0.5 : 1,
  }

  const getStatusIcon = () => {
    switch (todo.status) {
      case 'todo':
        return <div className="status-indicator todo-status" />
      case 'inProgress':
        return <Play size={12} className="status-icon in-progress-icon" />
      case 'completed':
        return <Check size={12} className="status-icon completed-icon" />
    }
  }

  const getNextStatus = (): TodoStatus => {
    switch (todo.status) {
      case 'todo':
        return 'inProgress'
      case 'inProgress':
        return 'completed'
      case 'completed':
        return 'todo'
    }
  }

  const getToggleTooltip = () => {
    switch (todo.status) {
      case 'todo':
        return 'Розпочати виконання'
      case 'inProgress':
        return 'Позначити як виконане'
      case 'completed':
        return 'Повернути в роботу'
    }
  }

  const handleStatusToggle = () => {
    onStatusChange(todo.id, getNextStatus())
  }

  if (isDragging) {
    return (
      <div className="todo-item drag-overlay-item">
        <div className="todo-content">
          <div className="drag-handle">
            <GripVertical size={16} />
          </div>

          {getStatusIcon()}

          <div className="todo-text-container">
            <span className={`todo-text ${todo.status === 'completed' ? 'completed-text' : ''}`}>
              {todo.text}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`todo-item status-${todo.status} ${sortableIsDragging ? 'dragging' : ''}`}
    >
      <div className="todo-content">
        <div
          className="drag-handle"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </div>

        <button
          className={`todo-status-button status-${todo.status}`}
          onClick={handleStatusToggle}
          title={getToggleTooltip()}
        >
          {getStatusIcon()}
        </button>

        <div className="todo-text-container">
          <span className={`todo-text ${todo.status === 'completed' ? 'completed-text' : ''}`}>
            {todo.text}
          </span>
        </div>

        <div className="todo-actions">
          <button
            className="action-button edit-button"
            onClick={() => onEdit(todo)}
            title="Редагувати задачу"
          >
            <Edit2 size={14} />
          </button>
          <button
            className="action-button delete-button"
            onClick={() => onDelete(todo.id)}
            title="Видалити задачу"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
