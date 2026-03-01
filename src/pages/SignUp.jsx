import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Briefcase, Building2, Terminal, Hash, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SignUp() {
  const [accountType, setAccountType] = useState('candidate'); // 'candidate' | 'hirer'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleTitle: '',
    roleTitle2: '',
    roleTitle3: '',
    experienceYears: '',
    experienceMonths: '',
    skills: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Extra Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      let profileData = { ...formData, role: accountType };
      
      if (accountType === 'candidate') {
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        profileData = {
          ...profileData,
          skills: skillsArray.length > 0 ? skillsArray : ['React', 'JavaScript'],
          avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
          location: "Location Not Set",
          bio: "I am a new candidate looking for opportunities.",
          availability: "Available Now"
        };
      }

      await register(profileData);
      
      // Auto-login after successful registration
      await login(formData.email, formData.password);
      
      navigate(accountType === 'candidate' ? '/candidate-dashboard' : '/hirer-dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Join PortHub and discover great opportunities"
    >
      <div style={{
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '0.25rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid var(--border-glass)'
      }}>
        <button
          type="button"
          onClick={() => setAccountType('candidate')}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: 'none',
            borderRadius: '8px',
            background: accountType === 'candidate' ? 'var(--primary)' : 'transparent',
            color: accountType === 'candidate' ? 'white' : 'var(--text-muted)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <User size={18} /> Candidate
        </button>
        <button
          type="button"
          onClick={() => setAccountType('hirer')}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: 'none',
            borderRadius: '8px',
            background: accountType === 'hirer' ? 'var(--primary)' : 'transparent',
            color: accountType === 'hirer' ? 'white' : 'var(--text-muted)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Building2 size={18} /> Hirer
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Input 
          label="Full Name" 
          name="name"
          type="text" 
          placeholder="John Doe" 
          icon={User}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input 
          label="Email Address" 
          name="email"
          type="email" 
          placeholder="name@example.com" 
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input 
          label="Password" 
          name="password"
          type="password" 
          placeholder="Create a strong password (min 6 chars)" 
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        {accountType === 'candidate' ? (
          <>
            <Input 
              label="Primary Role Title" 
              name="roleTitle"
              type="text" 
              placeholder="e.g. Frontend Engineer" 
              icon={Terminal}
              value={formData.roleTitle}
              onChange={handleChange}
              required
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input 
                label="Secondary Role (Optional)" 
                name="roleTitle2"
                type="text" 
                placeholder="e.g. UI/UX Designer" 
                icon={Terminal}
                value={formData.roleTitle2}
                onChange={handleChange}
              />
              <Input 
                label="Tertiary Role (Optional)" 
                name="roleTitle3"
                type="text" 
                placeholder="e.g. Product Manager" 
                icon={Terminal}
                value={formData.roleTitle3}
                onChange={handleChange}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input 
                label="Experience (Years)" 
                name="experienceYears"
                type="number" 
                min="0"
                placeholder="e.g. 3" 
                icon={Hash}
                value={formData.experienceYears}
                onChange={handleChange}
                required
              />
              <Input 
                label="Experience (Months)" 
                name="experienceMonths"
                type="number" 
                min="0"
                max="11"
                placeholder="e.g. 6" 
                icon={Hash}
                value={formData.experienceMonths}
                onChange={handleChange}
              />
            </div>
            <Input 
              label="Key Skills" 
              name="skills"
              type="text" 
              placeholder="React, CSS, Node.js" 
              icon={Star}
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </>
        ) : (
          <>
            <Input 
              label="Company Name" 
              name="companyName"
              type="text" 
              placeholder="e.g. ACME Corp" 
              icon={Building2}
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : `Register as ${accountType === 'candidate' ? 'Candidate' : 'Hirer'}`} <UserPlus size={18} />
        </Button>

        <p style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: 'var(--text-muted)',
          marginTop: '8px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ 
            color: 'var(--text-main)', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
