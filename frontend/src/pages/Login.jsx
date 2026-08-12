import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ROLES = [
  { id: 'student',  label: 'Student',  hint: 'Enter your university credentials' },
  { id: 'company',  label: 'Company',  hint: 'Corporate HR or recruiter access' },
  { id: 'retailer', label: 'Retailer', hint: 'Local business owner access' },
];

const FEATURES = [
  ['Internships & Corporate Projects', 'Match with top companies by skill & degree'],
  ['Part-Time & Flexible Jobs',        'Find nearby gigs posted by local retailers'],
  ['Freelance Marketplace',            'Earn from design, dev, video editing & more'],
];

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    }
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole]       = useState('student');
  const [form, setForm]       = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const active = ROLES.find(r => r.id === role);

  const handleChange = e => {
    setError('');
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) { setError('Both fields are required.'); return; }
    setLoading(true); setError('');
    try {
      const res  = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message); return; }
      if      (data.action === 'REDIRECT_TO_CHANGE_PASSWORD')   navigate('/change-password');
      else if (data.action === 'REDIRECT_TO_COMPLETE_PROFILE')  navigate('/complete-profile');
      else navigate('/dashboard');
    } catch {
      setError('Unable to connect. Make sure the backend server is running.');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-stretch max-md:flex-col">

      {/* ── Left Brand Panel ─────────────────────────────── */}
      <div className="relative flex w-full flex-shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-primary-mid p-11 md:w-[420px] max-md:min-h-0 max-md:p-9">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent-dark/[0.06]" />

        <div className="relative">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-accent-dark text-lg font-extrabold text-primary">
              U
            </div>
            <span className="text-xl font-bold tracking-tight text-white">UniLift</span>
          </div>

          <h2 className="mb-4 text-[28px] font-extrabold leading-tight tracking-tight text-white">
            Your gateway to<br />real opportunities.
          </h2>
          <p className="mb-10 text-sm leading-relaxed text-white/55">
            Connecting Sri Lankan university students with companies, retailers, and freelance clients — all in one place.
          </p>

          <div className="flex flex-col gap-4">
            {FEATURES.map(([title, sub]) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                <div>
                  <div className="text-[13px] font-semibold text-white">{title}</div>
                  <div className="text-xs text-white/45">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative inline-flex items-center gap-2 self-start rounded-lg border border-white/10 bg-white/[0.07] px-3.5 py-2.5">
          <div className="flex">
            {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
              <div
                key={c}
                className={`h-6 w-6 rounded-full border-2 border-primary ${c} ${i > 0 ? '-ml-2' : ''}`}
              />
            ))}
          </div>
          <span className="text-xs text-white/70">
            Trusted by <strong className="text-white">128,000+</strong> students
          </span>
        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto bg-white p-12 max-md:p-9">
        <div className="w-full max-w-[400px]">

          <div className="mb-8">
            <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-text-main">
              Sign in
            </h1>
            <p className="text-sm text-text-sub">{active.hint}</p>
          </div>

          <div className="mb-7 flex rounded-[10px] border border-border bg-surface p-1">
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => { setRole(r.id); setError(''); setForm({ username: '', password: '' }); }}
                className={`flex-1 rounded-[7px] px-1 py-2 text-[13px] font-semibold transition-all ${
                  role === r.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold tracking-wide text-text-sub">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder={role === 'company' ? 'company_hr or email' : `${role}_username`}
                autoComplete="username"
                className="w-full rounded-[14px] border border-border bg-white px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-muted focus:border-primary-mid focus:ring-[3px] focus:ring-primary-mid/10"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[13px] font-semibold tracking-wide text-text-sub">Password</label>
                <a href="#" className="text-xs font-medium text-primary-mid hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-[14px] border border-border bg-white py-3 pl-4 pr-11 text-sm text-text-main outline-none transition placeholder:text-text-muted focus:border-primary-mid focus:ring-[3px] focus:ring-primary-mid/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center text-text-muted hover:text-text-main"
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-[10px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-600">
                <span>⚠</span>{error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-[14px] bg-primary py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-primary-mid hover:shadow-[0_4px_16px_rgba(11,77,46,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none disabled:active:scale-100"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              to="/register/company"
              className="block rounded-[14px] border-[1.5px] border-border px-3 py-3 text-center text-[13px] font-semibold text-primary transition hover:border-primary hover:bg-surface"
            >
              Register a Company
            </Link>
            <Link
              to="/register/retailer"
              className="block rounded-[14px] border-[1.5px] border-accent-border bg-accent-soft px-3 py-3 text-center text-[13px] font-semibold text-primary transition hover:brightness-[0.96]"
            >
              Register a Local Shop
            </Link>
          </div>

          <p className="mt-7 text-center text-xs text-text-muted">
            © 2025 UniLift · Empowering Sri Lankan Students
          </p>
        </div>
      </div>
    </div>
  );
}
