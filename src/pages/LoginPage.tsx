import { useState } from 'react'
import { LogIn, Eye, EyeOff, Lock, User } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginSuccess, clearError } from '../store/authSlice'
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector((state) => state.auth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      dispatch(loginSuccess({ username: username.trim(), password }))
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = () => {
    if (error) {
      dispatch(clearError())
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <LogIn size={32} />
          </div>
          <h1 className="login-title">Вхід до системи</h1>
          <p className="login-subtitle">Введіть свої дані для доступу до додатку</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Логін
            </label>
            <div className="input-container">
              <User className="input-icon" size={20} />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  handleInputChange()
                }}
                className="form-input"
                placeholder="Введіть логін"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  handleInputChange()
                }}
                className="form-input"
                placeholder="Введіть пароль"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                title={showPassword ? 'Приховати пароль' : 'Показати пароль'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={!username.trim() || !password.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Вхід...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Увійти
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <div className="demo-title">Демо-дані для входу:</div>
          <div className="demo-data">
            <div>Логін: <strong>admin</strong></div>
            <div>Пароль: <strong>admin123</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
