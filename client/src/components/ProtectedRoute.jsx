// import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/account" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
  
export default ProtectedRoute;