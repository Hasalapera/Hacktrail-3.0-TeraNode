import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', oldPassword: '', newPassword: '', confirmNew: '' });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => { setError(''); setForm(p => ({ ...p, [e.target.name]: e.target.value })); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.oldPassword || !form.newPassword || !form.confirmNew) {
      setError('All fields are required.'); return;
    }
    if (form.newPassword.length < 8) { setError('New password must be at least 8 characters.'); return; }
    if (form.newPassword === form.oldPassword) { setError('New password must be different from old password.'); return; }
    if (form.newPassword !== form.confirmNew) { setError('New passwords do not match.'); return; }

    setLoading(true); setError('');
    try {
      const res  = await fetch('http://localhost:5000/auth/change-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, oldPassword: form.oldPassword, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message); return; }
      setSuccess(true);
      setTimeout(() => navigate('/complete-profile'), 1800);
    } catch { setError('Cannot connect to server. Make sure the backend is running.'); }
    finally   { setLoading(false); }
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

          <div style={{ width:60, height:60, borderRadius:16,
            background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.2)',
            display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 }}>
            <ShieldCheck size={28} color="var(--accent)" strokeWidth={1.5} />
          </div>

          <h2 style={{ color:'#fff', fontSize:26, fontWeight:800, lineHeight:1.25,
            letterSpacing:'-0.03em', marginBottom:14 }}>
            Secure your<br />account first.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.50)', fontSize:13.5, lineHeight:1.75, marginBottom:36 }}>
            You're using a temporary password. Set a strong personal password to protect your account.
          </p>

          {/* Password tips */}
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              'At least 8 characters long',
              'Mix letters, numbers & symbols',
              'Different from your old password',
            ].map(tip => (
              <div key={tip} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'var(--accent)', flexShrink:0 }} />
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:13 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <span style={{ color:'rgba(255,255,255,0.3)', fontSize:12 }}>Step 1 of 2 — Set Password</span>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner fade-up">

          {success ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ width:72, height:72, borderRadius:18, background:'var(--accent-soft)',
                border:'2px solid var(--accent-border)', display:'flex', alignItems:'center',
                justifyContent:'center', margin:'0 auto 24px' }}>
                <CheckCircle2 size={34} color="var(--primary)" strokeWidth={1.5} />
              </div>
              <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)', marginBottom:8 }}>
                Password Updated!
              </h1>
              <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
                Redirecting you to complete your profile…
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:28 }}>
                <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)', letterSpacing:'-0.03em', marginBottom:4 }}>
                  Change your password
                </h1>
                <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
                  Enter your temporary password and choose a new one.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>

                {/* Username */}
                <div>
                  <label className="field-label">Username</label>
                  <input className="input-field" name="username" type="text"
                    value={form.username} onChange={handleChange} placeholder="Your username" />
                </div>

                {/* Old Password */}
                <div>
                  <label className="field-label">Current (Temporary) Password</label>
                  <div className="input-icon-wrap">
                    <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                    <input className="input-field has-icon-left" name="oldPassword"
                      type={showOld ? 'text' : 'password'}
                      value={form.oldPassword} onChange={handleChange}
                      placeholder="Your current password" style={{ paddingRight:42 }} />
                    <button type="button" className="icon-right" onClick={() => setShowOld(p => !p)}>
                      {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* New Passwords side by side */}
                <div className="field-row">
                  <div>
                    <label className="field-label">New Password</label>
                    <div className="input-icon-wrap">
                      <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                      <input className="input-field has-icon-left" name="newPassword"
                        type={showNew ? 'text' : 'password'}
                        value={form.newPassword} onChange={handleChange}
                        placeholder="Min 8 chars" style={{ paddingRight:38 }} />
                      <button type="button" className="icon-right" onClick={() => setShowNew(p => !p)}>
                        {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Confirm New</label>
                    <div className="input-icon-wrap">
                      <span className="icon-left"><Lock size={15} strokeWidth={2} /></span>
                      <input className="input-field has-icon-left" name="confirmNew"
                        type={showNew ? 'text' : 'password'}
                        value={form.confirmNew} onChange={handleChange} placeholder="Re-enter" />
                    </div>
                  </div>
                </div>

                {error && <div className="error-banner"><span>⚠</span>{error}</div>}

                <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop:4 }}>
                  {loading ? 'Updating…' : (<>Update Password <ArrowRight size={15} strokeWidth={2.5} /></>)}
                </button>

                <p style={{ textAlign:'center', fontSize:13, color:'var(--text-sub)' }}>
                  <Link to="/login" style={{ color:'var(--primary-light)', fontWeight:600, textDecoration:'none' }}>
                    ← Back to Login
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
