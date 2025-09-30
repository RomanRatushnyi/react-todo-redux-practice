import { useState } from 'react'
import { LogIn, Eye, EyeOff, Lock, User, Shield } from 'lucide-react'
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
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <div className="company-logo">
              <Shield size={40} />
            </div>
            <h1 className="login-title">TodoTask Management</h1>
            <p className="login-subtitle">Secure Business Environment</p>
            <div className="environment-badge">
              <span className="env-indicator"></span>
              Test Environment
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    handleInputChange()
                  }}
                  placeholder="Enter your username"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    handleInputChange()
                  }}
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
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
              disabled={isLoading || !username.trim() || !password.trim()}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="security-info">
              <Shield size={16} />
              Secure connection established
            </div>
            <p className="version-info">v2.1.0 | Build 2025.09.30</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
