import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  return token ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return (token && isAdmin) ? children : <Navigate to="/" />;
};