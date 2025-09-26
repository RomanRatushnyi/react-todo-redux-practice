import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TodoItem from './TodoItem'
import type { Todo, TodoStatus } from '../store/todoSlice'

interface TodoColumnProps {
  id: string
  title: string
  color: string
  todos: Todo[]
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TodoStatus) => void
}

const TodoColumn: React.FC<TodoColumnProps> = ({
  id,
  title,
  color,
  todos,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`todo-column ${isOver ? 'drag-over' : ''}`}
      style={{ '--column-color': color } as React.CSSProperties}
    >
      <div className="column-header">
        <h3 className="column-title">{title}</h3>
        <span className="column-count">{todos.length}</span>
      </div>

      <div className="column-content">
        <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </SortableContext>

        {todos.length === 0 && (
          <div className="column-empty">
            <p>Перетягніть задачу сюди</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoColumn
