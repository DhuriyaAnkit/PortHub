import React from 'react';
import { SlidersHorizontal, Search, Briefcase } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, availableSkills }) {
  const handleRoleChange = (e) => setFilters({ ...filters, role: e.target.value });
  const handleExpChange = (e) => setFilters({ ...filters, minExperience: parseInt(e.target.value) || 0 });
  
  const toggleSkill = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    setFilters({ ...filters, skills: newSkills });
  };

  return (
    <aside className="glass-panel" style={{ padding: '1.5rem', height: '100%', overflowY: 'auto', position: 'sticky', top: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
        <SlidersHorizontal size={20} color="var(--primary)" />
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Filters</h2>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Search Keyword
        </label>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Name, skills, etc." 
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
              background: 'var(--bg-dark)', 
              border: '1px solid var(--border-glass)', 
              borderRadius: '8px',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Search by Role
        </label>
        <div style={{ position: 'relative' }}>
          <Briefcase size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="e.g. Frontend, Designer" 
            value={filters.searchRole}
            onChange={(e) => setFilters({ ...filters, searchRole: e.target.value })}
            style={{ 
              width: '100%', 
              padding: '0.75rem 0.75rem 0.75rem 2.5rem', 
              background: 'var(--bg-dark)', 
              border: '1px solid var(--border-glass)', 
              borderRadius: '8px',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Minimum Experience
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input 
            type="range" 
            min="0" 
            max="15" 
            value={filters.minExperience}
            onChange={handleExpChange}
            style={{ flex: 1, accentColor: 'var(--primary)' }}
          />
          <span style={{ fontSize: '0.9rem', minWidth: '40px', textAlign: 'right' }}>
            {filters.minExperience}+ yrs
          </span>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
          Key Skills
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {availableSkills.map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              style={{
                background: filters.skills.includes(skill) ? 'var(--primary)' : 'var(--bg-dark)',
                border: `1px solid ${filters.skills.includes(skill) ? 'var(--primary)' : 'var(--border-glass)'}`,
                color: filters.skills.includes(skill) ? 'white' : 'var(--text-main)',
                padding: '0.4rem 0.8rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
