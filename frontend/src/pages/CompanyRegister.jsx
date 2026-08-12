import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2, Layers, UserCircle, Mail, Phone, Lock,
  Eye, EyeOff, ChevronDown, CheckCircle2, ArrowLeft, ArrowRight,
} from 'lucide-react';

const INDUSTRIES = [
  'Information Technology', 'Finance & Banking', 'Engineering',
  'Healthcare & Pharma', 'Education', 'Marketing & Media',
  'Manufacturing', 'Logistics & Supply Chain', 'Retail & E-commerce', 'Other',
];

export default function CompanyRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName:'', industry:'', hrName:'', email:'', phone:'', password:'', confirmPassword:'',
  });
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);

  const handleChange = e => { setError(''); setForm(p => ({ ...p, [e.target.name]: e.target.value })); };

  const validate = () => {
    const f = form;
    if (!f.companyName || !f.industry || !f.hrName || !f.email || !f.phone || !f.password || !f.confirmPassword)
      return 'All fields are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return 'Enter a valid corporate email.';
    if (f.password.length < 8) return 'Password must be at least 8 characters.';
    if (f.password !== f.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate(); if (err) { setError(err); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); /* TODO: POST /auth/register/company */
    setLoading(false); setSuccess(true);
  };

  /* ── Success ── */
  if (success) return (
    <div className="auth-shell">
      <div className="auth-brand" style={{ justifyContent:'center', alignItems:'center', textAlign:'center' }}>
        <div>
          <div style={{ width:64, height:64, borderRadius:16, background:'rgba(74,222,128,0.15)',
            border:'1px solid rgba(74,222,128,0.25)', display:'flex', alignItems:'center',
            justifyContent:'center', margin:'0 auto 20px' }}>
            <CheckCircle2 size={30} color="var(--accent)" strokeWidth={1.5} />
          </div>
          <h2 style={{ color:'#fff', fontSize:22, fontWeight:800, marginBottom:10 }}>You're registered!</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13.5, lineHeight:1.7 }}>
            We'll review <strong style={{ color:'#fff' }}>{form.companyName}</strong> and<br />
            notify you at <strong style={{ color:'#fff' }}>{form.email}</strong>.
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
            Application Submitted
          </h1>
          <p style={{ fontSize:13.5, color:'var(--text-sub)', marginBottom:32, lineHeight:1.7 }}>
            Your company profile is under review.<br />
            Check your inbox at <strong>{form.email}</strong>.
          </p>
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
            Access Sri Lanka's<br />top student talent.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.50)', fontSize:13.5, lineHeight:1.75, marginBottom:44 }}>
            Post internships, projects, and vacancies. Our AI matching engine delivers the right profiles — instantly.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              ['128,000+', 'University students on the platform'],
              ['AI Matching', 'Filter by degree, skill, and year'],
              ['Zero middlemen', 'Contact students directly'],
            ].map(([val, label]) => (
              <div key={val} style={{ display:'flex', alignItems:'center', gap:12,
                padding:'12px 14px', borderRadius:10,
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize:13, fontWeight:800, color:'var(--accent)', minWidth:90 }}>{val}</span>
                <span style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)' }}>{label}</span>
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
              Register your company
            </h1>
            <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
              All fields are required to verify your business.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:15 }}>

            {/* Company Name */}
            <div>
              <label className="field-label">Company Name</label>
              <div className="input-icon-wrap">
                <span className="icon-left"><Building2 size={15} strokeWidth={2} /></span>
                <input className="input-field has-icon-left" name="companyName" type="text"
                  value={form.companyName} onChange={handleChange}
                  placeholder="e.g. ABC Technologies (Pvt) Ltd" />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="field-label">Industry</label>
              <div className="input-icon-wrap">
                <span className="icon-left"><Layers size={15} strokeWidth={2} /></span>
                <select className="select-field has-icon-left" name="industry"
                  value={form.industry} onChange={handleChange}
                  style={{ paddingLeft:38 }}>
                  <option value="">Select industry…</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>

            {/* HR Name & Phone — 2 col */}
            <div className="field-row">
              <div>
                <label className="field-label">HR Contact Name</label>
                <div className="input-icon-wrap">
                  <span className="icon-left"><UserCircle size={15} strokeWidth={2} /></span>
                  <input className="input-field has-icon-left" name="hrName" type="text"
                    value={form.hrName} onChange={handleChange} placeholder="Full name" />
                </div>
              </div>
              <div>
                <label className="field-label">Contact Number</label>
                <div className="input-icon-wrap">
                  <span className="icon-left"><Phone size={15} strokeWidth={2} /></span>
                  <input className="input-field has-icon-left" name="phone" type="tel"
                    value={form.phone} onChange={handleChange} placeholder="07X XXXXXXX" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="field-label">Corporate Email</label>
              <div className="input-icon-wrap">
                <span className="icon-left"><Mail size={15} strokeWidth={2} /></span>
                <input className="input-field has-icon-left" name="email" type="email"
                  value={form.email} onChange={handleChange} placeholder="hr@company.com" />
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
                    value={form.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter" />
                </div>
              </div>
            </div>

            {error && <div className="error-banner"><span>⚠</span>{error}</div>}

            <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop:6 }}>
              {loading ? 'Registering…' : (<>Register Company <ArrowRight size={15} strokeWidth={2.5} /></>)}
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
