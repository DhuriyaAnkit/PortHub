import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { role } = await login(email, password);
      
      // Navigate to where they came from, or to their default dashboard
      const origin = location.state?.from?.pathname;
      if (origin) {
        navigate(origin, { replace: true });
      } else {
        navigate(role === 'candidate' ? '/candidate-dashboard' : '/hirer-dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Enter your details to access your account"
    >
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="name@example.com" 
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="#" style={{ 
              fontSize: '13px', 
              color: 'var(--secondary)', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
        </Button>

        <p style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: 'var(--text-muted)',
          marginTop: '8px'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ 
            color: 'var(--text-main)', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
