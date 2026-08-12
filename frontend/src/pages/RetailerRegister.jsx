import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Store, MapPin, UserCircle, Phone, Lock, Eye, EyeOff,
  CheckCircle2, ArrowLeft, ArrowRight, Zap, Users, BadgeCheck,
} from 'lucide-react';

const CITIES = [
  'Colombo','Kandy','Galle','Jaffna','Negombo','Anuradhapura',
  'Badulla','Ratnapura','Trincomalee','Batticaloa','Matara',
  'Kurunegala','Nuwara Eliya','Polonnaruwa','Dambulla',
  'Wennappuwa','Chilaw','Puttalam','Kalmunai','Vavuniya','Other',
];

const PERKS = [
  { Icon: Zap,       text: 'Post jobs in under 60 seconds' },
  { Icon: Users,     text: 'Access 128,000+ ready students' },
  { Icon: BadgeCheck,text: 'Free to register — always' },
];

export default function RetailerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shopName:'', city:'', ownerName:'', mobile:'', password:'', confirmPassword:'',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);

  const handleChange = e => { setError(''); setForm(p => ({ ...p, [e.target.name]: e.target.value })); };

  const validate = () => {
    const f = form;
    if (!f.shopName || !f.city || !f.ownerName || !f.mobile || !f.password || !f.confirmPassword)
      return 'All fields are required.';
    if (!/^0[0-9]{9}$/.test(f.mobile)) return 'Enter a valid mobile number (e.g. 0771234567).';
    if (f.password.length < 8) return 'Password must be at least 8 characters.';
    if (f.password !== f.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate(); if (err) { setError(err); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); /* TODO: POST /auth/register/retailer */
    setLoading(false); setSuccess(true);
  };

  /* ── Success Screen ── */
  if (success) return (
    <div className="auth-shell">
      <div className="auth-brand" style={{ justifyContent:'center', alignItems:'center', textAlign:'center' }}>
        <div>
          <div style={{ width:64, height:64, borderRadius:16,
            background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.25)',
            display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
            <Store size={28} color="var(--accent)" strokeWidth={1.5} />
          </div>
          <h2 style={{ color:'#fff', fontSize:22, fontWeight:800, marginBottom:10 }}>Shop is live!</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13.5, lineHeight:1.7 }}>
            <strong style={{ color:'#fff' }}>{form.shopName}</strong><br />
            in <strong style={{ color:'#fff' }}>{form.city}</strong> is now on UniLift.
          </p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-inner fade-up" style={{ textAlign:'center' }}>
          <div style={{ width:72, height:72, borderRadius:18, background:'var(--accent-soft)',
            border:'2px solid var(--accent-border)', display:'flex', alignItems:'center',
            justifyContent:'center', margin:'0 auto 24px' }}>
            <CheckCircle2 size={34} color="var(--primary)" strokeWidth={1.5} />
          </div>
          <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)', marginBottom:8 }}>
            You're all set!
          </h1>
          <p style={{ fontSize:13.5, color:'var(--text-sub)', marginBottom:10, lineHeight:1.7 }}>
            Welcome, <strong>{form.ownerName}</strong>.<br />
            Start posting part-time jobs and connect with local students instantly.
          </p>
          <div className="success-banner" style={{ marginBottom:24, textAlign:'left' }}>
            <CheckCircle2 size={15} strokeWidth={2} color="var(--primary)" />
            Your shop <strong>{form.shopName}</strong> is registered in {form.city}.
          </div>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Go to Login <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-shell">

      {/* ── Left Brand Panel ─────────────── */}
      <div className="auth-brand">
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:52 }}>
            <div style={{ width:38, height:38, borderRadius:10, background:'var(--accent)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontWeight:900, fontSize:17, color:'var(--primary)' }}>U</span>
            </div>
            <span style={{ color:'#fff', fontWeight:700, fontSize:18, letterSpacing:'-0.02em' }}>UniLift</span>
          </div>

          <h2 style={{ color:'#fff', fontSize:26, fontWeight:800, lineHeight:1.25,
            letterSpacing:'-0.03em', marginBottom:14 }}>
            Find student helpers<br />for your shop — fast.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.50)', fontSize:13.5, lineHeight:1.75, marginBottom:44 }}>
            Post part-time and one-day job openings. Nearby university students will apply within minutes.
          </p>

          {/* Perks */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {PERKS.map(({ Icon, text }) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:34, height:34, borderRadius:9, flexShrink:0,
                  background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={16} color="var(--accent)" strokeWidth={2} />
                </div>
                <span style={{ color:'rgba(255,255,255,0.65)', fontSize:13 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/login" style={{ display:'inline-flex', alignItems:'center', gap:6,
          color:'rgba(255,255,255,0.45)', fontSize:12, textDecoration:'none', marginTop:24 }}
          onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
          <ArrowLeft size={13} strokeWidth={2} /> Back to login
        </Link>
      </div>

      {/* ── Right Form Panel ─────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner fade-up">

          <div style={{ marginBottom:28 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)',
              letterSpacing:'-0.03em', marginBottom:4 }}>
              Register your shop
            </h1>
            <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
              Free to join — start hiring local students today.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:15 }}>

            {/* Shop Name */}
            <div>
              <label className="field-label">Shop / Business Name</label>
              <div className="input-icon-wrap">
                <span className="icon-left"><Store size={15} strokeWidth={2} /></span>
                <input className="input-field has-icon-left" name="shopName" type="text"
                  value={form.shopName} onChange={handleChange}
                  placeholder="e.g. Perera Grocery Store" />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="field-label">City / Location</label>
              <div className="input-icon-wrap">
                <span className="icon-left"><MapPin size={15} strokeWidth={2} /></span>
                <select className="select-field" name="city"
                  value={form.city} onChange={handleChange}
                  style={{ paddingLeft:38 }}>
                  <option value="">Select your city…</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Owner & Mobile — 2 col */}
            <div className="field-row">
              <div>
                <label className="field-label">Owner Name</label>
                <div className="input-icon-wrap">
                  <span className="icon-left"><UserCircle size={15} strokeWidth={2} /></span>
                  <input className="input-field has-icon-left" name="ownerName" type="text"
                    value={form.ownerName} onChange={handleChange} placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="field-label">Mobile Number</label>
                <div className="input-icon-wrap">
                  <span className="icon-left"><Phone size={15} strokeWidth={2} /></span>
                  <input className="input-field has-icon-left" name="mobile" type="tel"
                    value={form.mobile} onChange={handleChange}
                    placeholder="07X XXXXXXX" maxLength={10} />
                </div>
              </div>
            </div>

            {/* Password & Confirm — 2 col */}
            <div className="field-row">
              <div>
                <label className="field-label">Password</label>
                <div className="input-icon-wrap">
                  <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                  <input className="input-field has-icon-left" name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password} onChange={handleChange}
                    placeholder="Min 8 chars" style={{ paddingRight:38 }} />
                  <button type="button" className="icon-right" onClick={() => setShowPass(p => !p)}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="field-label">Confirm Password</label>
                <div className="input-icon-wrap">
                  <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                  <input className="input-field has-icon-left" name="confirmPassword"
                    type={showPass ? 'text' : 'password'}
                    value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter" />
                </div>
              </div>
            </div>

            {error && <div className="error-banner"><span>⚠</span>{error}</div>}

            {/* CTA — accent green for retailers */}
            <button className="btn-accent" type="submit" disabled={loading} style={{ marginTop:6 }}>
              {loading ? 'Registering shop…' : (<>Register My Shop <ArrowRight size={15} strokeWidth={2.5} /></>)}
            </button>

            <p style={{ textAlign:'center', fontSize:13, color:'var(--text-sub)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color:'var(--primary-light)', fontWeight:600, textDecoration:'none' }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
