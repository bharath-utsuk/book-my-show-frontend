import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

interface LoginPageProps {
  onLogin: (userId: string, userName: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(email, password);

      if (response.success && response.data) {
        // Store auth tokens and user info
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('userName', response.data.user.name);

        // Call parent callback
        onLogin(response.data.user.id, response.data.user.name);

        // Navigate to home
        navigate('/');
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">BookMyShow</span>
          </div>
          <h1>Welcome Back!</h1>
          <p>Sign in to book your favorite movies</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

