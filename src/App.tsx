import { useState, useEffect } from 'react'
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
import { Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'
import TodoColumn from './components/TodoColumn'
import './App.css'

export interface Todo {
  id: string
  text: string
  status: 'todo' | 'inProgress' | 'completed'
  createdAt: Date
}

export type TodoStatus = 'todo' | 'inProgress' | 'completed'

const COLUMNS = [
  { id: 'todo', title: '📝 Потрібно виконати', color: '#3b82f6' },
  { id: 'inProgress', title: '⏳ В процесі виконання', color: '#f59e0b' },
  { id: 'completed', title: '✅ Виконано', color: '#10b981' }
] as const

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        status: todo.status || (todo.completed ? 'completed' : 'todo'),
        createdAt: new Date(todo.createdAt)
      }))
      setTodos(parsedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

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
      setTodos(todos => todos.map(todo =>
        todo.id === activeId
          ? { ...todo, status: overId as TodoStatus }
          : todo
      ))
      return
    }

    const activeTask = todos.find(todo => todo.id === activeId)
    const overTask = todos.find(todo => todo.id === overId)

    if (!activeTask || !overTask) return

    if (activeTask.status !== overTask.status) {
      setTodos(todos => todos.map(todo =>
        todo.id === activeId
          ? { ...todo, status: overTask.status }
          : todo
      ))
    } else {
      const activeIndex = todos.findIndex(todo => todo.id === activeId)
      const overIndex = todos.findIndex(todo => todo.id === overId)

      if (activeIndex !== overIndex) {
        setTodos(todos => {
          const newTodos = [...todos]
          const [removed] = newTodos.splice(activeIndex, 1)
          newTodos.splice(overIndex, 0, removed)
          return newTodos
        })
      }
    }
  }

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      status: 'todo',
      createdAt: new Date()
    }
    setTodos([...todos, newTodo])
    setShowForm(false)
  }

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ))
    setEditingTodo(null)
  }

  const updateTodoStatus = (id: string, status: TodoStatus) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getTodosByStatus = (status: TodoStatus) =>
    todos.filter(todo => todo.status === status)

  const activeTodo = activeId ? todos.find(todo => todo.id === activeId) : null

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">✨ Мої задачі</h1>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{getTodosByStatus('todo').length}</span>
              <span className="stat-label">Потрібно виконати</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{getTodosByStatus('inProgress').length}</span>
              <span className="stat-label">В процесі викоання</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{getTodosByStatus('completed').length}</span>
              <span className="stat-label">Виконано</span>
            </div>
          </div>
        </header>

        <div className="add-button-container">
          <button
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Додати задачу
          </button>
        </div>

        {showForm && (
          <TodoForm
            onSubmit={addTodo}
            onCancel={() => setShowForm(false)}
            placeholder="Що необхідно зробити?"
          />
        )}

        {editingTodo && (
          <TodoForm
            onSubmit={(text) => updateTodo(editingTodo.id, text)}
            onCancel={() => setEditingTodo(null)}
            initialValue={editingTodo.text}
            placeholder="Редагувати задачу..."
            isEditing
          />
        )}

        <div className="board">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="columns">
              {COLUMNS.map(column => {
                const columnTodos = getTodosByStatus(column.id as TodoStatus)
                return (
                  <TodoColumn
                    key={column.id}
                    column={column}
                    todos={columnTodos}
                    onEditTodo={setEditingTodo}
                    onDeleteTodo={deleteTodo}
                    onStatusChange={updateTodoStatus}
                  />
                )
              })}
            </div>

            <DragOverlay>
              {activeTodo && (
                <div className="drag-overlay">
                  <TodoItem
                    todo={activeTodo}
                    onToggle={() => {}}
                    onDelete={() => {}}
                    onEdit={() => {}}
                    onStatusChange={() => {}}
                    isDragOverlay
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p className="empty-text">Поки задач немає</p>
            <p className="empty-subtext">Додайте сюди першу задачу, щоб розпочати!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
