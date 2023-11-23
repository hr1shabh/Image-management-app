import React from 'react';
import Dashboard from '../components/Dashboard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const DashboardPage = () => {
  const { authToken} = useAuth();
  // Check if the user is authenticated and an admin
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-8">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
