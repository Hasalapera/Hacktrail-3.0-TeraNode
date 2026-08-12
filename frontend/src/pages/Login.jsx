import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ROLES = [
  { id: 'student',  label: 'Student',  hint: 'Enter your university credentials' },
  { id: 'company',  label: 'Company',  hint: 'Corporate HR or recruiter access' },
  { id: 'retailer', label: 'Retailer', hint: 'Local business owner access' },
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
  const [role, setRole]       = useState('student');
  const [form, setForm]       = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

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
      if      (data.action === 'REDIRECT_TO_CHANGE_PASSWORD')   navigate('/change-password');
      else if (data.action === 'REDIRECT_TO_COMPLETE_PROFILE')  navigate('/complete-profile');
      else navigate('/dashboard');
    } catch {
      setError('Unable to connect. Make sure the backend server is running.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-shell">

      {/* ── Left Brand Panel ─────────────────────────────── */}
      <div className="auth-brand">
        {/* Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 18, color: 'var(--navy)', flexShrink: 0,
            }}>U</div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>
              UniLift
            </span>
          </div>

          <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1.25, marginBottom: 16, letterSpacing: '-0.03em' }}>
            Your gateway to<br />real opportunities.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, marginBottom: 40 }}>
            Connecting Sri Lankan university students with companies, retailers, and freelance clients — all in one place.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Internships & Corporate Projects', 'Match with top companies by skill & degree'],
              ['Part-Time & Flexible Jobs',        'Find nearby gigs posted by local retailers'],
              ['Freelance Marketplace',            'Earn from design, dev, video editing & more'],
            ].map(([title, sub]) => (
              <div key={title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent)', marginTop: 7, flexShrink: 0,
                }} />
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.07)', borderRadius: 8,
          padding: '10px 14px', border: '1px solid rgba(255,255,255,0.10)',
        }}>
          <div style={{ display: 'flex', gap: -6 }}>
            {['#3B82F6','#10B981','#F59E0B'].map((c,i) => (
              <div key={i} style={{
                width: 24, height: 24, borderRadius: '50%',
                background: c, border: '2px solid var(--navy)',
                marginLeft: i > 0 ? -8 : 0,
              }} />
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 12 }}>
            Trusted by <strong style={{ color: '#fff' }}>128,000+</strong> students
          </span>
        </div>
      </div>

      {/* ── Right Form Panel ─────────────────────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner fade-up">

          {/* Heading */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', marginBottom: 4 }}>
              Sign in
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-sub)' }}>{active.hint}</p>
          </div>

          {/* Role Tabs */}
          <div style={{
            display: 'flex', background: 'var(--surface)',
            borderRadius: 10, padding: 4, marginBottom: 28,
            border: '1px solid var(--border)',
          }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => { setRole(r.id); setError(''); setForm({ username: '', password: '' }); }}
                style={{
                  flex: 1, padding: '8px 4px', border: 'none', borderRadius: 7, cursor: 'pointer',
                  fontSize: 13, fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.18s',
                  background: role === r.id ? 'var(--white)' : 'transparent',
                  color: role === r.id ? 'var(--navy)' : 'var(--text-muted)',
                  boxShadow: role === r.id ? 'var(--shadow-sm)' : 'none',
                }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div>
              <label className="field-label">Username</label>
              <input className="input-field" type="text" name="username"
                value={form.username} onChange={handleChange}
                placeholder={role === 'company' ? 'company_hr or email' : `${role}_username`}
                autoComplete="username" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="field-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" style={{ fontSize: 12, color: 'var(--navy-mid)', fontWeight: 500, textDecoration: 'none' }}
                   onMouseEnter={e => e.target.style.textDecoration='underline'}
                   onMouseLeave={e => e.target.style.textDecoration='none'}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input className="input-field" type={showPass ? 'text' : 'password'}
                  name="password" value={form.password} onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ paddingRight: 44 }} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {error && <div className="error-banner"><span>⚠</span>{error}</div>}

            <button className="btn-primary" type="submit" disabled={loading}
              style={{ marginTop: 4 }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider" style={{ margin: '24px 0' }}>or</div>

          {/* Register links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/register/company" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)',
              fontSize: 13, fontWeight: 600, color: 'var(--navy)',
              textDecoration: 'none', transition: 'border-color 0.18s, background 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--navy)'; e.currentTarget.style.background='var(--surface)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent'; }}>
              Register a Company
            </Link>
            <Link to="/register/retailer" style={{
              display: 'block', textAlign: 'center', padding: '12px',
              border: '1.5px solid var(--accent)', borderRadius: 'var(--radius-lg)',
              fontSize: 13, fontWeight: 600, color: 'var(--navy)',
              textDecoration: 'none', background: 'var(--accent-soft)',
              transition: 'filter 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.filter='brightness(0.96)'}
              onMouseLeave={e => e.currentTarget.style.filter='none'}>
              Register a Local Shop
            </Link>
          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 28 }}>
            © 2025 UniLift · Empowering Sri Lankan Students
          </p>
        </div>
      </div>
    </div>
  );
}
