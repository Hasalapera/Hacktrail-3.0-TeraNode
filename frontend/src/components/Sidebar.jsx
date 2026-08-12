import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from './DashboardIcon';
import DASHBOARD_TABS from '../pages/utils/dashboardTabs';

export default function Sidebar({ activeTab, onTabChange, user, onLogout }) {
  const location = useLocation();

  return (
    <aside className="hidden w-[280px] flex-shrink-0 flex-col gap-7 bg-gradient-to-b from-[#0D1F4C] to-[#1A3268] p-6 text-white lg:flex sticky top-0 h-screen">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#F5C518] text-lg font-extrabold text-[#0D1F4C]">U</div>
        <div>
          <strong className="block text-lg font-bold leading-tight">UniLift</strong>
          <span className="block text-xs text-white/60">Admin Console</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Admin navigation">
        {DASHBOARD_TABS.map((tab) => (
          <Fragment key={tab.id}>
            <button
              type="button"
              className={
                activeTab === tab.id ||
                (tab.id === 'students' && location.pathname === '/admin/add-users')
                  ? 'flex items-center gap-3 rounded-lg bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-[inset_3px_0_0_#F5C518]'
                  : 'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white'
              }
              onClick={() => onTabChange(tab.id)}
            >
              <DashboardIcon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
            {/* "Students" tab එකට අදාළව "Add Student" link එක මෙතනින් එකතු වෙනවා */}
            {tab.id === 'students' && (
              <Link
                to="/admin/add-users"
                className={`block rounded-md py-1.5 pl-12 pr-4 text-xs transition-colors ${
                  location.pathname === '/admin/add-users'
                    ? 'font-semibold text-white bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Add Student
              </Link>
            )}
          </Fragment>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
        <span className="text-xs text-white/60">Signed in as</span>
        <strong className="mt-0.5 block text-sm font-semibold text-white">{user?.name || 'Admin'}</strong>
        <small className="block truncate text-xs text-white/60">{user?.email || 'admin@unitasker.lk'}</small>
      </div>

      <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20" onClick={onLogout}>
        <DashboardIcon name="logout" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
