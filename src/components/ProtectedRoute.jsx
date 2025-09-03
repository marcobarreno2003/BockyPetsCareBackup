import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '@/lib/store';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const user = useStore(state => state.user);
  const isAdmin = useStore(state => state.isAdmin);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;