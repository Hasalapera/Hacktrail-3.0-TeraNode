import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

const STATS = [
  { label: 'Active Students', value: '2,846', change: '+18%', tone: 'blue' },
  { label: 'Verified Employers', value: '128', change: '+12%', tone: 'green' },
  { label: 'Open Jobs', value: '342', change: '+24%', tone: 'yellow' },
  { label: 'Pending Reviews', value: '17', change: '-6%', tone: 'red' },
];

const STUDENTS = [
  { name: 'Hasala Shehan', id: 'TG/2022/1357', skill: 'Full-stack Development', status: 'Open to work' },
  { name: 'Tharushi Perera', id: 'TG/2021/1042', skill: 'UI Design', status: 'Verified' },
  { name: 'Naveen Dilshan', id: 'TG/2023/0918', skill: 'PC Repair', status: 'Pending' },
];

const JOBS = [
  { title: 'React Landing Page', owner: 'Ceylon Digital Labs', amount: 'Rs. 25,000', status: 'Open' },
  { title: 'Weekend Retail Assistant', owner: 'Colombo Mart', amount: 'Rs. 3,500/day', status: 'Review' },
  { title: 'Logo Design Package', owner: 'Lanka Beans', amount: 'Rs. 12,000', status: 'Assigned' },
];

