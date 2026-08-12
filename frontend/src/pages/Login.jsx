import { useState } from 'react';

import Logo from '../Components/Logo';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from './context/authContext';

const ROLES = [
  {
    id: 'student',
    label: 'Student',
    hint: 'Sign in with your university index number',
  },
  {
    id: 'company',
    label: 'Company',
    hint: 'Corporate HR or recruiter access',
  },
  {
    id: 'retailer',
    label: 'Retailer',
    hint: 'Local business owner access',
  },
];

const FEATURES = [
  { title: 'Internships & Corporate Projects', sub: 'Match with top companies by skill & degree', icon: '🎓' },
  { title: 'Part-Time & Flexible Jobs', sub: 'Find nearby gigs posted by local retailers', icon: '🏪' },
  { title: 'Freelance Marketplace', sub: 'Earn from design, dev, video editing & more', icon: '💼' },
];

const EyeIcon = ({ open }) => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

/* -------------------------------------------------------------------------- */
/* Brand Panel                                                               */
/* -------------------------------------------------------------------------- */

const BrandPanel = () => (
  <aside className="relative hidden min-h-screen w-[440px] shrink-0 overflow-hidden bg-gradient-to-br from-[#071633] via-[#0D1F4C] to-[#19376F] text-white lg:flex lg:flex-col lg:justify-between">
    {/* Decorative shapes */}
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10 bg-white/[0.03]" />
    <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full border border-[#F5C518]/10 bg-[#F5C518]/[0.04]" />

    <div className="pointer-events-none absolute right-20 top-1/3 h-32 w-32 rounded-full bg-[#F5C518]/5 blur-3xl" />
    <div className="pointer-events-none absolute bottom-1/4 left-10 h-24 w-24 rounded-full bg-blue-400/10 blur-3xl" />

    {/* Top content */}
    <div className="relative z-10 px-12 pt-12">
      {/* Logo */}
      <div className="mb-20 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5C518] text-xl font-black text-[#0D1F4C] shadow-lg shadow-black/10">
          U
        </div>

        <div>
          <div className="text-xl font-extrabold tracking-tight">UniLift</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
            Opportunities
          </div>
        </div>
      </div>

      {/* Main heading */}
      <div className="max-w-[330px]">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5C518]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
            Built for Sri Lankan students
          </span>
        </div>

        <h2 className="text-[38px] font-extrabold leading-[1.08] tracking-[-0.04em] text-white">
          Your gateway to
          <span className="block text-[#F5C518]">
            real opportunities.
          </span>
        </h2>

        <p className="mt-5 max-w-[320px] text-sm leading-7 text-white/55">
          Connecting university students with companies, retailers, and
          freelance clients — all in one place.
        </p>
      </div>

      {/* Features */}
      <div className="mt-12 space-y-5">
        {[
          [
            '01',
            'Internships & Corporate Projects',
            'Match with top companies by skill & degree',
          ],
          [
            '02',
            'Part-Time & Flexible Jobs',
            'Find nearby opportunities posted by local retailers',
          ],
          [
            '03',
            'Freelance Marketplace',
            'Earn from design, development, video editing & more',
          ],
        ].map(([number, title, sub]) => (
          <div key={number} className="group flex items-start gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold text-[#F5C518] transition-all duration-200 group-hover:border-[#F5C518]/30 group-hover:bg-[#F5C518]/10">
              {number}
            </div>

            <div className="pt-0.5">
              <div className="text-xs font-bold text-white/90">
                {title}
              </div>

              <div className="mt-1 text-[11px] leading-5 text-white/40">
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom trust section */}
    <div className="relative z-10 px-12 pb-10">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 backdrop-blur-sm">
        <div className="flex -space-x-2">
          {[
            'bg-blue-500',
            'bg-emerald-500',
            'bg-amber-500',
            'bg-purple-500',
          ].map((color, index) => (
            <div
              key={index}
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#102552] ${color} text-[9px] font-bold text-white`}
            >
              {['S', 'C', 'R', 'U'][index]}
            </div>
          ))}
        </div>

        <div className="text-right">
          <div className="text-[10px] font-medium text-white/40">
            Trusted by
          </div>

          <div className="text-xs font-bold text-white">
            128,000+ students
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-[10px] text-white/25">
        Empowering the next generation of professionals
      </p>
    </div>
  </aside>
);

/* -------------------------------------------------------------------------- */
/* Input styles                                                               */
/* -------------------------------------------------------------------------- */

const inputClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10';

/* -------------------------------------------------------------------------- */
/* Login Component                                                            */
/* -------------------------------------------------------------------------- */

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Register eken redirect karama awa success message eka
  const successMessage = location.state?.message || '';

  const [role, setRole] = useState('student');
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Student first login - password change form state
  const [changePw, setChangePw] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPw, setChangingPw] = useState(false);
  const [changePwError, setChangePwError] = useState('');

  const active = ROLES.find((r) => r.id === role);

  const handleChange = (e) => {
    setError('');

    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = { password: form.password };
    if (role === 'student') {
      payload.university_id = form.username;
    } else {
      // Admin, Company, and Retailer use email
      payload.email = form.username;
    }

    try {
      const res = await api.post('/auth/login', payload);

      // SCENARIO B: Student first login - auto-generated password eka change karanna one
      if (res.data.requirePasswordChange) {
        setChangePw({
          university_id: res.data.university_id,
          oldPassword: form.password,
        });

        return;
      }

      // SCENARIO A: Standard login - token eka save karala dashboard ekata yanna
      login(res.data.token, res.data.user);
      
      // Role-based redirect: STUDENT kenek nam student home ekata, anith ayata dashboard ekata
      if (res.data.user.role === 'STUDENT') {
        navigate('/student-home');
      } else if (res.data.user.role === 'ADMIN' || res.data.user.role === 'EMPLOYER') {
        if (res.data.user.role === 'EMPLOYER') {
          navigate('/employer/dashboard'); // Redirect employers to their specific dashboard
        } else navigate('/dashboard'); // Admins go to the admin dashboard
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to connect. Make sure the backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };


  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setChangePwError('Both fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      setChangePwError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePwError('Passwords do not match.');
      return;
    }

    setChangingPw(true);
    setChangePwError('');

    try {
      const res = await api.post('/auth/change-first-password', {
        university_id: changePw.university_id,
        oldPassword: changePw.oldPassword,
        newPassword,
      });

      // Password eka change karala token eka labuna - login karala dashboard ekata yanna
      login(res.data.token, res.data.user);
      // Me flow eka student lata witharak nisa, student home ekata redirect karanna
      navigate('/student-home');
    } catch (err) {
      setChangePwError(
        err.response?.data?.message ||
        'Failed to change password. Please try again.'
      );
    } finally {
      setChangingPw(false);
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Change Password View                                                     */
  /* ------------------------------------------------------------------------ */

      {/* ── Left Brand Panel ─────────────────────────────── */}
      <div className="relative flex w-full flex-shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-primary-mid p-11 md:w-[420px] max-md:min-h-0 max-md:p-9">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent-dark/[0.06]" />

        <div className="relative">
          <div className="mb-12">
            <Logo iconClassName="h-11 w-11" textClassName="text-xl" variant="light" />
          </div>

            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D1F4C]/5 text-[#0D1F4C]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>

              <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900">
                Set a new password
              </h1>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Welcome! You are logging in with an auto-generated password
                for the first time.
              </p>
            </div>

          <div className="flex flex-col gap-4">
            {FEATURES.map(([title, sub]) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    University Index Number
                  </label>

                  <input
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-medium text-slate-500 outline-none"
                    type="text"
                    value={changePw.university_id}
                    disabled
                  />
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
        </main>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Standard Login View                                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <BrandPanel />

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

                {role === r.id && (
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#F5C518]" />
                )}
              </button>
            ))}
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm text-emerald-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold">
                ✓
              </span>

              <span className="leading-5">{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
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

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[13px] font-semibold tracking-wide text-text-sub">Password</label>
                <a href="#" className="text-xs font-medium text-primary-mid hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="10"
                      rx="2"
                    />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>

                <input
                  id="password"
                  className={`${inputClassName} pl-11 pr-12`}
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

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
                  !
                </span>

                <span className="leading-5">{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A3268] to-[#0D1F4C] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0D1F4C]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0D1F4C]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-[14px] bg-primary py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-primary-mid hover:shadow-[0_4px_16px_rgba(11,77,46,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-text-muted">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Register options */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/register/company"
              className="block rounded-[14px] border-[1.5px] border-border px-3 py-3 text-center text-[13px] font-semibold text-primary transition hover:border-primary hover:bg-surface"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0D1F4C]/5 text-lg transition-transform duration-200 group-hover:scale-105">
                🏢
              </span>

              <span>
                <span className="block text-xs font-bold text-slate-800">
                  Register Company
                </span>

                <span className="mt-0.5 block text-[10px] text-slate-400">
                  For employers
                </span>
              </span>
            </Link>

            <Link
              to="/register/retailer"
              className="block rounded-[14px] border-[1.5px] border-accent-border bg-accent-soft px-3 py-3 text-center text-[13px] font-semibold text-primary transition hover:brightness-[0.96]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-lg transition-transform duration-200 group-hover:scale-105">
                🏪
              </span>

              <span>
                <span className="block text-xs font-bold text-amber-900">
                  Register Local Shop
                </span>

                <span className="mt-0.5 block text-[10px] text-amber-700/60">
                  For retailers
                </span>
              </span>
            </Link>
          </div>

          <p className="mt-7 text-center text-xs text-text-muted">
            © 2025 UniLift · Empowering Sri Lankan Students
          </p>
        </div>
      </main>
    </div>
  );
}