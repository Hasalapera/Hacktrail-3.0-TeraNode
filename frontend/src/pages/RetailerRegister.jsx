import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SRI_LANKA_CITIES = [
  'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura',
  'Badulla', 'Ratnapura', 'Trincomalee', 'Batticaloa', 'Matara',
  'Kurunegala', 'Nuwara Eliya', 'Polonnaruwa', 'Kalmunai', 'Vavuniya',
  'Dambulla', 'Wennappuwa', 'Chilaw', 'Puttalam', 'Other',
];

export default function RetailerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName:    '',
    city:        '',
    ownerName:   '',
    mobile:      '',
    password:    '',
    confirmPassword: '',
    agreeToSms:  false,
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
           style={{ background: 'linear-gradient(135deg, #f5c518 0%, #d4a800 100%)' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
               style={{ background: '#fefce8' }}>
            <span className="text-4xl">🛍️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Shop Registered!</h2>
          <p className="text-slate-500 text-sm mb-1">
            Welcome, <strong>{form.ownerName}</strong>!
          </p>
          <p className="text-slate-500 text-sm mb-6">
            <strong>{form.shopName}</strong> in <strong>{form.city}</strong> is now on UniLift.
            Start posting part-time jobs today!
          </p>
          <button onClick={() => navigate('/login')}
                  className="w-full py-3 rounded-xl font-bold text-slate-800 cursor-pointer
                             hover:shadow-lg transition-all"
                  style={{ background: 'linear-gradient(135deg, #f5c518, #d4a800)' }}>
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14"
         style={{ background: 'linear-gradient(160deg, #0f2557 0%, #1a3a7c 40%, #0f2557 100%)' }}>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* ── Header — Yellow accent for retailer ── */}
        <div className="px-8 pt-7 pb-6 relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #f5c518, #d4a800)' }}>

          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
               style={{ background: '#0f2557' }}></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10"
               style={{ background: '#0f2557' }}></div>

          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                 style={{ background: '#0f2557' }}>
              <span className="text-xl">🏪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight" style={{ color: '#0f2557' }}>
                Shop Registration
              </h1>
              <p className="text-xs font-medium opacity-70" style={{ color: '#0f2557' }}>
                UniLift Retailer Portal
              </p>
            </div>
          </div>

          {/* Tagline pill */}
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
               style={{ background: '#0f2557', color: '#f5c518' }}>
            <span>⚡</span>
            Post part-time jobs and find local students instantly!
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="flex divide-x divide-gray-100 bg-amber-50 border-b border-amber-100">
          {[['128K+', 'Students'], ['75%', 'SME Focus'], ['Free', 'to Post']].map(([num, label]) => (
            <div key={label} className="flex-1 py-3 text-center">
              <div className="text-sm font-bold" style={{ color: '#0f2557' }}>{num}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">

          {/* Shop Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">
              Shop / Business Name <span className="text-red-400">*</span>
            </label>
            <input name="shopName" value={form.shopName} onChange={handleChange}
                   type="text" placeholder="e.g. Perera Grocery Store"
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                              bg-slate-50 text-slate-800 outline-none placeholder-slate-400
                              focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white" />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">
              City / Location <span className="text-red-400">*</span>
            </label>
            <select name="city" value={form.city} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                               bg-slate-50 text-slate-800 outline-none cursor-pointer
                               focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white">
              <option value="">— Select your city —</option>
              {SRI_LANKA_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Owner Name & Mobile — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Owner Name <span className="text-red-400">*</span>
              </label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange}
                     type="text" placeholder="Your full name"
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                bg-slate-50 text-slate-800 outline-none placeholder-slate-400
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <input name="mobile" value={form.mobile} onChange={handleChange}
                     type="tel" placeholder="07X XXXXXXX"
                     maxLength={10}
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                bg-slate-50 text-slate-800 outline-none placeholder-slate-400
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input name="password" value={form.password} onChange={handleChange}
                     type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters"
                     className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-sm
                                bg-slate-50 text-slate-800 outline-none placeholder-slate-400
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white" />
              <button type="button" onClick={() => setShowPass((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer">
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                   type={showPass ? 'text' : 'password'} placeholder="Re-enter password"
                   className="w-full px-4 py-3 rounded-xl border border-gray-200 text sm
                              bg-slate-50 text-slate-800 outline-none placeholder-slate-400
                              focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white" />
          </div>

          {/* SMS opt-in checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" name="agreeToSms" checked={form.agreeToSms}
                   onChange={handleChange}
                   className="mt-0.5 w-4 h-4 accent-amber-400 cursor-pointer" />
            <span className="text-xs text-slate-500 leading-relaxed">
              I agree to receive SMS notifications when a student applies for my job posts.
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600
                            text-sm px-4 py-3 rounded-xl">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Submit — Yellow accent CTA */}
          <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide
                             cursor-pointer disabled:opacity-60 active:scale-[0.98] shadow-md mt-1"
                  style={{
                    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #f5c518, #d4a800)',
                    color: '#0f2557',
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,197,24,0.45)'; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.boxShadow = 'none'; }}>
            {loading ? '⏳ Registering Shop...' : '🏪 Register My Shop — It\'s Free!'}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#0f2557' }}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
