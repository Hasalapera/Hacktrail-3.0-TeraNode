import { useState, useEffect } from 'react';
import PortalLayout from '../layout/PortalLayout';
import api from '../api/axiosInstance';

const STUDENT_TABS = [
  { id: 'find-gigs', label: 'Find Gigs' },
  { id: 'my-tasks', label: 'My Tasks' },
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('find-gigs');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchOpenJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/jobs');
      setJobs(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch open jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'find-gigs') {
      fetchOpenJobs();
    }
  }, [activeTab]);

  const handleAcceptJob = async (jobId) => {
    setError('');
    setSuccessMessage('');
    try {
      await api.put(`/jobs/${jobId}/assign`);
      setSuccessMessage('Job accepted successfully! Moved to In Progress.');
      fetchOpenJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to accept job.');
    }
  };

  return (
    <PortalLayout roleTitle="Student Portal" tabs={STUDENT_TABS} activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">
          {activeTab === 'find-gigs' ? 'Explore Open Gigs' : 'My Tasks'}
        </h2>
        <p className="text-sm text-gray-500">
          {activeTab === 'find-gigs'
            ? 'Browse available local gigs posted by verified employers and accept tasks.'
            : 'Track the status of your assigned tasks and communicate with employers.'}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}

      {activeTab === 'find-gigs' && (
        <div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-sm font-semibold text-slate-500">Loading open gigs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-sm text-gray-500">No open gigs available right now. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <div key={job.id} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div>
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1A3268]">
                        {job.category}
                      </span>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                        {job.paymentType === 'TASK_BASED' ? 'Task Based' : 'Daily Wage'}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-gray-900">{job.title}</h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">{job.description}</p>

                    <div className="mb-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                      <span className="block font-semibold text-gray-800">Employer: {job.employer?.name || 'Verified Company'}</span>
                      <span className="text-slate-500">{job.employer?.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
                    <div>
                      <span className="block text-xs text-slate-400">Compensation</span>
                      <span className="text-base font-extrabold text-gray-900">Rs. {job.amount}</span>
                    </div>
                    <button
                      onClick={() => handleAcceptJob(job.id)}
                      className="rounded-lg bg-[#0D1F4C] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#1A3268]"
                    >
                      Accept Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'my-tasks' && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">My Assigned Tasks</h3>
          <p className="text-sm text-gray-500">Tasks you have accepted will appear here once assigned.</p>
        </div>
      )}
    </PortalLayout>
  );
}
