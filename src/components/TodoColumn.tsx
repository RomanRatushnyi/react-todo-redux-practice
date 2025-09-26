import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TodoItem from './TodoItem'
import type { Todo, TodoStatus } from '../App'

interface Column {
  id: string
  title: string
  color: string
}

interface TodoColumnProps {
  column: Column
  todos: Todo[]
  onEditTodo: (todo: Todo) => void
  onDeleteTodo: (id: string) => void
  onStatusChange: (id: string, status: TodoStatus) => void
}

const TodoColumn: React.FC<TodoColumnProps> = ({
  column,
  todos,
  onEditTodo,
  onDeleteTodo,
  onStatusChange
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`todo-column ${isOver ? 'drag-over' : ''}`}
      style={{ '--column-color': column.color } as React.CSSProperties}
    >
      <div className="column-header">
        <h3 className="column-title">{column.title}</h3>
        <span className="column-count">{todos.length}</span>
      </div>

      <div className="column-content">
        <SortableContext items={todos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => {
                const nextStatus = todo.status === 'completed'
                  ? 'todo'
                  : todo.status === 'todo'
                    ? 'inProgress'
                    : 'completed'
                onStatusChange(todo.id, nextStatus)
              }}
              onDelete={() => onDeleteTodo(todo.id)}
              onEdit={() => onEditTodo(todo)}
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
