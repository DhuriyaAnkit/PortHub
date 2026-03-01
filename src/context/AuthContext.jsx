import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsersDB } from '../data/mockData';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-seed database if empty
    let users = JSON.parse(localStorage.getItem('porthub_users') || 'null');
    if (!users) {
      localStorage.setItem('porthub_users', JSON.stringify(initialUsersDB));
      users = initialUsersDB;
    }

    // Check local storage for existing session on initial load
    const sessionUserEmail = localStorage.getItem('porthub_session');
    if (sessionUserEmail && users[sessionUserEmail]) {
      setCurrentUser(users[sessionUserEmail]);
      setUserRole(users[sessionUserEmail].role || 'hirer');
    }
    setLoading(false);
  }, []);

  const getAllCandidates = () => {
    const users = JSON.parse(localStorage.getItem('porthub_users') || '{}');
    return Object.values(users).filter(u => u.role === 'candidate');
  };

  const getCandidateByEmail = (email) => {
    const users = JSON.parse(localStorage.getItem('porthub_users') || '{}');
    return users[email] || null;
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('porthub_users') || '{}');
        const userProfile = users[email];
        
        // Very basic validation matching mock
        if (userProfile && userProfile.password === password) {
          setCurrentUser(userProfile);
          const role = userProfile.role || 'hirer';
          setUserRole(role);
          localStorage.setItem('porthub_session', email); // Create dummy session
          resolve({ user: userProfile, role });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500); // Simulate network latency
    });
  };

  const register = (profileData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('porthub_users') || '{}');
        users[profileData.email] = profileData;
        localStorage.setItem('porthub_users', JSON.stringify(users));
        resolve(true);
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('porthub_session');
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const users = JSON.parse(localStorage.getItem('porthub_users') || '{}');
    const newProfile = { ...currentUser, ...updatedData };
    users[currentUser.email] = newProfile;
    localStorage.setItem('porthub_users', JSON.stringify(users));
    setCurrentUser(newProfile);
  };

  const getCandidateNotifications = (candidateId) => {
    const notifications = JSON.parse(localStorage.getItem('porthub_notifications') || '{}');
    return notifications[candidateId] || [];
  };

  const notifyCandidateShortlisted = (candidateId, hirerData, isAdding = true) => {
    const notifications = JSON.parse(localStorage.getItem('porthub_notifications') || '{}');
    if (!notifications[candidateId]) {
      notifications[candidateId] = [];
    }

    if (isAdding) {
      // Add notification. We use current time to show "when" it happened.
      const newNotification = {
        id: Date.now(),
        hirerName: hirerData.name || 'A Hiring Manager',
        companyName: hirerData.companyName || 'A Company',
        timestamp: new Date().toISOString(),
        type: 'shortlist'
      };
      
      // Prevent exact duplicates by same company
      const exists = notifications[candidateId].find(n => n.companyName === newNotification.companyName);
      if (!exists) {
        notifications[candidateId].unshift(newNotification);
      }
    } else {
      // Remove notification if un-shortlisted
      notifications[candidateId] = notifications[candidateId].filter(
        n => n.companyName !== (hirerData.companyName || 'A Company')
      );
    }
    
    localStorage.setItem('porthub_notifications', JSON.stringify(notifications));
  };

  const value = {
    currentUser,
    userRole,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    updateProfile,
    getCandidateNotifications,
    notifyCandidateShortlisted,
    getAllCandidates,
    getCandidateByEmail,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
