import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null
}

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

const loadAuthFromStorage = (): { isAuthenticated: boolean; user: User | null } => {
  try {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const parsedAuth = JSON.parse(savedAuth)
      return {
        isAuthenticated: parsedAuth.isAuthenticated || false,
        user: parsedAuth.user || null
      }
    }
  } catch (error) {
    console.error('Error loading auth from localStorage:', error)
  }
  return { isAuthenticated: false, user: null }
}

const saveAuthToStorage = (isAuthenticated: boolean, user: User | null) => {
  try {
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated, user }))
  } catch (error) {
    console.error('Error saving auth to localStorage:', error)
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...loadAuthFromStorage()
  },
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload

      if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        const user: User = {
          id: '1',
          username: username
        }

        state.isAuthenticated = true
        state.user = user
        state.error = null

        saveAuthToStorage(true, user)
      } else {
        state.error = 'Неправильний логін або пароль'
      }
    },

    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.error = null

      saveAuthToStorage(false, null)
      localStorage.removeItem('todos')
    },

    clearError: (state) => {
      state.error = null
    }
  }
})

export const { loginSuccess, logout, clearError } = authSlice.actions
export default authSlice.reducer
