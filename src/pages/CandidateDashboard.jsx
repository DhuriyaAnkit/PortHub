import React, { useState } from 'react';
import { Users, FileText, CheckCircle, Upload, Edit3, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function CandidateDashboard() {
  const { currentUser, logout, updateProfile, getCandidateNotifications } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || "I am a passionate software engineer.");
  const [resumeLink, setResumeLink] = useState(currentUser?.resumeLink || "");
  
  // We use their email as a unique ID for the mock notification system since our signups don't yield integer IDs like the mockData.
  const candidateId = currentUser?.email || 1; 
  const notifications = getCandidateNotifications(candidateId);
  
  const handleSave = () => {
    updateProfile({ bio, resumeLink });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleUpload = () => {
    alert('Please provide your resume link in the Overview section instead.');
  };

  const combinedRoles = [
    currentUser?.roleTitle || currentUser?.role || "Software Engineer",
    currentUser?.roleTitle2,
    currentUser?.roleTitle3
  ].filter(Boolean).join(" | ");

  const displayExperience = () => {
    const years = currentUser?.experienceYears || currentUser?.experience || 0;
    const months = currentUser?.experienceMonths || 0;
    if (months > 0) {
      return `${years} Years, ${months} Months`;
    }
    return `${years} Years`;
  };

  return (
    <div className="app-container">
      <Navbar onLogout={logout} userEmail={currentUser?.email} />

      <main className="main-content" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>My Hub</h1>
          <div className="glass-button" style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <CheckCircle size={18} color="#10b981" />
            <span style={{ color: 'var(--text-main)' }}>Profile Visible to Hirers</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
          {/* Quick Actions Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '2px solid var(--secondary)'
              }}>
                <FileText size={40} color="var(--secondary)" />
              </div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Resume Document</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Keep your resume up to date to stand out.
              </p>
              <button className="glass-button primary" style={{ width: '100%' }} onClick={handleUpload}>
                <Upload size={18} /> Upload New PDF
              </button>
            </div>
            
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
               <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Recent Activity</h3>
               
               {notifications.length > 0 ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   {notifications.map(notif => (
                     <div key={notif.id} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                       <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
                         <strong>{notif.hirerName}</strong> at <strong>{notif.companyName}</strong> shortlisted your profile.
                       </p>
                       <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                         {new Date(notif.timestamp).toLocaleDateString()}
                       </p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', margin: '2rem 0' }}>
                   No recent activity to show.
                 </p>
               )}
            </div>
          </div>

          {/* Main Content Form */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0 }}>Overview</h2>
              {isEditing ? (
                <button className="glass-button primary" onClick={handleSave} style={{ padding: '0.5rem 1rem' }}>
                  <Save size={16} /> Save Changes
                </button>
              ) : (
                <button className="glass-button"onClick={() => setIsEditing(true)} style={{ padding: '0.5rem 1rem', color:'black' }}>
                  <Edit3 size={16} /> Edit
                </button>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Professional Title
              </label>
              <input 
                type="text" 
                value={combinedRoles} 
                disabled 
                style={{ 
                  width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', 
                  borderRadius: '8px', color: 'var(--text-main)', opacity: 0.7 
                }} 
              />
              <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>Your primary role title cannot be changed easily.</small>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                About Me (Bio)
              </label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                rows={6}
                style={{ 
                  width: '100%', padding: '1rem', background: isEditing ? 'var(--bg-dark)' : 'var(--border-glass)', 
                  border: `1px solid ${isEditing ? 'var(--secondary)' : 'var(--border-glass)'}`, 
                  borderRadius: '8px', color: 'var(--text-main)', resize: 'vertical'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Experience
              </label>
              <input 
                type="text" 
                value={displayExperience()} 
                disabled 
                style={{ 
                  width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', 
                  borderRadius: '8px', color: 'var(--text-main)', opacity: 0.7 
                }} 
              />
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Resume Link (Google Drive, Dropbox, etc.)
              </label>
              <input 
                type="url" 
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                disabled={!isEditing}
                placeholder="https://..."
                style={{ 
                  width: '100%', padding: '1rem', background: isEditing ? 'var(--bg-dark)' : 'var(--border-glass)', 
                  border: `1px solid ${isEditing ? 'var(--secondary)' : 'var(--border-glass)'}`, 
                  borderRadius: '8px', color: 'var(--text-main)', opacity: isEditing ? 1 : 0.7 
                }} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
