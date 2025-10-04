import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI, type LoginRequest } from '../services/authService'

interface User {
  id: string
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  error: string | null
  loading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)
      const token = response.access_token
      document.cookie = `access_token=${token}; path=/; max-age=${60 * 60}; secure; samesite=strict`
      return response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка входа')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    ...loadAuthFromStorage()
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.error = null
      state.loading = false

      saveAuthToStorage(false, null)
      localStorage.removeItem('todos')
    },

    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload
        const mappedUser: User = {
          id: user.id.toString(),
          username: user.username
        }

        state.isAuthenticated = true
        state.user = mappedUser
        state.error = null
        state.loading = false

        saveAuthToStorage(true, mappedUser)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
        state.loading = false
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
