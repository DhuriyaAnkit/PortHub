import React, { useState } from 'react';

export default function Input({ label, type = 'text', placeholder, icon: Icon, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {label && (
        <label style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          color: isFocused ? 'var(--text-main)' : 'var(--text-muted)',
          transition: 'color 0.2s ease',
          paddingLeft: '4px'
        }}>
          {label}
        </label>
      )}
      
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '14px',
            color: isFocused ? 'var(--primary)' : 'var(--text-muted)',
            transition: 'color 0.2s ease',
            pointerEvents: 'none',
            display: 'flex'
          }}>
            <Icon size={18} />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-card)',
            border: `1px solid ${isFocused ? 'var(--primary)' : 'var(--border-glass)'}`,
            borderRadius: '12px',
            padding: `14px ${Icon ? '42px' : '16px'}`,
            color: 'var(--text-main)',
            fontSize: '15px',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : 'none'
          }}
          {...props}
        />
      </div>
    </div>
  );
}
