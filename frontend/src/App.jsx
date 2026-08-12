import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layout/DashboardLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/management/user/AddUser'; // The page with the form
import StudentHome from './pages/StudentHome';
import NotFound from './pages/NotFound';

// AddUser පිටුව DashboardLayout එක ඇතුළේ render කිරීමට හදන wrapper component එක
const AddUserPage = () => {
  const navigate = useNavigate();

  // AddUser පිටුවේ ඉඳන් Sidebar එකේ වෙන tab එකක් click කළ විට,
  // අදාළ tab එකත් සමඟ ප්‍රධාන dashboard එකට navigate කරන්න.
  const handleTabChange = (tabId) => {
    navigate('/dashboard', { state: { initialTab: tabId } });
  };

  return (
    <DashboardLayout activeTab="students" onTabChange={handleTabChange}>
      <AddUser />
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Student Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student-home" element={<StudentHome />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-users" element={<AddUserPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
