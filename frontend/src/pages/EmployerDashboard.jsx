import { useState, useEffect } from 'react';
import PortalLayout from '../layout/PortalLayout';
import api from '../api/axiosInstance';

const EMPLOYER_TABS = [
  { id: 'post-job', label: 'Post Job' },
  { id: 'my-gigs', label: 'My Gigs' },
];

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('post-job');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    paymentType: 'TASK_BASED',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // My Gigs state
  const [gigs, setGigs] = useState([]);
  const [gigsLoading, setGigsLoading] = useState(false);
  const [gigsError, setGigsError] = useState('');
  const [gigsSuccess, setGigsSuccess] = useState('');

  // Chat Modal state (Phase 4 integration)
  const [activeJobForChat, setActiveJobForChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const fetchEmployerGigs = async () => {
    setGigsLoading(true);
    setGigsError('');
    setGigsSuccess('');
    try {
      const res = await api.get('/jobs/my-gigs'); // Updated to new endpoint
      setGigs(res.data.data || []);
    } catch (err) {
      setGigsError('Failed to fetch your gigs.');
      console.error('Failed to fetch gigs:', err);
    } finally {
      setGigsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'my-gigs') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchEmployerGigs();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.amount) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/jobs', {
        ...formData,
        amount: Number(formData.amount),
      });
      setSuccess('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        paymentType: 'TASK_BASED',
        amount: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteJob = async (jobId) => {
    setGigsLoading(true);
    setGigsError('');
    setGigsSuccess('');
    try {
      await api.put(`/jobs/${jobId}/complete`);
      setGigsSuccess('Job marked as completed!');
      await fetchEmployerGigs(); // Refreshes the list
    } catch (err) {
      setGigsError(err.response?.data?.message || 'Failed to complete job.');
    } finally {
      setGigsLoading(false);
      setTimeout(() => {
        setGigsError('');
        setGigsSuccess('');
      }, 5000);
    }
  };

  // Chat functions (Phase 4)
  const openChat = async (job) => {
    setActiveJobForChat(job);
    setChatLoading(true);
    try {
      const res = await api.get(`/messages/${job.id}`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeJobForChat) return;

    // Receiver ID will be the freelancer if sender is employer, or employer if sender is student
    const receiverId = activeJobForChat.studentId || activeJobForChat.employerId;

    try {
      const res = await api.post('/api/messages', {
        jobId: activeJobForChat.id,
        receiverId,
        content: newMessage,
      });
      setMessages(prev => [...prev, res.data.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <PortalLayout roleTitle="Employer Portal" tabs={EMPLOYER_TABS} activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-4xl mx-auto py-4">
        {activeTab === 'post-job' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 animate-fade-in-up">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Post a New Gig</h2>
              <p className="text-sm text-slate-500">Create a task or daily wage gig for verified university students.</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-700">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., React Landing Page Development"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Web Development"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Payment Type</label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  >
                    <option value="TASK_BASED">Task Based</option>
                    <option value="DAILY_WAGE">Daily Wage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Amount (Rs.)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g., 25000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the task requirements, deliverables, and timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? 'Posting Gig...' : 'Post Job'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'my-gigs' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">My Posted Gigs</h2>
                <p className="text-sm text-slate-500">Manage your posted jobs and negotiate with students.</p>
              </div>
            </div>

            {gigsError && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">
                {gigsError}
              </div>
            )}

            {gigsSuccess && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-700">
                {gigsSuccess}
              </div>
            )}

            {gigsLoading ? (
              <p className="text-sm text-slate-500 text-center py-8">Loading your gigs...</p>
            ) : gigs.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-sm text-slate-500">No gigs posted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {gigs.map(job => (
                  <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          job.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                          job.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>{job.status.replace('_', ' ')}</span>
                        <span className="text-xs text-slate-400">• {job.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-500">Rs. {job.amount} ({job.paymentType === 'TASK_BASED' ? 'Task Based' : 'Daily Wage'})</p>
                      {job.freelancer && (
                        <p className="text-sm text-slate-600 mt-2 font-semibold">
                          Assigned to: {job.freelancer.name} ({job.freelancer.university_id})
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      {job.status === 'IN_PROGRESS' && (
                        <button onClick={() => handleCompleteJob(job.id)} disabled={gigsLoading} className="rounded-lg bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700 transition-colors disabled:bg-slate-400">
                          Mark as Completed
                        </button>
                      )}
                      {job.freelancer && (
                        <button onClick={() => openChat(job)} className="rounded-lg bg-[#0D1F4C] px-4 py-2 text-xs font-bold text-white hover:bg-[#1A3268] transition-colors">
                          Messages
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Modal (Phase 4) */}
      {activeJobForChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 flex flex-col h-[500px] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900">{activeJobForChat.title}</h3>
                <span className="text-xs text-slate-500">Negotiation Chat</span>
              </div>
              <button
                onClick={() => setActiveJobForChat(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {chatLoading ? (
                <p className="text-center text-sm text-slate-400 py-8">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-8">No messages yet. Start the conversation!</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="flex flex-col">
                    <div className="max-w-[80%] rounded-xl p-3 bg-white border border-slate-200 text-sm shadow-sm">
                      <span className="block text-xs font-bold text-[#1A3268] mb-1">{msg.sender?.name || 'User'}</span>
                      <p className="text-slate-800">{msg.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#0D1F4C] px-4 py-2 text-xs font-bold text-white hover:bg-[#1A3268]"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
