import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/context/authContext';

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    // Auth state එක check කරනකන් loading indicator එකක් පෙන්වමු.
    // මේකෙන් login page එකට ගිහින් ආපහු එන flicker එක නැති වෙනවා.
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Admin කෙනෙක් නම්, dashboard වගේ nested routes ටික render කරන්න.
}