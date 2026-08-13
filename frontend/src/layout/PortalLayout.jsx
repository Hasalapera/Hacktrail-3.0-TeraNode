import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../pages/context/authContext';

export default function PortalLayout({ roleTitle, tabs, activeTab, onTabChange, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white p-6 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1F4C] text-white font-extrabold text-lg">
              UT
            </div>
            <div>
              <span className="block font-extrabold text-gray-900">UniTasker</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{roleTitle}</span>
            </div>
          </div>
          
          <nav className="flex flex-col gap-1.5" aria-label="Portal navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0D1F4C] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-slate-100 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}

            <Link
              to="/messenger"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-slate-100 hover:text-gray-900"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </Link>
          </nav>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="mb-3 px-2">
            <strong className="block truncate text-sm font-bold text-gray-900">{user?.name}</strong>
            <span className="block truncate text-xs text-slate-500">{user?.email || user?.university_id}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-6 flex items-center justify-between gap-4 lg:hidden bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A3268]">{roleTitle} Portal</span>
            <h1 className="text-xl font-extrabold text-gray-900">UniTasker</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/messenger"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:text-slate-900"
              aria-label="Messages"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Mobile / Tablet Tab Bar */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#0D1F4C] text-white'
                  : 'bg-white border border-slate-200 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {children}
      </main>
    </div>
  );
}
