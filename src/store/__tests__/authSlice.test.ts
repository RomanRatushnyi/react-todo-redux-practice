import { configureStore } from '@reduxjs/toolkit'
import authReducer, { loginSuccess, logout, clearError } from '../authSlice'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock as any

const createTestStore = () => configureStore({
  reducer: {
    auth: authReducer,
  },
})

type TestStore = ReturnType<typeof createTestStore>

describe('authSlice', () => {
  let store: TestStore

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    store = createTestStore()
  })

  test('should handle login success with correct credentials', () => {
    const loginData = { username: 'admin', password: 'admin123' }

    store.dispatch(loginSuccess(loginData))

    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(true)
    expect(state.user).toEqual({ id: '1', username: 'admin' })
    expect(state.error).toBe(null)
  })

  test('should handle login failure with incorrect credentials', () => {
    const loginData = { username: 'wrong', password: 'wrong' }

    store.dispatch(loginSuccess(loginData))

    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBe(null)
    expect(state.error).toBe('Неправильний логін або пароль')
  })

  test('should handle logout', () => {
    // First login with correct credentials
    store.dispatch(loginSuccess({ username: 'admin', password: 'admin123' }))

    // Then logout
    store.dispatch(logout())

    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBe(null)
  })

  test('should clear error', () => {
    // Create store with error state
    const storeWithError = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          isAuthenticated: false,
          user: null,
          error: 'Some error'
        }
      }
    })

    storeWithError.dispatch(clearError())

    const state = storeWithError.getState().auth
    expect(state.error).toBe(null)
  })
})
