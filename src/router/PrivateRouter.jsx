import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Loader from '../pages/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log("PrivateRoute User:", user);

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;