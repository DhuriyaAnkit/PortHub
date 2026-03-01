import React from 'react';
import { UserPlus, UserCheck, MapPin, Briefcase, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CandidateCard({ candidate, isShortlisted, onToggleShortlist, isPublic = false }) {
  const navigate = useNavigate();

  const combinedRoles = [
    candidate.roleTitle || candidate.role,
    candidate.roleTitle2,
    candidate.roleTitle3
  ].filter(Boolean).join(" | ");

  const displayExperience = () => {
    const years = candidate.experienceYears || candidate.experience || 0;
    const months = candidate.experienceMonths || 0;
    if (months > 0) return `${years} Yrs, ${months} Mos`;
    return `${years} Years`;
  };

  return (
    <div className="glass-panel hover-lift" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <img 
          src={candidate.avatar} 
          alt={candidate.name} 
          style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--primary)' }}
        />
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{candidate.name}</h3>
          <p style={{ margin: 0, color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
            {combinedRoles}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Briefcase size={14} /> {displayExperience()}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <MapPin size={14} /> {candidate.location}
        </span>
      </div>

      <p style={{ fontSize: '0.9rem', flex: 1, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {candidate.bio}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {candidate.skills.slice(0, 4).map(skill => (
          <span 
            key={skill}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '999px',
              fontSize: '0.75rem',
              border: '1px solid var(--border-glass)'
            }}
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            +{candidate.skills.length - 4} more
          </span>
        )}
      </div>

      {isPublic ? (
        <button 
          className="glass-button primary"
          onClick={() => navigate(`/candidate/${candidate.email}`)}
          style={{ width: '100%', marginTop: 'auto' }}
        >
          <Eye size={18} />
          View Profile
        </button>
      ) : (
        <button 
          className={`glass-button ${isShortlisted ? '' : 'primary'}`}
          onClick={() => onToggleShortlist(candidate.email)}
          style={{ width: '100%', marginTop: 'auto' }}
        >
          {isShortlisted ? (
            <>
              <UserCheck size={18} style={{ color: '#10b981' }} />
              Shortlisted
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Bookmark Profile
            </>
          )}
        </button>
      )}
    </div>
  );
}
