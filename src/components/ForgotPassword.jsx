import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tfLogo from '../assets/tf_logo.webp';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setMessage(data.message || 'If an account exists with this email, a password reset link has been sent.');
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo-wrapper">
          <img src={tfLogo} alt="TechUtopia Logo" className="auth-box-logo" />
        </div>
        <h2>Forgot Password</h2>
        <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '14px', marginBottom: '20px' }}>
          Enter your registered email address and we'll send you a password reset link.
        </p>
        
        {message && (
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '10px', borderRadius: '6px', marginBottom: '15px', border: '1px solid rgba(99, 102, 241, 0.3)', textAlign: 'center', fontSize: '14px' }}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <p className="auth-switch">
          <span onClick={() => navigate('/login')}>Back to Login</span>
        </p>
      </div>
    </div>
  );
}
