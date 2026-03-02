import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CandidateCard from '../components/CandidateCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, userRole, currentUser, logout, getAllCandidates } = useAuth();
  const candidates = getAllCandidates();

  return (
    <div className="app-container">
      <Navbar onLogout={isAuthenticated ? logout : undefined} userEmail={currentUser?.email} />
      
      <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--text-main), #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Discover Top Tech Talent
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Browse through our curated list of exceptional developers, designers, and product managers ready for their next role.
          </p>
          {!isAuthenticated && (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/signup" className="glass-button primary" style={{ textDecoration: 'none' }}>
                Join the Network
              </Link>
              <Link to="/login" className="glass-button" style={{ textDecoration: 'none', color: 'black' }}>
                Sign In
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <Link to={userRole === 'hirer' ? '/hirer-dashboard' : '/candidate-dashboard'} className="glass-button primary" style={{ textDecoration: 'none' }}>
              Go to Dashboard
            </Link>
          )}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>Featured Candidates</h2>
        </div>

        <div className="candidates-grid">
          {candidates.map(candidate => (
            <CandidateCard 
              key={candidate.email} 
              candidate={candidate} 
              isPublic={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
