import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Building2, Store, ArrowRight, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const ROLE_OPTIONS = [
  { id: 'student',  label: 'Student',  Icon: GraduationCap, to: null,                 desc: 'University student account' },
  { id: 'company',  label: 'Company',  Icon: Building2,      to: '/register/company',  desc: 'Post internships & projects' },
  { id: 'retailer', label: 'Retailer', Icon: Store,          to: '/register/retailer', desc: 'Post part-time & quick jobs' },
];

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole]         = useState('student');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = e => { setError(''); setForm(p => ({ ...p, [e.target.name]: e.target.value })); };

  const handleSubmit = async e => {
    e.preventDefault();
    // If company/retailer selected, redirect to their dedicated form
    if (role === 'company')  { navigate('/register/company');  return; }
    if (role === 'retailer') { navigate('/register/retailer'); return; }
    if (!form.name || !form.email || !form.password) { setError('All fields are required.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); /* TODO: POST /auth/register/student */
    setLoading(false);
    navigate('/login');
  };

  return (
    <div className="auth-shell">

      {/* ── Left Panel ── */}
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
            Join UniLift.<br />Start earning today.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.50)', fontSize:13.5, lineHeight:1.75, marginBottom:44 }}>
            Sri Lanka's platform for student opportunities — internships, part-time jobs, and freelance gigs.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ROLE_OPTIONS.map(({ id, label, Icon, desc }) => (
              <div key={id} onClick={() => setRole(id)} style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                borderRadius:10, cursor:'pointer', transition:'all 0.18s',
                background: role === id ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.04)',
                border: role === id ? '1px solid rgba(74,222,128,0.30)' : '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  width:34, height:34, borderRadius:9, flexShrink:0,
                  background: role === id ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.07)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Icon size={16} color={role === id ? 'var(--accent)' : 'rgba(255,255,255,0.4)'} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ color: role === id ? '#fff' : 'rgba(255,255,255,0.55)', fontSize:13, fontWeight:600 }}>{label}</div>
                  <div style={{ color:'rgba(255,255,255,0.35)', fontSize:12 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/login" style={{ color:'rgba(255,255,255,0.45)', fontSize:12, textDecoration:'none' }}
          onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.45)'}>
          ← Already have an account? Sign in
        </Link>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner fade-up">
          <div style={{ marginBottom:28 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)', letterSpacing:'-0.03em', marginBottom:4 }}>
              Create your account
            </h1>
            <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
              {role === 'company' ? 'You\'ll be redirected to the company form.' :
               role === 'retailer' ? 'You\'ll be redirected to the shop form.' :
               'Set up your student profile in seconds.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {role === 'student' && (
              <>
                <div>
                  <label className="field-label">Full Name</label>
                  <div className="input-icon-wrap">
                    <span className="icon-left"><User size={15} strokeWidth={2} /></span>
                    <input className="input-field has-icon-left" name="name" type="text"
                      value={form.name} onChange={handleChange} placeholder="Your full name" />
                  </div>
                </div>
                <div>
                  <label className="field-label">Email Address</label>
                  <div className="input-icon-wrap">
                    <span className="icon-left"><Mail size={15} strokeWidth={2} /></span>
                    <input className="input-field has-icon-left" name="email" type="email"
                      value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="field-label">Password</label>
                  <div className="input-icon-wrap">
                    <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                    <input className="input-field has-icon-left" name="password"
                      type={showPass ? 'text' : 'password'}
                      value={form.password} onChange={handleChange}
                      placeholder="Min 8 characters" style={{ paddingRight:42 }} />
                    <button type="button" className="icon-right" onClick={() => setShowPass(p => !p)}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {(role === 'company' || role === 'retailer') && (
              <div style={{
                padding:'16px', borderRadius:12,
                background:'var(--accent-soft)', border:'1.5px solid var(--accent-border)',
                fontSize:13.5, color:'var(--primary)', lineHeight:1.6,
              }}>
                {role === 'company'
                  ? '🏛️ Company registration requires more details. Click below to continue to the full company form.'
                  : '🏪 Shop registration requires your location and shop details. Click below to continue.'}
              </div>
            )}

            {error && <div className="error-banner"><span>⚠</span>{error}</div>}

            <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop:4 }}>
              {loading ? 'Creating account…' : (
                <>
                  {role === 'company' ? 'Continue to Company Form' :
                   role === 'retailer' ? 'Continue to Shop Form' : 'Create Student Account'}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
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