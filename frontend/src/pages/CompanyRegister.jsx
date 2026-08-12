import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const EyeIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    }
  </svg>
);

const inputBase = {
  border: '1.5px solid #E2E8F0',
  background: '#ffffff',
  color: '#0F172A',
  borderRadius: '12px',
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.2s',
};

function FormInput({ onFocus, onBlur, ...props }) {
  return (
    <input
      {...props}
      style={inputBase}
      onFocus={e => { e.target.style.borderColor = '#15803D'; e.target.style.boxShadow = '0 0 0 3px rgba(21,128,61,0.10)'; onFocus?.(e); }}
      onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; onBlur?.(e); }}
    />
  );
}

function FormSelect({ children, ...props }) {
  return (
    <select
      {...props}
      style={{ ...inputBase, cursor: 'pointer' }}
      onFocus={e => { e.target.style.borderColor = '#15803D'; e.target.style.boxShadow = '0 0 0 3px rgba(21,128,61,0.10)'; }}
      onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
    >
      {children}
    </select>
  );
}

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
    /* TODO: POST /auth/register/company when backend endpoint is ready */
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
           style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 50%, #15803D 100%)' }}>
        <div className="rounded-2xl shadow-2xl p-10 max-w-md w-full text-center"
             style={{ background: '#ffffff' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
               style={{ background: '#F0FDF4', border: '2px solid #BBF7D0' }}>
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>Company Registered!</h2>
          <p className="text-sm mb-1" style={{ color: '#475569' }}>
            Your company profile is under review.
          </p>
          <p className="text-sm mb-6" style={{ color: '#475569' }}>
            We'll notify you at <strong style={{ color: '#0B4D2E' }}>{form.email}</strong>.
          </p>
          <button onClick={() => navigate('/login')}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide cursor-pointer transition-all"
                  style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 100%)', boxShadow: '0 4px 16px rgba(11,77,46,0.30)' }}>
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14"
         style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 50%, #15803D 100%)' }}>

      {/* Background decorative orbs */}
      <div className="fixed -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'rgba(74,222,128,0.06)' }} />
      <div className="fixed -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
           style={{ background: 'rgba(34,197,94,0.05)' }} />

      <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
           style={{ background: '#ffffff' }}>

        {/* ── Header ── */}
        <div className="px-8 pt-8 pb-6 relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 100%)' }}>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
               style={{ background: 'rgba(74,222,128,0.10)' }} />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full"
               style={{ background: 'rgba(240,253,244,0.06)' }} />

          <div className="relative flex items-center gap-3 mb-1">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                 style={{ background: '#4ADE80' }}>
              <span className="text-lg font-black" style={{ color: '#0B4D2E' }}>U</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">Company Registration</h1>
              <p className="text-xs font-medium" style={{ color: 'rgba(187,247,208,0.70)' }}>UniLift Corporate Portal</p>
            </div>
          </div>
          <p className="relative text-sm mt-4 leading-relaxed" style={{ color: 'rgba(240,253,244,0.65)' }}>
            Join UniLift to access Sri Lanka's largest pool of university talent. Post internships and projects instantly.
          </p>
        </div>

        {/* ── Progress indicator ── */}
        <div className="flex items-center px-8 py-3"
             style={{ background: '#F0FDF4', borderBottom: '1px solid #BBF7D0' }}>
          <span className="text-xs font-semibold" style={{ color: '#166534' }}>Step 1 of 1 — Company Details</span>
          <div className="ml-auto flex gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: '#15803D' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#E2E8F0' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#E2E8F0' }} />
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
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              Company Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <FormInput name="companyName" value={form.companyName} onChange={handleChange}
                       type="text" placeholder="e.g. ABC Technologies (Pvt) Ltd" />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              Industry Category <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <FormSelect name="industry" value={form.industry} onChange={handleChange}>
              <option value="">— Select Industry —</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </FormSelect>
          </div>

          {/* HR Contact Name & Phone — 2 col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
                HR Contact Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <FormInput name="hrContactName" value={form.hrContactName} onChange={handleChange}
                         type="text" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
                Contact Number <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <FormInput name="contactNumber" value={form.contactNumber} onChange={handleChange}
                         type="tel" placeholder="07X XXXXXXX" />
            </div>
          </div>

          {/* Corporate Email */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              Official Corporate Email <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#94A3B8' }}>✉️</span>
              <FormInput name="email" value={form.email} onChange={handleChange}
                         type="email" placeholder="hr@yourcompany.com"
                         style={{ ...inputBase, paddingLeft: '40px' }} />
            </div>
          </div>

          {/* Password & Confirm — grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
                Password <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div className="relative">
                <FormInput name="password" value={form.password} onChange={handleChange}
                           type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters"
                           style={{ ...inputBase, paddingRight: '44px' }} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: '#94A3B8' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#475569'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
                Confirm Password <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <FormInput name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                         type={showPass ? 'text' : 'password'} placeholder="Re-enter password" />
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
            By registering, you agree to UniLift's{' '}
            <a href="#" className="underline font-medium" style={{ color: '#166534' }}>Terms of Service</a> and{' '}
            <a href="#" className="underline font-medium" style={{ color: '#166534' }}>Privacy Policy</a>.
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
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide cursor-pointer disabled:opacity-60 active:scale-[0.98] mt-2 transition-all duration-200"
                  style={{
                    background: loading ? '#94A3B8' : 'linear-gradient(135deg, #0B4D2E 0%, #166534 100%)',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(11,77,46,0.30)',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 6px 28px rgba(11,77,46,0.45)'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(11,77,46,0.30)'; }}>
            {loading ? '⏳ Registering Company...' : '🏛️ Register Company →'}
          </button>

          <p className="text-center text-sm" style={{ color: '#475569' }}>
            Already registered?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#166534' }}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
