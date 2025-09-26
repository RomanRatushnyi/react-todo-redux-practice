import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  text: string
  status: 'todo' | 'inProgress' | 'completed'
  createdAt: string
}

export type TodoStatus = 'todo' | 'inProgress' | 'completed'

interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

const loadTodosFromStorage = (): Todo[] => {
  try {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        status: todo.status || (todo.completed ? 'completed' : 'todo'),
        createdAt: todo.createdAt || new Date().toISOString()
      }))
    }
  } catch (error) {
    console.error('Error loading todos from localStorage:', error)
  }
  return []
}

const saveTodosToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving todos to localStorage:', error)
  }
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    ...initialState,
    todos: loadTodosFromStorage()
  },
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        status: 'todo',
        createdAt: new Date().toISOString() // Сохраняем как строку
      }
      state.todos.push(newTodo)
      saveTodosToStorage(state.todos)
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
      saveTodosToStorage(state.todos)
    },

    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
        saveTodosToStorage(state.todos)
      }
    },

    updateTodoStatus: (state, action: PayloadAction<{ id: string; status: TodoStatus }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.status = action.payload.status
        saveTodosToStorage(state.todos)
      }
    },

    moveTodo: (state, action: PayloadAction<{ activeId: string; overId: string; overStatus: TodoStatus }>) => {
      const { activeId, overId, overStatus } = action.payload
      const activeTodo = state.todos.find(todo => todo.id === activeId)

      if (activeTodo) {
        activeTodo.status = overStatus

        if (overId !== activeId) {
          const activeIndex = state.todos.findIndex(todo => todo.id === activeId)
          const overIndex = state.todos.findIndex(todo => todo.id === overId)

          if (activeIndex !== -1 && overIndex !== -1) {
            const [removed] = state.todos.splice(activeIndex, 1)
            state.todos.splice(overIndex, 0, removed)
          }
        }

        saveTodosToStorage(state.todos)
      }
    }
  }
})

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  updateTodoStatus,
  moveTodo
} = todoSlice.actions

export default todoSlice.reducer
