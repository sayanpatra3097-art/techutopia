import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tfLogo from '../assets/tf_logo.webp';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) {
      navigate('/login');
    } else {
      const user = JSON.parse(userStr);
      setFullName(user.name || '');
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword, referralCode, name: fullName })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to update password');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      // Update user state in localStorage to reflect mustChangePassword = false and new name
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.mustChangePassword = false;
        user.name = fullName;
        localStorage.setItem('user', JSON.stringify(user));
      }

      alert('Password changed successfully! Redirecting...');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo-wrapper">
          <img 
            src={tfLogo} 
            alt="TechUtopia Logo" 
            className="auth-box-logo" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <h2>Welcome!</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>
          Please create a new permanent password to secure your account.
        </p>

        <form onSubmit={handleChangePassword} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your new password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Confirm your new password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Referral Code (Optional)</label>
            <input 
              type="text" 
              placeholder="Enter a friend's referral code" 
              value={referralCode} 
              onChange={e => setReferralCode(e.target.value)} 
            />
            <small style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px', display: 'block' }}>If someone referred you, enter their code to earn +1 point!</small>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Updating Password...' : 'Save Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
