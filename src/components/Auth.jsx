import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const validate = ({ mode, fullName, email, password }) => {
  if (mode === 'signup' && !fullName.trim()) return 'Full name is required.';
  if (!email.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  if (!password) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return null;
};

const Auth = () => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
  };

  const switchMode = (newMode) => {
    reset();
    setMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate({ mode, fullName, email, password });
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 400));

    const result = mode === 'login'
      ? login({ email, password })
      : signup({ fullName, email, password });

    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Background decoration */}
      <div className="auth-bg-blob auth-bg-blob--1" />
      <div className="auth-bg-blob auth-bg-blob--2" />

      <div className="auth-card glass-panel">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-icon">🗳️</span>
          <span className="auth-logo-text">Janmat Guide</span>
        </div>

        <h1 className="auth-title">
          {mode === 'login' ? 'Welcome back!' : 'Join Janmat Guide'}
        </h1>
        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Log in to continue your voter education journey.'
            : 'Create your free account to get started.'}
        </p>

        <div className="auth-demo-notice">
          🔐 Demo authentication — data is stored locally in your browser.
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === 'signup' && (
            <div className="auth-field">
              <label htmlFor="auth-fullname">Full Name</label>
              <input
                id="auth-fullname"
                type="text"
                placeholder="Ravi Kumar"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">
              Password
              {mode === 'signup' && <span className="field-hint"> (min. 6 characters)</span>}
            </label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className="auth-error" role="alert">⚠️ {error}</p>}

          <button
            type="submit"
            className="auth-submit btn-primary"
            disabled={loading}
          >
            {loading
              ? (mode === 'login' ? 'Logging in…' : 'Creating account…')
              : (mode === 'login' ? 'Log In' : 'Create Account')}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <button className="auth-link" onClick={() => switchMode('signup')}>Create one</button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button className="auth-link" onClick={() => switchMode('login')}>Log In</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
