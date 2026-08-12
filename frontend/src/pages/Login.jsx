import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, User, Lock, ArrowRight,
  GraduationCap, Building2, Store,
  TrendingUp, Briefcase, Laptop,
} from 'lucide-react';

const ROLES = [
  { id: 'student',  label: 'Student',  Icon: GraduationCap, hint: 'University student login' },
  { id: 'company',  label: 'Company',  Icon: Building2,      hint: 'Corporate HR access' },
  { id: 'retailer', label: 'Retailer', Icon: Store,          hint: 'Local business login' },
];

const FEATURES = [
  { Icon: TrendingUp, title: 'Corporate Internships',    sub: 'Matched by skill & degree' },
  { Icon: Briefcase,  title: 'Part-Time & Flexible Jobs', sub: 'Nearby opportunities, live feed' },
  { Icon: Laptop,     title: 'Freelance Marketplace',    sub: 'Design, Dev, Video & more' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole]         = useState('student');
  const [form, setForm]         = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const active = ROLES.find(r => r.id === role);

  const handleChange = e => { setError(''); setForm(p => ({ ...p, [e.target.name]: e.target.value })); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) { setError('Both fields are required.'); return; }
    setLoading(true); setError('');
    try {
      const res  = await fetch('http://localhost:5000/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message); return; }
      if      (data.action === 'REDIRECT_TO_CHANGE_PASSWORD')  navigate('/change-password');
      else if (data.action === 'REDIRECT_TO_COMPLETE_PROFILE') navigate('/complete-profile');
      else navigate('/dashboard');
    } catch { setError('Cannot connect to server. Make sure the backend is running.'); }
    finally   { setLoading(false); }
  };

  return (
    <div className="auth-shell">

      {/* ── Left Brand Panel ─────────────── */}
      <div className="auth-brand">
        {/* Logo */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:52 }}>
            <div style={{
              width:38, height:38, borderRadius:10,
              background:'var(--accent)', display:'flex',
              alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <span style={{ fontWeight:900, fontSize:17, color:'var(--primary)' }}>U</span>
            </div>
            <span style={{ color:'#fff', fontWeight:700, fontSize:18, letterSpacing:'-0.02em' }}>UniLift</span>
          </div>

          <h2 style={{ color:'#fff', fontSize:26, fontWeight:800, lineHeight:1.25, letterSpacing:'-0.03em', marginBottom:14 }}>
            Your gateway to<br />real opportunities.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13.5, lineHeight:1.75, marginBottom:44 }}>
            Connecting Sri Lankan university students with companies, retailers, and freelance clients.
          </p>

          {/* Feature list */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {FEATURES.map(({ Icon, title, sub }) => (
              <div key={title} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <div style={{
                  width:34, height:34, borderRadius:9, flexShrink:0,
                  background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon size={16} color="var(--accent)" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ color:'#fff', fontSize:13, fontWeight:600, marginBottom:1 }}>{title}</div>
                  <div style={{ color:'rgba(255,255,255,0.42)', fontSize:12 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:10,
          background:'rgba(255,255,255,0.06)',
          border:'1px solid rgba(255,255,255,0.10)',
          borderRadius:10, padding:'11px 14px',
        }}>
          <div style={{ display:'flex' }}>
            {['#22C55E','#3B82F6','#F59E0B'].map((c,i) => (
              <div key={i} style={{
                width:24, height:24, borderRadius:'50%',
                background:c, border:'2px solid var(--primary)',
                marginLeft: i > 0 ? -7 : 0, zIndex: 3-i, position:'relative',
              }} />
            ))}
          </div>
          <span style={{ color:'rgba(255,255,255,0.65)', fontSize:12 }}>
            Trusted by <strong style={{ color:'#fff' }}>128,000+</strong> students
          </span>
        </div>
      </div>

      {/* ── Right Form Panel ─────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner fade-up">

          {/* Heading */}
          <div style={{ marginBottom:28 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)', letterSpacing:'-0.03em', marginBottom:4 }}>
              Welcome back
            </h1>
            <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>{active.hint}</p>
          </div>

          {/* Role Tabs */}
          <div className="role-tabs" style={{ marginBottom:26 }}>
            {ROLES.map(({ id, label, Icon }) => (
              <button key={id} className={`role-tab ${role === id ? 'active' : ''}`}
                onClick={() => { setRole(id); setError(''); setForm({ username:'', password:'' }); }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* Username */}
            <div>
              <label className="field-label">Username</label>
              <div className="input-icon-wrap">
                <span className="icon-left"><User size={15} strokeWidth={2} /></span>
                <input className="input-field has-icon-left"
                  type="text" name="username"
                  value={form.username} onChange={handleChange}
                  placeholder="Enter your username"
                  autoComplete="username" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                <label className="field-label" style={{ marginBottom:0 }}>Password</label>
                <a href="#" style={{ fontSize:12, color:'var(--primary-light)', fontWeight:500, textDecoration:'none' }}
                  onMouseEnter={e => e.target.style.textDecoration='underline'}
                  onMouseLeave={e => e.target.style.textDecoration='none'}>
                  Forgot password?
                </a>
              </div>
              <div className="input-icon-wrap">
                <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                <input className="input-field has-icon-left"
                  type={showPass ? 'text' : 'password'}
                  name="password" value={form.password} onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ paddingRight:42 }} autoComplete="current-password" />
                <button type="button" className="icon-right" onClick={() => setShowPass(p => !p)}>
                  {showPass ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-banner">
                <span style={{ fontSize:15 }}>⚠</span> {error}
              </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop:4 }}>
              {loading ? 'Signing in…' : (<>Sign in <ArrowRight size={15} strokeWidth={2.5} /></>)}
            </button>
          </form>

          {/* Divider */}
          <div className="divider" style={{ margin:'22px 0' }}>or continue as</div>

          {/* Register links */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Link to="/register/company" className="btn-outline" style={{ textDecoration:'none' }}>
              <Building2 size={15} strokeWidth={2} /> Register a Company
            </Link>
            <Link to="/register/retailer" style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:6,
              padding:'11px 20px', borderRadius:'var(--radius-md)',
              background:'var(--accent-soft)', border:'1.5px solid var(--accent-border)',
              fontSize:13, fontWeight:600, color:'var(--primary)', textDecoration:'none',
              transition:'filter 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.filter='brightness(0.96)'}
              onMouseLeave={e => e.currentTarget.style.filter='none'}>
              <Store size={15} strokeWidth={2} /> Register a Local Shop
            </Link>
          </div>

          <p style={{ textAlign:'center', fontSize:12, color:'var(--text-muted)', marginTop:28 }}>
            © 2025 UniLift · Empowering Sri Lankan Students
          </p>
        </div>
      </div>
    </div>
  );
}
