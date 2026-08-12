import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

export default function StudentHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, {user?.name}!
        </h1>
        <p className="text-slate-600 mt-2">
          This is your student dashboard. More features coming soon!
        </p>
        <p className="font-mono bg-slate-100 p-3 mt-6 rounded-md text-slate-700 text-sm">
          Your University ID: <span className="font-semibold">{user?.university_id}</span>
        </p>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}