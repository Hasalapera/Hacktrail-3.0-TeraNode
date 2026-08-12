import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '../components/DashboardIcon';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../pages/context/authContext';
import DASHBOARD_TABS from '../pages/utils/dashboardTabs';

export default function DashboardLayout({ activeTab, onTabChange, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const activeLabel = useMemo(
    () => DASHBOARD_TABS.find(tab => tab.id === activeTab)?.label || 'Overview',
    [activeTab]
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        user={user}
        onLogout={handleLogout}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#1A3268]">Admin Dashboard</span>
            <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-gray-900">{activeLabel}</h1>
            <p className="hidden text-sm text-gray-500 md:block">Welcome back, {user?.name || 'Admin'}. Keep the platform clean, verified, and moving.</p>
          </div>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1F4C] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1A3268] lg:hidden" onClick={handleLogout}>
            <DashboardIcon name="logout" />
            <span>Logout</span>
          </button>
        </header>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden" role="tablist" aria-label="Admin dashboard tabs">
          {DASHBOARD_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`inline-flex flex-shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? 'border-[#0D1F4C] bg-[#0D1F4C] text-white'
                  : 'border-slate-200 bg-white text-gray-600 hover:bg-slate-100'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <DashboardIcon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {children}
      </main>
    </div>
  );
}
