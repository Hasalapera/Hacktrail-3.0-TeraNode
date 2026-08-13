import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/context/authContext';

export default function ProtectedRoute({ allowedRole, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-600">Loading UniTasker...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === 'ADMIN') return <Navigate to="/dashboard" replace />;
    if (user.role === 'EMPLOYER') return <Navigate to={user.shopName ? '/retail/jobs' : '/company/jobs'} replace />;
    if (user.role === 'STUDENT') return <Navigate to="/student/home" replace />;
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
}
