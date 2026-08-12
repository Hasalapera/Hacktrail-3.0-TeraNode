import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ROLES = [
  { id: 'student',  label: 'Student',  hint: 'Enter your university credentials' },
  { id: 'company',  label: 'Company',  hint: 'Corporate HR or recruiter access' },
  { id: 'retailer', label: 'Retailer', hint: 'Local business owner access' },
];

const FEATURES = [
  { title: 'Internships & Corporate Projects', sub: 'Match with top companies by skill & degree', icon: '🎓' },
  { title: 'Part-Time & Flexible Jobs',        sub: 'Find nearby gigs posted by local retailers', icon: '🏪' },
  { title: 'Freelance Marketplace',            sub: 'Earn from design, dev, video editing & more', icon: '💼' },
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
  const [role, setRole]         = useState('student');
  const [form, setForm]         = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

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
      if      (data.action === 'REDIRECT_TO_CHANGE_PASSWORD')  navigate('/change-password');
      else if (data.action === 'REDIRECT_TO_COMPLETE_PROFILE') navigate('/complete-profile');
      else navigate('/dashboard');
    } catch {
      setError('Unable to connect. Make sure the backend server is running.');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-stretch max-md:flex-col">

      {/* ── Left Brand Panel ─────────────────────────────── */}
      <div className="relative flex w-full flex-shrink-0 flex-col justify-between overflow-hidden p-11 md:w-[440px] max-md:min-h-0 max-md:p-9"
           style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 50%, #15803D 100%)' }}>

        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
             style={{ background: 'rgba(74,222,128,0.08)' }} />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full"
             style={{ background: 'rgba(34,197,94,0.06)' }} />
        <div className="pointer-events-none absolute top-1/2 right-8 h-32 w-32 rounded-full"
             style={{ background: 'rgba(240,253,244,0.04)' }} />

        <div className="relative">
          {/* Logo */}
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold shadow-lg"
                 style={{ background: '#4ADE80', color: '#0B4D2E' }}>
              U
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">UniLift</span>
              <p className="text-[11px] font-medium" style={{ color: 'rgba(187,247,208,0.7)' }}>Student Opportunity Platform</p>
            </div>
          </div>

          <h2 className="mb-4 text-[30px] font-extrabold leading-tight tracking-tight text-white">
            Your gateway to<br />real opportunities.
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: 'rgba(240,253,244,0.6)' }}>
            Connecting Sri Lankan university students with companies, retailers, and freelance clients — all in one place.
          </p>

          <div className="flex flex-col gap-5">
            {FEATURES.map(({ title, sub, icon }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base"
                     style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.25)' }}>
                  {icon}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{title}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(240,253,244,0.5)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof badge */}
        <div className="relative inline-flex items-center gap-2.5 self-start rounded-xl px-4 py-3 mt-10"
             style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
          <div className="flex">
            {['#4ADE80', '#22C55E', '#86EFAC'].map((c, i) => (
              <div key={c} className={`h-7 w-7 rounded-full border-2 ${i > 0 ? '-ml-2' : ''}`}
                   style={{ background: c, borderColor: '#0B4D2E' }} />
            ))}
          </div>
          <span className="text-xs" style={{ color: 'rgba(240,253,244,0.75)' }}>
            Trusted by <strong className="text-white">128,000+</strong> students
          </span>
        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto p-12 max-md:p-8"
           style={{ background: '#F8FAFB' }}>
        <div className="w-full max-w-[400px]">

          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                 style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22C55E' }} />
              Welcome back
            </div>
            <h1 className="mb-1 text-2xl font-extrabold tracking-tight" style={{ color: '#0F172A' }}>
              Sign in to UniLift
            </h1>
            <p className="text-sm" style={{ color: '#475569' }}>{active.hint}</p>
          </div>

          {/* Role Switcher */}
          <div className="mb-7 flex rounded-xl p-1" style={{ background: '#E2E8F0' }}>
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => { setRole(r.id); setError(''); setForm({ username: '', password: '' }); }}
                className="flex-1 rounded-[10px] px-1 py-2 text-[13px] font-semibold transition-all duration-200"
                style={role === r.id
                  ? { background: '#ffffff', color: '#0B4D2E', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }
                  : { color: '#94A3B8' }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
            {/* Username */}
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold tracking-wide" style={{ color: '#475569' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder={role === 'company' ? 'company_hr or email' : `${role}_username`}
                autoComplete="username"
                className="w-full rounded-[14px] px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                  border: '1.5px solid #E2E8F0',
                  background: '#ffffff',
                  color: '#0F172A',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#15803D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(21,128,61,0.10)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[13px] font-semibold tracking-wide" style={{ color: '#475569' }}>Password</label>
                <a href="#" className="text-xs font-medium transition-colors hover:underline" style={{ color: '#166534' }}>
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
                  className="w-full rounded-[14px] py-3 pl-4 pr-11 text-sm outline-none transition-all duration-200"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    background: '#ffffff',
                    color: '#0F172A',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = '#15803D';
                    e.target.style.boxShadow = '0 0 0 3px rgba(21,128,61,0.10)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center transition-colors"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#475569'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-[10px] px-3.5 py-2.5 text-[13px]"
                   style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}>
                <span>⚠</span>{error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-[14px] py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55"
              style={{
                background: loading ? '#94A3B8' : 'linear-gradient(135deg, #0B4D2E 0%, #166534 100%)',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(11,77,46,0.30)',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 6px 24px rgba(11,77,46,0.40)'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 16px rgba(11,77,46,0.30)'; }}
            >
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-xs" style={{ color: '#94A3B8' }}>
            <span className="h-px flex-1" style={{ background: '#E2E8F0' }} />
            New to UniLift?
            <span className="h-px flex-1" style={{ background: '#E2E8F0' }} />
          </div>

          {/* Registration CTAs */}
          <div className="flex flex-col gap-2.5">
            <Link
              to="/register/company"
              className="block rounded-[14px] px-3 py-3 text-center text-[13px] font-semibold transition-all duration-200"
              style={{ border: '1.5px solid #BBF7D0', background: '#F0FDF4', color: '#166534' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#DCFCE7'; e.currentTarget.style.borderColor = '#86EFAC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F0FDF4'; e.currentTarget.style.borderColor = '#BBF7D0'; }}
            >
              🏛️ Register a Company
            </Link>
            <Link
              to="/register/retailer"
              className="block rounded-[14px] px-3 py-3 text-center text-[13px] font-semibold transition-all duration-200"
              style={{ border: '1.5px solid #4ADE80', background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)', color: '#0B4D2E' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.90'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              🏪 Register a Local Shop
            </Link>
          </div>

          <p className="mt-7 text-center text-xs" style={{ color: '#94A3B8' }}>
            © 2025 UniLift · Empowering Sri Lankan Students
          </p>
        </div>
      </div>
    </div>
  );
}
