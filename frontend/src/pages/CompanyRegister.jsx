import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Components/Logo';
import api from '../api/axiosInstance';

const INDUSTRIES = [
  'Information Technology',
  'Finance & Banking',
  'Engineering',
  'Healthcare',
  'Education',
  'Marketing & Media',
  'Manufacturing',
  'Logistics & Supply Chain',
  'Retail & E-commerce',
  'Other',
];


export default function CompanyRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName:     '',
    industry:        '',
    hrContactName:   '',
    email:           '',
    contactNumber:   '',
    password:        '',
    confirmPassword: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);

  const handleChange = (e) => {
    setError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.companyName || !form.industry || !form.hrContactName ||
        !form.email || !form.contactNumber || !form.password || !form.confirmPassword) {
      return 'All fields are required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Please enter a valid corporate email address.';
    }
    if (form.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);

    try {
      await api.post('/auth/register/company', {
        companyName: form.companyName.trim(),
        industry: form.industry,
        hrContactName: form.hrContactName.trim(),
        email: form.email.trim(),
        contactNumber: form.contactNumber.trim(),
        password: form.password,
      });

      setSuccess(true);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Unable to register company right now.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary to-primary-mid">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-accent-soft">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-text-main mb-2">Company Registered!</h2>
          <p className="text-text-sub text-sm mb-6">
            Your company profile is under review. We'll notify you at <strong>{form.email}</strong>.
          </p>
          <button onClick={() => navigate('/login')}
                  className="w-full py-3 rounded-xl font-bold text-white cursor-pointer bg-gradient-to-br from-primary to-primary-mid">
            Go to Login

          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14 bg-gradient-to-br from-primary to-primary-mid">


      <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
           style={{ background: '#ffffff' }}>

        {/* ── Header ── */}

        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-primary to-primary-mid">
          <div className="flex items-center gap-3 mb-1">
            <Logo iconClassName="h-10 w-10" showWordmark={false} />
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Company Registration</h1>
              <p className="text-accent-soft text-xs">UniLift Corporate Portal</p>
            </div>
          </div>
          <p className="text-white/85 text-sm mt-4 leading-relaxed">

            Join UniLift to access Sri Lanka's largest pool of university talent. Post internships and projects instantly.
          </p>
        </div>

        {/* ── Progress indicator ── */}
        <div className="flex items-center px-8 py-3 bg-accent-soft border-b border-accent-border">
          <span className="text-xs font-semibold text-primary-mid">Step 1 of 1 — Company Details</span>
          <div className="ml-auto flex gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="w-2 h-2 rounded-full bg-border"></span>
            <span className="w-2 h-2 rounded-full bg-border"></span>

          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="flex divide-x" style={{ background: '#F8FAFB', borderBottom: '1px solid #E2E8F0', divideColor: '#E2E8F0' }}>
          {[['128K+', 'Students'], ['Top 500', 'Companies'], ['Free', 'to Start']].map(([num, label]) => (
            <div key={label} className="flex-1 py-3 text-center">
              <div className="text-sm font-bold" style={{ color: '#0B4D2E' }}>{num}</div>
              <div className="text-xs" style={{ color: '#94A3B8' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">

          {/* Company Name */}
          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Company Name <span className="text-red-400">*</span>
            </label>
            <input name="companyName" value={form.companyName} onChange={handleChange}
                   type="text" placeholder="e.g. ABC Technologies (Pvt) Ltd"
                   className="w-full px-4 py-3 rounded-xl border border-border text-sm
                              bg-surface text-text-main outline-none placeholder-text-muted
                              focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white" />

          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Industry Category <span className="text-red-400">*</span>
            </label>
            <select name="industry" value={form.industry} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm
                               bg-surface text-text-main outline-none
                               focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white cursor-pointer">

              <option value="">— Select Industry —</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* HR Contact Name & Phone — 2 col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-sub mb-1.5">
                HR Contact Name <span className="text-red-400">*</span>
              </label>
              <input name="hrContactName" value={form.hrContactName} onChange={handleChange}
                     type="text" placeholder="Full name"
                     className="w-full px-4 py-3 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-sub mb-1.5">
                Contact Number <span className="text-red-400">*</span>
              </label>
              <input name="contactNumber" value={form.contactNumber} onChange={handleChange}
                     type="tel" placeholder="07X XXXXXXX"
                     className="w-full px-4 py-3 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white" />

            </div>
          </div>

          {/* Corporate Email */}
          <div>

            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Official Corporate Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">✉️</span>
              <input name="email" value={form.email} onChange={handleChange}
                     type="email" placeholder="hr@yourcompany.com"
                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white" />
            </div>
          </div>

          {/* Password & Confirm — grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-sub mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input name="password" value={form.password} onChange={handleChange}
                       type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters"
                       className="w-full px-4 py-3 pr-10 rounded-xl border border-border text-sm
                                  bg-surface text-text-main outline-none placeholder-text-muted
                                  focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white" />
                <button type="button" onClick={() => setShowPass((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer">
                  {showPass ? '🙈' : '👁️'}

                </button>
              </div>
            </div>
            <div>

              <label className="block text-sm font-semibold text-text-sub mb-1.5">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                     type={showPass ? 'text' : 'password'} placeholder="Re-enter password"
                     className="w-full px-4 py-3 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-mid focus:ring-2 focus:ring-accent-border focus:bg-white" />

            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-text-muted leading-relaxed">
            By registering, you agree to UniLift's{' '}
            <a href="#" className="underline text-primary">Terms of Service</a> and{' '}
            <a href="#" className="underline text-primary">Privacy Policy</a>.

          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                 style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide
                             cursor-pointer disabled:opacity-60 active:scale-[0.98] mt-2
                             bg-gradient-to-br from-primary to-primary-mid
                             hover:from-primary hover:to-primary">
            {loading ? '⏳ Registering Company...' : '🏛️ Register Company'}
          </button>

          <p className="text-center text-sm text-text-sub">
            Already registered?{' '}
            <Link to="/login" className="font-semibold hover:underline text-primary">

              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
