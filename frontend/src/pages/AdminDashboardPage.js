// AdminDashboardPage.js
import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { jwtDecode } from 'jwt-decode';

const AdminDashboardPage = () => {
  const { authToken} = useAuth();

  // Check if the user is authenticated and an admin
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  console.log(decodedToken);
  if(decodedToken.role !== 'admin'){
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
