import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Briefcase, FileText, Link as LinkIcon, Download, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function CandidateDetail() {
  const { email } = useParams();
  const navigate = useNavigate();
  const { getCandidateByEmail } = useAuth();
  
  const candidate = getCandidateByEmail(email);

  const combinedRoles = candidate ? [
    candidate.roleTitle || candidate.role,
    candidate.roleTitle2,
    candidate.roleTitle3
  ].filter(Boolean).join(" | ") : "";

  const displayExperience = () => {
    if (!candidate) return "";
    const years = candidate.experienceYears || candidate.experience || 0;
    const months = candidate.experienceMonths || 0;
    if (months > 0) return `${years} Yrs, ${months} Mos`;
    return `${years} Years`;
  };

  if (!candidate) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2>Candidate Not Found</h2>
          <button className="glass-button primary" onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    alert(`Initiating contact with ${candidate.name}...`);
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '2rem' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--secondary)', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '1rem',
            padding: 0
          }}
        >
          <ArrowLeft size={18} /> Back to Search
        </button>

        <div className="glass-panel" style={{ display: 'flex', gap: '2rem', padding: '3rem', marginBottom: '2rem' }}>
          <img 
            src={candidate.avatar} 
            alt={candidate.name} 
            style={{ width: '150px', height: '150px', borderRadius: '50%', border: '4px solid var(--primary)', objectFit: 'cover' }}
          />
          
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>{candidate.name}</h1>
                <h2 style={{ fontSize: '1.2rem', color: 'var(--secondary)', margin: 0, fontWeight: 500 }}>{combinedRoles}</h2>
              </div>
              
              <button className="glass-button primary" onClick={handleContact}>
                <Mail size={18} /> Contact Candidate
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> {candidate.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={18} /> {displayExperience()} Experience
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                {candidate.availability}
              </span>
            </div>
            
            <p style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {candidate.bio}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} color="var(--primary)" /> Technical Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {candidate.skills.map(skill => (
                <span key={skill} style={{ 
                  background: 'var(--element-bg)', 
                  border: '1px solid var(--border-glass)',
                  padding: '0.5rem 1rem', 
                  borderRadius: '999px'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="var(--primary)" /> Portfolio & Links
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-main)', textDecoration: 'none', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <LinkIcon size={18} color="var(--secondary)" />
                <span style={{ flex: 1 }}>Github Profile</span>
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-main)', textDecoration: 'none', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <LinkIcon size={18} color="var(--secondary)" />
                <span style={{ flex: 1 }}>Personal Website</span>
              </a>
              
              {candidate.resumeLink ? (
                <a 
                  href={candidate.resumeLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass-button" 
                  style={{ marginTop: '1rem', justifyContent: 'center', textDecoration: 'none', color: 'var(--text-main)' }}
                >
                  <Download size={18} /> View Resume PDF
                </a>
              ) : (
                <button className="glass-button" style={{ marginTop: '1rem', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }} disabled>
                  <Download size={18} /> No Resume Linked
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
