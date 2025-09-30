import { configureStore } from '@reduxjs/toolkit'
import authReducer, { loginSuccess, logout, clearError } from '../authSlice'

// Типизированный store для тестов
const createTestStore = () => configureStore({
  reducer: {
    auth: authReducer,
  },
})

type TestStore = ReturnType<typeof createTestStore>

describe('authSlice', () => {
  let store: TestStore

  beforeEach(() => {
    store = createTestStore()
  })

  test('should handle login success', () => {
    const loginData = { username: 'testuser', password: 'password' }

    store.dispatch(loginSuccess(loginData))

    const state = store.getState().auth
    expect(state.isAuthenticated).toBe(true)
    expect(state.user).toEqual({ username: 'testuser', password: 'password' })
    expect(state.error).toBe(null)
  })

  test('should handle logout', () => {
    // First login
    store.dispatch(loginSuccess({ username: 'testuser', password: 'password' }))

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
