import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Check, X, Edit2, GripVertical, Play } from 'lucide-react'
import type { Todo, TodoStatus } from '../App'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: () => void
  onStatusChange: (id: string, status: TodoStatus) => void
  isDragOverlay?: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isDragOverlay = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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

  if (isDragOverlay) {
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
      className={`todo-item status-${todo.status} ${isDragging ? 'dragging' : ''}`}
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
          onClick={onToggle}
          title={getToggleTooltip()}
        >
          {getStatusIcon()}
        </button>

        <div className="todo-text-container">
          <span className={`todo-text ${todo.status === 'completed' ? 'completed-text' : ''}`}>
            {todo.text}
          </span>
          <span className="todo-date">
            {todo.createdAt.toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="todo-action-button edit-button"
          onClick={onEdit}
          disabled={todo.status === 'completed'}
          title="Редагувати задачу"
        >
          <Edit2 size={16} />
        </button>

        <button
          className="todo-action-button delete-button"
          onClick={onDelete}
          title="Видалити задачу"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
