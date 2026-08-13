import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import api from '../api/axiosInstance';

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
  const [employerAccounts, setEmployerAccounts] = useState([]);
  const [employersLoading, setEmployersLoading] = useState(false);
  const [employersError, setEmployersError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState('');

  const loadEmployerApprovals = async () => {
    try {
      setEmployersLoading(true);
      setEmployersError('');
      const res = await api.get('/admin/employers');
      setEmployerAccounts(res.data?.data || []);
    } catch (error) {
      setEmployersError(error.response?.data?.message || 'Failed to load employer approvals.');
    } finally {
      setEmployersLoading(false);
    }
  };

  const updateEmployerApproval = async (id, action) => {
    try {
      setActionLoadingId(id);
      await api.put(`/admin/employers/${id}/${action}`);
      await loadEmployerApprovals();
    } catch (error) {
      setEmployersError(error.response?.data?.message || `Failed to ${action} employer account.`);
    } finally {
      setActionLoadingId('');
    }
  };

  const [pendingGigs, setPendingGigs] = useState([]);
  const [gigsLoading, setGigsLoading] = useState(false);
  const [gigsError, setGigsError] = useState('');

  const fetchPendingGigs = async () => {
    setGigsLoading(true);
    setGigsError('');
    try {
      const res = await api.get('/admin/gigs/pending');
      if (res.data && res.data.success) {
        setPendingGigs(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setGigsError('Failed to load pending gigs.');
    } finally {
      setGigsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'gigs') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchPendingGigs();
    }
  }, [activeTab]);

  const handleGigApproval = async (gigId, status) => {
    try {
      await api.put(`/admin/gigs/${gigId}/status`, { status });
      fetchPendingGigs();
    } catch (err) {
      console.error(err);
      alert('Failed to update gig status.');
    }
  };

  // location state එක වෙනස් වෙනකොට active tab එක update කරන්න
  useEffect(() => {
    if (location.state?.initialTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(location.state.initialTab);
    }
  }, [location.state]);

  useEffect(() => {
    if (activeTab === 'employers') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadEmployerApprovals();
    }
  }, [activeTab]);

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
      const pendingCount = employerAccounts.filter((item) => item.approvalStatus === 'PENDING').length;
      const approvedCompanies = employerAccounts.filter((item) => item.employerType === 'COMPANY' && item.approvalStatus === 'APPROVED').length;
      const approvedRetailers = employerAccounts.filter((item) => item.employerType === 'RETAILER' && item.approvalStatus === 'APPROVED').length;

      return (
        <section className="animate-[fade-in-up_0.35s_ease-in-out] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Employer Accounts</h2>
              <p className="text-sm text-gray-500">Approve company and retailer profiles before they publish jobs.</p>
            </div>
            <button
              type="button"
              onClick={loadEmployerApprovals}
              className="w-full flex-shrink-0 rounded-lg bg-[#F5C518] px-4 py-2 text-xs font-bold text-[#0D1F4C] transition-all hover:brightness-95 sm:w-auto"
            >
              Refresh
            </button>
          </div>

          {employersError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {employersError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#1A3268]">Companies</span>
              <strong className="my-1 block text-2xl font-bold text-gray-900">{approvedCompanies} approved</strong>
              <p className="text-sm text-gray-500">Pending queue: {pendingCount} accounts.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#1A3268]">Retailers</span>
              <strong className="my-1 block text-2xl font-bold text-gray-900">{approvedRetailers} approved</strong>
              <p className="text-sm text-gray-500">Approve/reject requests from this panel.</p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
            {employersLoading ? (
              <div className="bg-white px-4 py-6 text-sm text-gray-500">Loading employer approval queue...</div>
            ) : employerAccounts.length === 0 ? (
              <div className="bg-white px-4 py-6 text-sm text-gray-500">No employer accounts found.</div>
            ) : (
              employerAccounts.map((account) => {
                const isPending = account.approvalStatus === 'PENDING';
                const displayName = account.employerType === 'RETAILER'
                  ? (account.shopName || account.name)
                  : (account.companyName || account.name);
                const typeText = account.employerType === 'RETAILER' ? 'Retailer' : 'Company';

                return (
                  <div key={account.id} className="grid grid-cols-1 gap-3 border-b border-slate-200 bg-white p-4 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <strong className="block text-sm font-semibold text-gray-900">{displayName}</strong>
                      <span className="mt-0.5 block text-xs text-gray-500">{typeText} · {account.email}</span>
                      <span className="mt-0.5 block text-xs text-gray-500">{account.phoneNumber || 'No phone number'}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill>{account.approvalStatus}</StatusPill>
                      <button
                        type="button"
                        disabled={!isPending || actionLoadingId === account.id}
                        onClick={() => updateEmployerApproval(account.id, 'approve')}
                        className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {actionLoadingId === account.id ? 'Updating...' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        disabled={!isPending || actionLoadingId === account.id}
                        onClick={() => updateEmployerApproval(account.id, 'reject')}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })
            )}
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

    if (activeTab === 'gigs') {
      return (
        <section className="animate-[fade-in-up_0.35s_ease-in-out] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-lg font-extrabold text-gray-900">Student Gigs</h2>
              <p className="text-sm text-gray-500">Approve or reject student gigs before they are published.</p>
            </div>
          </div>
          {gigsError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {gigsError}
            </div>
          )}
          {gigsLoading ? (
            <div className="flex justify-center items-center py-8">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : pendingGigs.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500 border border-dashed border-slate-200 rounded-lg">No pending gigs to review.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Gig Title</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {pendingGigs.map(gig => (
                    <tr key={gig.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <strong className="block text-sm font-semibold text-gray-900">{gig.student?.name || 'Unknown Student'}</strong>
                        <span className="block text-xs text-gray-500">{gig.student?.university_id || gig.student?.email}</span>
                      </td>
                      <td className="px-4 py-4 text-gray-700 max-w-xs truncate" title={gig.title}>
                        {gig.title}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {gig.category} {gig.subcategory && <span className="text-xs text-gray-400">({gig.subcategory})</span>}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-gray-900">
                        Rs. {Number(gig.price).toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleGigApproval(gig.id, 'APPROVED')}
                            className="rounded bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700 transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleGigApproval(gig.id, 'REJECTED')}
                            className="rounded bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
