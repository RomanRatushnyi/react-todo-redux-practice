import { configureStore } from '@reduxjs/toolkit'
import todoReducer, { createTodo, updateTodo, deleteTodo } from '../todoSlice'

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

const createTestStore = () => configureStore({
  reducer: {
    todos: todoReducer,
  },
})

type TestStore = ReturnType<typeof createTestStore>

describe('todoSlice', () => {
  let store: TestStore

  beforeEach(() => {
    store = createTestStore()
    mockFetch.mockClear()
  })

  describe('createTodo async thunk', () => {
    it('should create todo successfully', async () => {
      const mockTodo = {
        id: '1',
        text: 'Test todo',
        status: 'todo' as const,
        createdAt: '2025-09-30T00:00:00.000Z',
      }

      mockFetch.mockResolvedValueOnce({
        json: async () => mockTodo,
        ok: true,
      } as Response)

      await store.dispatch(createTodo({ text: 'Test todo' }))

      const state = store.getState().todos
      expect(state.todos).toHaveLength(1)
      expect(state.todos[0]).toEqual(mockTodo)
    })
  })

  describe('updateTodo async thunk', () => {
    it('should update todo status', async () => {
      const initialTodo = {
        id: '1',
        text: 'Test todo',
        status: 'todo' as const,
        createdAt: '2025-09-30T00:00:00.000Z',
      }

      const updatedTodo = { ...initialTodo, status: 'completed' as const }

      // Add initial todo
      mockFetch.mockResolvedValueOnce({
        json: async () => initialTodo,
        ok: true,
      } as Response)
      await store.dispatch(createTodo({ text: 'Test todo' }))

      // Update todo
      mockFetch.mockResolvedValueOnce({
        json: async () => updatedTodo,
        ok: true,
      } as Response)
      await store.dispatch(updateTodo({ id: '1', status: 'completed' }))

      const state = store.getState().todos
      expect(state.todos[0].status).toBe('completed')
    })
  })

  describe('deleteTodo async thunk', () => {
    it('should delete todo', async () => {
      const todo = {
        id: '1',
        text: 'Test todo',
        status: 'todo' as const,
        createdAt: '2025-09-30T00:00:00.000Z',
      }

      // Add initial todo
      mockFetch.mockResolvedValueOnce({
        json: async () => todo,
        ok: true,
      } as Response)
      await store.dispatch(createTodo({ text: 'Test todo' }))

      // Delete todo
      mockFetch.mockResolvedValueOnce({
        ok: true,
      } as Response)
      await store.dispatch(deleteTodo('1'))

      const state = store.getState().todos
      expect(state.todos).toHaveLength(0)
    })
  })
})
