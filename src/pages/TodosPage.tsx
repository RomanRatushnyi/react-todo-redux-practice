import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { Plus, LogOut, User } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTodo, deleteTodo, updateTodo, updateTodoStatus, moveTodo } from '../store/todoSlice'
import { logout } from '../store/authSlice'
import type { Todo, TodoStatus } from '../store/todoSlice'
import TodoItem from '../components/TodoItem'
import TodoForm from '../components/TodoForm'
import TodoColumn from '../components/TodoColumn'

const COLUMNS = [
  { id: 'todo', title: '📝 Потрібно виконати', color: '#3b82f6' },
  { id: 'inProgress', title: '⏳ В процесі виконання', color: '#f59e0b' },
  { id: 'completed', title: '✅ Виконано', color: '#10b981' }
] as const

const TodosPage = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.todos)
  const user = useAppSelector((state) => state.auth.user)

  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (COLUMNS.some(col => col.id === overId)) {
      dispatch(updateTodoStatus({ id: activeId, status: overId as TodoStatus }))
      return
    }

    const activeTask = todos.find(todo => todo.id === activeId)
    const overTask = todos.find(todo => todo.id === overId)

    if (!activeTask || !overTask) return

    if (activeTask.status !== overTask.status) {
      dispatch(updateTodoStatus({ id: activeId, status: overTask.status }))
    } else {
      dispatch(moveTodo({ activeId, overId, overStatus: overTask.status }))
    }
  }

  const handleAddTodo = (text: string) => {
    dispatch(addTodo({ text }))
    setShowForm(false)
  }

  const handleUpdateTodo = (id: string, text: string) => {
    dispatch(updateTodo({ id, text }))
    setEditingTodo(null)
  }

  const handleUpdateTodoStatus = (id: string, status: TodoStatus) => {
    dispatch(updateTodoStatus({ id, status }))
  }

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const getTodosByStatus = (status: TodoStatus) =>
    todos.filter(todo => todo.status === status)

  const activeTodo = activeId ? todos.find(todo => todo.id === activeId) : null

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-left">
            <h1 className="title">✨ Мої задачі</h1>
            <div className="user-info">
              <User size={16} />
              <span>Вітаємо, {user?.username}!</span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="add-button"
              onClick={() => setShowForm(true)}
              title="Додати нову задачу"
            >
              <Plus size={20} />
              Додати задачу
            </button>

            <button
              className="logout-button"
              onClick={handleLogout}
              title="Вийти з системи"
            >
              <LogOut size={20} />
              Вийти
            </button>
          </div>
        </header>

        {showForm && (
          <TodoForm
            onSubmit={handleAddTodo}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingTodo && (
          <TodoForm
            initialText={editingTodo.text}
            onSubmit={(text) => handleUpdateTodo(editingTodo.id, text)}
            onCancel={() => setEditingTodo(null)}
            isEditing
          />
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="columns">
            {COLUMNS.map(column => (
              <TodoColumn
                key={column.id}
                id={column.id}
                title={column.title}
                color={column.color}
                todos={getTodosByStatus(column.id as TodoStatus)}
                onEdit={setEditingTodo}
                onDelete={handleDeleteTodo}
                onStatusChange={handleUpdateTodoStatus}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTodo && (
              <TodoItem
                todo={activeTodo}
                onEdit={() => {}}
                onDelete={() => {}}
                onStatusChange={() => {}}
                isDragging
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

export default TodosPage
