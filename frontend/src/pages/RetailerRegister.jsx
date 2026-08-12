import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SRI_LANKA_CITIES = [
  'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura',
  'Badulla', 'Ratnapura', 'Trincomalee', 'Batticaloa', 'Matara',
  'Kurunegala', 'Nuwara Eliya', 'Polonnaruwa', 'Kalmunai', 'Vavuniya',
  'Dambulla', 'Wennappuwa', 'Chilaw', 'Puttalam', 'Other',
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

function FormInput(props) {
  return (
    <input
      {...props}
      style={{ ...inputBase, ...props.style }}
      onFocus={e => { e.target.style.borderColor = '#15803D'; e.target.style.boxShadow = '0 0 0 3px rgba(21,128,61,0.10)'; props.onFocus?.(e); }}
      onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; props.onBlur?.(e); }}
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

export default function RetailerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName:        '',
    city:            '',
    ownerName:       '',
    mobile:          '',
    password:        '',
    confirmPassword: '',
    agreeToSms:      false,
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);

  const handleChange = (e) => {
    setError('');
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.shopName || !form.city || !form.ownerName || !form.mobile || !form.password) {
      return 'All fields are required.';
    }
    if (!/^0[0-9]{9}$/.test(form.mobile)) {
      return 'Enter a valid Sri Lankan mobile number (e.g. 0771234567).';
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
    /* TODO: POST /auth/register/retailer when backend endpoint is ready */
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
            <span className="text-4xl">🛍️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>Shop Registered!</h2>
          <p className="text-sm mb-1" style={{ color: '#475569' }}>
            Welcome, <strong style={{ color: '#0B4D2E' }}>{form.ownerName}</strong>!
          </p>
          <p className="text-sm mb-6" style={{ color: '#475569' }}>
            <strong style={{ color: '#0B4D2E' }}>{form.shopName}</strong> in <strong style={{ color: '#0B4D2E' }}>{form.city}</strong> is now on UniLift.
            Start posting part-time jobs today!
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

      <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
           style={{ background: '#ffffff' }}>

        {/* ── Header — Green accent for retailer ── */}
        <div className="px-8 pt-7 pb-6 relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)' }}>

          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full"
               style={{ background: 'rgba(11,77,46,0.15)' }} />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full"
               style={{ background: 'rgba(11,77,46,0.10)' }} />

          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                 style={{ background: '#0B4D2E' }}>
              <span className="text-xl">🏪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight" style={{ color: '#0B4D2E' }}>
                Shop Registration
              </h1>
              <p className="text-xs font-medium" style={{ color: 'rgba(11,77,46,0.65)' }}>
                UniLift Retailer Portal
              </p>
            </div>
          </div>

          {/* Tagline pill */}
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
               style={{ background: '#0B4D2E', color: '#4ADE80' }}>
            <span>⚡</span>
            Post part-time jobs and find local students instantly!
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="flex" style={{ background: '#F0FDF4', borderBottom: '1px solid #BBF7D0' }}>
          {[['128K+', 'Students'], ['75%', 'SME Focus'], ['Free', 'to Post']].map(([num, label]) => (
            <div key={label} className="flex-1 py-3 text-center" style={{ borderRight: '1px solid #BBF7D0' }}>
              <div className="text-sm font-bold" style={{ color: '#0B4D2E' }}>{num}</div>
              <div className="text-xs" style={{ color: '#94A3B8' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">

          {/* Shop Name */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              Shop / Business Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <FormInput name="shopName" value={form.shopName} onChange={handleChange}
                       type="text" placeholder="e.g. Perera Grocery Store" />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              City / Location <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <FormSelect name="city" value={form.city} onChange={handleChange}>
              <option value="">— Select your city —</option>
              {SRI_LANKA_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </FormSelect>
          </div>

          {/* Owner Name & Mobile — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
                Owner Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <FormInput name="ownerName" value={form.ownerName} onChange={handleChange}
                         type="text" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
                Mobile Number <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <FormInput name="mobile" value={form.mobile} onChange={handleChange}
                         type="tel" placeholder="07X XXXXXXX" maxLength={10} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              Password <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div className="relative">
              <FormInput name="password" value={form.password} onChange={handleChange}
                         type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters"
                         style={{ paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPass((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: '#94A3B8' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#475569'}
                      onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}>
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: '#475569' }}>
              Confirm Password <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <FormInput name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                       type={showPass ? 'text' : 'password'} placeholder="Re-enter password" />
          </div>

          {/* SMS opt-in checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="agreeToSms" checked={form.agreeToSms}
                   onChange={handleChange}
                   className="mt-0.5 w-4 h-4 cursor-pointer"
                   style={{ accentColor: '#22C55E' }} />
            <span className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
              I agree to receive SMS notifications when a student applies for my job posts.
            </span>
          </label>

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

          {/* Submit — Green CTA */}
          <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide cursor-pointer disabled:opacity-60 active:scale-[0.98] shadow-md mt-1 transition-all duration-200"
                  style={{
                    background: loading ? '#94A3B8' : 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
                    color: loading ? '#ffffff' : '#0B4D2E',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(74,222,128,0.40)',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 28px rgba(74,222,128,0.55)'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(74,222,128,0.40)'; }}>
            {loading ? '⏳ Registering Shop...' : '🏪 Register My Shop — It\'s Free!'}
          </button>

          <p className="text-center text-sm" style={{ color: '#475569' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#166534' }}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
