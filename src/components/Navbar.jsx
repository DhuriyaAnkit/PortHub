import React from 'react';
import { Users, Briefcase, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ shortlistedCount, onLogout, userEmail }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="glass-panel" style={{ 
      margin: '1rem 2rem', 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '1rem',
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: '0.5rem', borderRadius: '12px' }}>
          <Users size={24} color="white" />
        </div>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Port<span style={{ fontWeight: 400 }}>Hub</span>
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {userEmail && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {userEmail}
          </span>
        )}
        
        {shortlistedCount !== undefined && (
          <div className="glass-button" style={{ padding: '0.5rem 1rem', background: 'rgba(138, 43, 226, 0.15)', borderColor: 'rgba(138, 43, 226, 0.3)' }}>
            <Briefcase size={18} color="var(--primary)" />
            <span>Shortlisted: <strong>{shortlistedCount}</strong></span>
          </div>
        )}

        <button 
          onClick={toggleTheme} 
          className="glass-button" 
          style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} color="var(--primary)" /> : <Moon size={20} color="var(--primary)" />}
        </button>

        {onLogout && (
          <button 
            onClick={onLogout} 
            className="glass-button" 
            style={{ 
              padding: '0.5rem 1rem', 
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#ef4444'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>
    </nav>
  );
}
