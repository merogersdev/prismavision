import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  // If no user found, redirect to login
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <div>Dashboard</div>;
}