const StatusPill = ({ children }) => {
  const statusStyles = {
    'open': 'bg-green-100 text-green-800 border-green-200',
    'open to work': 'bg-green-100 text-green-800 border-green-200',
    'verified': 'bg-blue-100 text-blue-800 border-blue-200',
    'review': 'bg-amber-100 text-amber-800 border-amber-200',
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'assigned': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };
  const key = children.toLowerCase();
  const classes = statusStyles[key] || 'bg-slate-100 text-slate-800 border-slate-200';
  return <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-bold ${classes}`}>{children}</span>;
};

export default function Dashboard() {
  const location = useLocation();
  // වෙන route එකක ඉඳන් එනකොට state එකේ tab එකක් pass කරලා තිබ්බොත් ඒක ගන්න, නැත්නම් 'overview' default කරන්න
  const [activeTab, setActiveTab] = useState(location.state?.initialTab || 'overview');

  // location state එක වෙනස් වෙනකොට active tab එක update කරන්න
  useEffect(() => {
    if (location.state?.initialTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(location.state.initialTab);
    }
  }, [location.state]);

  const renderTabContent = () => {
    if (activeTab === 'students') {
      return (
        <section className="animate-[fade-in-up_0.35s_ease-in-out] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Student Management</h2>
              <p className="text-sm text-gray-500">Review student accounts, skills, and verification state.</p>
            </div>
            <button className="w-full flex-shrink-0 rounded-lg bg-[#F5C518] px-4 py-2 text-xs font-bold text-[#0D1F4C] transition-all hover:brightness-95 sm:w-auto">Add Student</button>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            {STUDENTS.map(student => (
              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 border-b border-slate-200 bg-white p-4 last:border-b-0" key={student.id}>
                <div className="min-w-0">
                  <strong className="block truncate text-sm font-semibold text-gray-800">{student.name}</strong>
                  <span className="block text-xs text-gray-500">{student.id}</span>
                </div>
                <span className="hidden text-sm text-gray-600 md:block">{student.skill}</span>
                <StatusPill>{student.status}</StatusPill>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'jobs') {
      return (
        <section className="animate-[fade-in-up_0.35s_ease-in-out] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Job Listings</h2>
              <p className="text-sm text-gray-500">Track posted work, assignment status, and moderation queues.</p>
            </div>
            <button className="w-full flex-shrink-0 rounded-lg bg-[#F5C518] px-4 py-2 text-xs font-bold text-[#0D1F4C] transition-all hover:brightness-95 sm:w-auto">Review Queue</button>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            {JOBS.map(job => (
              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 border-b border-slate-200 bg-white p-4 last:border-b-0" key={job.title}>
                <div className="min-w-0">
                  <strong className="block truncate text-sm font-semibold text-gray-800">{job.title}</strong>
                  <span className="block text-xs text-gray-500">{job.owner}</span>
                </div>
                <span className="hidden text-sm text-gray-600 md:block">{job.amount}</span>
                <StatusPill>{job.status}</StatusPill>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'employers') {
      return (
        <section className="animate-[fade-in-up_0.35s_ease-in-out] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Employer Accounts</h2>
              <p className="text-sm text-gray-500">Approve company and retailer profiles before they publish jobs.</p>
            </div>
            <button className="w-full flex-shrink-0 rounded-lg bg-[#F5C518] px-4 py-2 text-xs font-bold text-[#0D1F4C] transition-all hover:brightness-95 sm:w-auto">Export List</button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#1A3268]">Companies</span>
              <strong className="my-1 block text-2xl font-bold text-gray-900">84 verified</strong>
              <p className="text-sm text-gray-500">12 new corporate accounts are waiting for document checks.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#1A3268]">Retailers</span>
              <strong className="my-1 block text-2xl font-bold text-gray-900">44 verified</strong>
              <p className="text-sm text-gray-500">Local business profiles are growing fastest around Colombo and Galle.</p>
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === 'settings') {
      return (
        <section className="animate-[fade-in-up_0.35s_ease-in-out] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Admin Settings</h2>
              <p className="text-sm text-gray-500">Manage access rules and platform defaults.</p>
            </div>
            <button className="w-full flex-shrink-0 rounded-lg bg-[#F5C518] px-4 py-2 text-xs font-bold text-[#0D1F4C] transition-all hover:brightness-95 sm:w-auto">Save Changes</button>
          </div>
          <div className="flex flex-col gap-3">
            {['Require student verification', 'Notify admins about new employers', 'Enable job moderation'].map(item => (
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4" key={item}>
                <span className="text-sm font-semibold text-gray-800">{item}</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 flex-shrink-0 cursor-pointer rounded text-[#0D1F4C] focus:ring-[#1A3268]" />
              </label>
            ))}
          </div>
        </section>
      );
    }

    return (
      <div className="grid animate-[fade-in-up_0.35s_ease-in-out] grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Platform Snapshot</h2>
              <p className="text-sm text-gray-500">Today&apos;s activity across UniLift students, employers, and jobs.</p>
            </div>
            <button className="w-full flex-shrink-0 rounded-lg bg-[#F5C518] px-4 py-2 text-xs font-bold text-[#0D1F4C] transition-all hover:brightness-95 sm:w-auto">Generate Report</button>
          </div>
          <div className="flex h-64 items-end gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4" aria-label="Weekly activity chart">
            {[42, 58, 48, 74, 64, 88, 76].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} className="flex-1 rounded-t-md bg-gradient-to-t from-[#1A3268] to-[#F5C518]" />
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-500">Common admin tasks.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <button className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 text-left text-sm font-semibold text-[#0D1F4C] transition-colors hover:border-[#1A3268] hover:bg-white px-4">Approve students</button>
            <button className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 text-left text-sm font-semibold text-[#0D1F4C] transition-colors hover:border-[#1A3268] hover:bg-white px-4">Review new jobs</button>
            <button className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 text-left text-sm font-semibold text-[#0D1F4C] transition-colors hover:border-[#1A3268] hover:bg-white px-4">Invite employer</button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Dashboard stats">
        {STATS.map(stat => (
          <article className={`rounded-xl border bg-white p-5 shadow-sm border-t-4 ${
            {blue: 'border-t-blue-500', green: 'border-t-green-500', yellow: 'border-t-[#F5C518]', red: 'border-t-red-500'}[stat.tone]
          }`} key={stat.label}>
            <span className="block text-sm text-gray-500">{stat.label}</span>
            <strong className="my-2 block text-3xl font-bold leading-none text-gray-900">{stat.value}</strong>
            <small className={`block text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change} this month</small>
          </article>
        ))}
      </section>

      {renderTabContent()}
    </DashboardLayout>
  );
}
