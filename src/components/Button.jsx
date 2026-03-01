import React from 'react';

export default function Button({ children, type = 'button', variant = 'primary', style, ...props }) {
  const isPrimary = variant === 'primary';
  
  return (
    <button
      type={type}
      style={{
        width: '100%',
        padding: '14px 24px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: 'none',
        background: isPrimary 
          ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
          : 'rgba(255, 255, 255, 0.05)',
        color: isPrimary ? '#ffffff' : 'var(--text-primary)',
        marginTop: '12px',
        ...style
      }}
      onMouseEnter={(e) => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(59, 130, 246, 0.5)';
        } else {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        } else {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}
