import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/context/authContext';

export default function ProtectedRoute() {
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // User log wela nam, nested routes ටික render කරන්න.
}