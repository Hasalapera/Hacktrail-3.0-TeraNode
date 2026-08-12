import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── Role tab config ────────────────────────────────────── */
const ROLES = [
  { id: 'student',  label: '🎓 Student',  placeholder: 'e.g. student1' },
  { id: 'company',  label: '🏛️ Company',  placeholder: 'e.g. hr@company.com' },
  { id: 'retailer', label: '🏪 Retailer', placeholder: 'e.g. shop_owner1' },
];

export default function Login() {
  const navigate   = useNavigate();
  const [role, setRole]         = useState('student');
  const [form, setForm]         = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const activeRole = ROLES.find((r) => r.id === role);

  const handleChange = (e) => {
    setError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res  = await fetch('http://localhost:5000/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username: form.username, password: form.password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      /* Frontend navigation based on server's action flag */
      if (data.action === 'REDIRECT_TO_CHANGE_PASSWORD')  navigate('/change-password');
      else if (data.action === 'REDIRECT_TO_COMPLETE_PROFILE') navigate('/complete-profile');
      else navigate('/dashboard');

    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
         style={{ background: 'linear-gradient(135deg, #0f2557 0%, #1a3a7c 50%, #0f2557 100%)' }}>

      {/* ── Card ── */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-8 pt-8 pb-6 text-center"
             style={{ background: 'linear-gradient(135deg, #0f2557, #1a3a7c)' }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
               style={{ background: '#f5c518' }}>
            <span className="text-2xl font-black" style={{ color: '#0f2557' }}>U</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">UniLift</h1>
          <p className="text-blue-200 text-sm mt-1">Your gateway to opportunities</p>
        </div>

        {/* ── Role Tabs ── */}
        <div className="flex border-b border-gray-100 bg-gray-50">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => { setRole(r.id); setError(''); setForm({ username: '', password: '' }); }}
              className="flex-1 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={
                role === r.id
                  ? { color: '#0f2557', borderBottom: '3px solid #0f2557', background: '#fff' }
                  : { color: '#94a3b8', borderBottom: '3px solid transparent' }
              }
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">
              Username / Email
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder={activeRole.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-800 text-sm
                         outline-none placeholder-slate-400 bg-slate-50
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-slate-800 text-sm
                           outline-none placeholder-slate-400 bg-slate-50
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            <div className="flex justify-end mt-1.5">
              <a href="#" className="text-xs font-medium hover:underline"
                 style={{ color: '#0f2557' }}>
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600
                            text-sm px-4 py-3 rounded-xl">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide
                       cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
                       active:scale-[0.98]"
            style={{ background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0f2557, #1a3a7c)' }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, #091840, #0f2557)'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'linear-gradient(135deg, #0f2557, #1a3a7c)'; }}
          >
            {loading ? '⏳ Signing in...' : `Sign In as ${activeRole.label}`}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-slate-400">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Register Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-500">
              Are you a business?{' '}
              <Link to="/register/company"
                    className="font-semibold hover:underline" style={{ color: '#0f2557' }}>
                Register your Company
              </Link>
            </p>
            <p className="text-sm text-slate-500">
              Local shop owner?{' '}
              <Link to="/register/retailer"
                    className="font-semibold hover:underline" style={{ color: '#d4a800' }}>
                Register your Shop →
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 pb-6 text-center">
          <p className="text-xs text-slate-400">
            © 2025 UniLift · Empowering Sri Lankan Students
          </p>
        </div>
      </div>
    </div>
  );
}
