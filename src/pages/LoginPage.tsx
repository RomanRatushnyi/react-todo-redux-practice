import { useState } from 'react'
import { LogIn, Eye, EyeOff, Lock, User, Shield } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginUser, clearError } from '../store/authSlice'
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.auth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      return
    }

    dispatch(loginUser({ username: username.trim(), password }))
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
              <label htmlFor="username" className="form-label">
                <User size={16} />
                Username
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  handleInputChange()
                }}
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock size={16} />
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    handleInputChange()
                  }}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
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
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading || !username.trim() || !password.trim()}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="credentials-info">
              <p className="demo-credentials">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="credentials-text">
                Username: <code>admin</code><br />
                Password: <code>admin123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
