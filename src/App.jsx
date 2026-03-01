import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HirerDashboard from './pages/HirerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateDetail from './pages/CandidateDetail';

// Protected Route component that uses AuthContext
function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    // Redirect them to login, but save the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If they are logged in but unauthorized for this specific role, send to their own dashboard
    return <Navigate to={userRole === 'candidate' ? '/candidate-dashboard' : '/hirer-dashboard'} replace />;
  }

  return children;
}

function AppRoutes() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route 
        path="/candidate/:email" 
        element={
          <ProtectedRoute>
            <CandidateDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hirer-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['hirer']}>
            <HirerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/candidate-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Default Redirect */}
      <Route 
        path="*" 
        element={
          <Navigate 
            to={isAuthenticated 
              ? (userRole === 'hirer' ? '/hirer-dashboard' : '/candidate-dashboard') 
              : '/'
            } 
            replace 
          />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
