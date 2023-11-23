// PrivateRoute.js (Protecting routes)
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      element={authToken ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
