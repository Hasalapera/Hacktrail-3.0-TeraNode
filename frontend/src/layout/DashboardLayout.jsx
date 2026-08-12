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
    <div className="dashboard-shell">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        user={user}
        onLogout={handleLogout}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-kicker">Admin Dashboard</span>
            <h1>{activeLabel}</h1>
            <p>Welcome back, {user?.name || 'Admin'}. Keep the platform clean, verified, and moving.</p>
          </div>
          <button type="button" className="dashboard-mobile-logout" onClick={handleLogout}>
            <DashboardIcon name="logout" />
            <span>Logout</span>
          </button>
        </header>

        <div className="dashboard-mobile-tabs" role="tablist" aria-label="Admin dashboard tabs">
          {DASHBOARD_TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'active' : ''}
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
