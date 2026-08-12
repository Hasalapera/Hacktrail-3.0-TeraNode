import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">UniTasker</span>
          <button
            onClick={handleLogout}
            className="bg-gray-100 text-gray-700 font-semibold text-sm py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome, {user?.name || 'there'}!
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            You are signed in as a <strong>{user?.role || '…'}</strong>.
          </p>

          <div className="bg-gray-50 border rounded-lg p-4 space-y-2 text-sm">
            <p><span className="font-semibold text-gray-600">Email:</span> {user?.email}</p>
            {user?.university_id && (
              <p><span className="font-semibold text-gray-600">University ID:</span> {user.university_id}</p>
            )}
            {user?.skills?.length > 0 && (
              <p><span className="font-semibold text-gray-600">Skills:</span> {user.skills.join(', ')}</p>
            )}
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Dashboard is under construction — more features coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
