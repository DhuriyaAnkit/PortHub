import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import CandidateCard from '../components/CandidateCard';
import { useAuth } from '../context/AuthContext';

export default function HirerDashboard() {
  const { currentUser, logout, notifyCandidateShortlisted, getAllCandidates } = useAuth();
  const candidates = getAllCandidates();
  
  // Persist shortlisted candidates to local storage
  const [shortlisted, setShortlisted] = useState(() => {
    const saved = localStorage.getItem(`bookmarks_${currentUser?.email}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({
    search: '',
    searchRole: '',
    minExperience: 0,
    skills: []
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`bookmarks_${currentUser.email}`, JSON.stringify(shortlisted));
    }
  }, [shortlisted, currentUser]);

  // Extract all unique skills for the filter sidebar
  const availableSkills = useMemo(() => {
    const skills = new Set();
    candidates.forEach(c => c.skills.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, []);

  const handleToggleShortlist = (id) => {
    setShortlisted(prev => {
      const isCurrentlyShortlisted = prev.includes(id);
      
      const candidateToBook = candidates.find(c => c.email === id);
      const notificationId = candidateToBook?.email || id;

      // Update the candidate's notifications
      if (typeof notifyCandidateShortlisted === 'function') {
        notifyCandidateShortlisted(notificationId, { 
          name: currentUser?.name || 'A Hiring Manager', 
          companyName: currentUser?.companyName || 'A Company'
        }, !isCurrentlyShortlisted);
      }

      return isCurrentlyShortlisted ? prev.filter(candId => candId !== id) : [...prev, id];
    });
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSearch = filters.search === '' || 
        candidate.name.toLowerCase().includes(filters.search.toLowerCase());
        
      const roleStr = [candidate.roleTitle || candidate.role, candidate.roleTitle2, candidate.roleTitle3].filter(Boolean).join(" ").toLowerCase();
      const matchesRole = filters.searchRole === '' || roleStr.includes(filters.searchRole.toLowerCase());
      
      const candidateExp = candidate.experienceYears || candidate.experience || 0;
      const matchesExperience = candidateExp >= filters.minExperience;
      
      const matchesSkills = filters.skills.length === 0 || 
        filters.skills.every(skill => candidate.skills.includes(skill));

      return matchesSearch && matchesRole && matchesExperience && matchesSkills;
    });
  }, [filters]);

  return (
    <div className="app-container">
      <Navbar shortlistedCount={shortlisted.length} onLogout={logout} userEmail={currentUser?.email} />
      
      <main className="main-content dashboard-layout">
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          availableSkills={availableSkills}
        />
        
        <div>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>
              Discover Candidates
            </h2>
            <span style={{ color: 'var(--text-muted)' }}>
              Showing {filteredCandidates.length} results
            </span>
          </div>

          {filteredCandidates.length > 0 ? (
            <div className="candidates-grid">
              {filteredCandidates.map(candidate => (
                <CandidateCard 
                  key={candidate.email} 
                  candidate={candidate} 
                  isShortlisted={shortlisted.includes(candidate.email)}
                  onToggleShortlist={() => handleToggleShortlist(candidate.email)}
                  isPublic={false} // Hirers get bookmark buttons
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No candidates found</h3>
              <p>Try adjusting your filters or search criteria.</p>
              <button 
                className="glass-button primary" 
                style={{ marginTop: '1rem' }}
                onClick={() => setFilters({ search: '', minExperience: 0, skills: [] })}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
