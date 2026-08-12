import DashboardIcon from './DashboardIcon';
import DASHBOARD_TABS from '../pages/utils/dashboardTabs';

export default function Sidebar({ activeTab, onTabChange, user, onLogout }) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand">
        <div className="dashboard-logo">U</div>
        <div>
          <strong>UniLift</strong>
          <span>Admin Console</span>
        </div>
      </div>

      <nav className="dashboard-nav" aria-label="Admin navigation">
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
      </nav>

      <div className="dashboard-admin-card">
        <span>Signed in as</span>
        <strong>{user?.name || 'Admin'}</strong>
        <small>{user?.email || 'admin@unitasker.lk'}</small>
      </div>

      <button type="button" className="dashboard-logout" onClick={onLogout}>
        <DashboardIcon name="logout" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
