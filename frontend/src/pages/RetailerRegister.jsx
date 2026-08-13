import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useAuth } from './context/authContext';

const SRI_LANKA_CITIES = [
  'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura',
  'Badulla', 'Ratnapura', 'Trincomalee', 'Batticaloa', 'Matara',
  'Kurunegala', 'Nuwara Eliya', 'Polonnaruwa', 'Kalmunai', 'Vavuniya',
  'Dambulla', 'Wennappuwa', 'Chilaw', 'Puttalam', 'Other',
];



const BUSINESS_TYPES = [
  'Cafe',
  'Retail Shop',
  'Service Center',
  'Restaurant',
  'Boutique',
  'Supermarket',
  'Other',
];

export default function RetailerRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    shopName:        '',
    businessType:    '',
    serviceType:     '',
    city:            '',
    ownerName:       '',
    email:           '',
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
    if (!form.shopName || !form.city || !form.ownerName || !form.email || !form.mobile || !form.password) {
      return 'All fields are required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Enter a valid email address.';
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
    setError('');

    try {
      const res = await api.post('/auth/register/retailer', {
        shopName: form.shopName.trim(),
        businessType: form.businessType,
        serviceType: form.serviceType.trim() || form.businessType,
        location: form.city,
        ownerName: form.ownerName.trim(),
        email: form.email.trim().toLowerCase(),
        phoneNumber: form.mobile.trim(),
        password: form.password,
      });

      login(res.data.token, res.data.user);
      setSuccess(true);
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to create retailer account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-accent-dark to-primary-light">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-accent-soft">
            <span className="text-4xl">🛍️</span>
          </div>
          <h2 className="text-2xl font-bold text-text-main mb-2">Shop Registered!</h2>
          <p className="text-text-sub text-sm mb-1">
            Welcome, <strong>{form.ownerName}</strong>!
          </p>
          <p className="text-text-sub text-sm mb-6">
            <strong>{form.shopName}</strong> in <strong>{form.city}</strong> is now on UniLift.
            Start posting part-time jobs today!
          </p>
          <button onClick={() => navigate('/retail/jobs')}
                  className="w-full py-3 rounded-xl font-bold text-text-main cursor-pointer
                             hover:shadow-lg transition-all
                             bg-gradient-to-br from-accent-dark to-primary-light">
            Go to Retail Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14 bg-gradient-to-b from-primary via-primary-mid via-40% to-primary">

      {/* Background decorative orbs */}
      <div className="fixed -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'rgba(74,222,128,0.06)' }} />
      <div className="fixed -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
           style={{ background: 'rgba(34,197,94,0.05)' }} />
      <div className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
           style={{ background: '#ffffff' }}>

        {/* ── Header — Green accent for retailer ── */}
        <div className="px-8 pt-7 pb-6 relative overflow-hidden bg-gradient-to-br from-accent-dark to-primary-light">

          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 bg-primary"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10 bg-primary"></div>

          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md bg-primary">
              <span className="text-xl">🏪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-white">
                Shop Registration
              </h1>
              <p className="text-xs font-medium opacity-80 text-white">
                UniLift Retailer Portal
              </p>
            </div>
          </div>

          {/* Tagline pill */}
          <div className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary text-accent">
            <span>⚡</span>
            Post part-time jobs and find local students instantly!
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="flex divide-x divide-accent-border bg-accent-soft border-b border-accent-border">
          {[['128K+', 'Students'], ['75%', 'SME Focus'], ['Free', 'to Post']].map(([num, label]) => (
            <div key={label} className="flex-1 py-3 text-center">
              <div className="text-sm font-bold text-primary">{num}</div>
              <div className="text-xs text-text-sub">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">

          {/* Shop Name */}
          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Shop / Business Name <span className="text-red-400">*</span>
            </label>
            <input name="shopName" value={form.shopName} onChange={handleChange}
                   type="text" placeholder="e.g. Perera Grocery Store"
                   className="w-full px-4 py-3 rounded-xl border border-border text-sm
                              bg-surface text-text-main outline-none placeholder-text-muted
                              focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Business Type <span className="text-red-400">*</span>
            </label>
            <select name="businessType" value={form.businessType} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm
                               bg-surface text-text-main outline-none cursor-pointer
                               focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white">
              <option value="">— Select business type —</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Service Type
            </label>
            <input name="serviceType" value={form.serviceType} onChange={handleChange}
                   type="text" placeholder="e.g. Coffee, groceries, repairs, delivery"
                   className="w-full px-4 py-3 rounded-xl border border-border text-sm
                              bg-surface text-text-main outline-none placeholder-text-muted
                              focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              City / Location <span className="text-red-400">*</span>
            </label>
            <select name="city" value={form.city} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm
                               bg-surface text-text-main outline-none cursor-pointer
                               focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white">
              <option value="">— Select your city —</option>
              {SRI_LANKA_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Owner Name, Email & Mobile — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-sub mb-1.5">
                Owner Name <span className="text-red-400">*</span>
              </label>
              <input name="ownerName" value={form.ownerName} onChange={handleChange}
                     type="text" placeholder="Your full name"
                     className="w-full px-4 py-3 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-sub mb-1.5">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <input name="mobile" value={form.mobile} onChange={handleChange}
                     type="tel" placeholder="07X XXXXXXX"
                     maxLength={10}
                     className="w-full px-4 py-3 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input name="email" value={form.email} onChange={handleChange}
                   type="email" placeholder="shopowner@email.com"
                   className="w-full px-4 py-3 rounded-xl border border-border text-sm
                              bg-surface text-text-main outline-none placeholder-text-muted
                              focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input name="password" value={form.password} onChange={handleChange}
                     type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters"
                     className="w-full px-4 py-3 pr-12 rounded-xl border border-border text-sm
                                bg-surface text-text-main outline-none placeholder-text-muted
                                focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
              <button type="button" onClick={() => setShowPass((p) => !p)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer">
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-text-sub mb-1.5">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                   type={showPass ? 'text' : 'password'} placeholder="Re-enter password"
                   className="w-full px-4 py-3 rounded-xl border border-border text-sm
                              bg-surface text-text-main outline-none placeholder-text-muted
                              focus:border-primary-light focus:ring-2 focus:ring-accent-border focus:bg-white" />
          </div>

          {/* SMS opt-in checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="agreeToSms" checked={form.agreeToSms}
                   onChange={handleChange}
                   className="mt-0.5 w-4 h-4 accent-accent-dark cursor-pointer" />
            <span className="text-xs text-text-sub leading-relaxed">
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

          {/* Submit — Green accent CTA */}
          <button type="submit" disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide text-primary
                             cursor-pointer disabled:opacity-60 active:scale-[0.98] shadow-md mt-1
                             transition-shadow ${
                               loading
                                 ? 'bg-text-muted'
                                 : 'bg-gradient-to-br from-accent-dark to-primary-light hover:shadow-[0_8px_24px_rgba(34,197,94,0.45)]'
                             }`}>
            {loading ? '⏳ Registering Shop...' : '🏪 Register My Shop — It\'s Free!'}
          </button>

          <p className="text-center text-sm text-text-sub">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline text-primary">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
