import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, GraduationCap, BookOpen, Phone, ArrowRight, CheckCircle2, ClipboardList } from 'lucide-react';

const UNIVERSITIES = [
  'University of Colombo', 'University of Peradeniya', 'University of Moratuwa',
  'University of Kelaniya', 'University of Sri Jayewardenepura', 'University of Ruhuna',
  'University of Jaffna', 'SLIIT', 'NSBM Green University', 'IIT Sri Lanka', 'Other',
];

const DEGREES = [
  'BSc Computer Science', 'BSc Information Technology', 'BSc Engineering',
  'BSc Business Management', 'BA Economics', 'BA Accounting & Finance',
  'BSc Medicine', 'BSc Nursing', 'BA Law', 'BEd Education', 'Other',
];

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', firstName: '', lastName: '',
    university: '', year: '', degree: '', phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => { setError(''); setForm(p => ({ ...p, [e.target.name]: e.target.value })); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.firstName || !form.lastName || !form.university || !form.year) {
      setError('All required fields must be filled.'); return;
    }
    setLoading(true); setError('');
    try {
      const res  = await fetch('http://localhost:5000/student/complete-profile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username, firstName: form.firstName, lastName: form.lastName,
          university: form.university, year: Number(form.year),
          degree: form.degree, phone: form.phone,
        }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message); return; }
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
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
            <ClipboardList size={28} color="var(--accent)" strokeWidth={1.5} />
          </div>

          <h2 style={{ color:'#fff', fontSize:26, fontWeight:800, lineHeight:1.25,
            letterSpacing:'-0.03em', marginBottom:14 }}>
            Almost there!<br />Tell us about yourself.
          </h2>
          <p style={{ color:'rgba(255,255,255,0.50)', fontSize:13.5, lineHeight:1.75, marginBottom:36 }}>
            Your profile helps companies and retailers find you for the right opportunities.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {['Your name & university', 'Academic year & degree', 'Contact number (optional)'].map((s, i) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{
                  width:22, height:22, borderRadius:'50%', flexShrink:0,
                  background:'rgba(74,222,128,0.15)', border:'1px solid rgba(74,222,128,0.25)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:700, color:'var(--accent)',
                }}>{i + 1}</div>
                <span style={{ color:'rgba(255,255,255,0.55)', fontSize:13 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <span style={{ color:'rgba(255,255,255,0.3)', fontSize:12 }}>Step 2 of 2 — Complete Profile</span>
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
                Profile Complete!
              </h1>
              <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
                Welcome to UniLift 🚀 Taking you to the dashboard…
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:24 }}>
                <h1 style={{ fontSize:22, fontWeight:800, color:'var(--text-main)', letterSpacing:'-0.03em', marginBottom:4 }}>
                  Complete your profile
                </h1>
                <p style={{ fontSize:13.5, color:'var(--text-sub)' }}>
                  Fields marked <span style={{ color:'#EF4444' }}>*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:15 }}>

                {/* Username */}
                <div>
                  <label className="field-label">Username <span style={{ color:'#EF4444' }}>*</span></label>
                  <input className="input-field" name="username" type="text"
                    value={form.username} onChange={handleChange} placeholder="Your username" />
                </div>

                {/* First & Last Name */}
                <div className="field-row">
                  <div>
                    <label className="field-label">First Name <span style={{ color:'#EF4444' }}>*</span></label>
                    <div className="input-icon-wrap">
                      <span className="icon-left"><User size={15} strokeWidth={2} /></span>
                      <input className="input-field has-icon-left" name="firstName" type="text"
                        value={form.firstName} onChange={handleChange} placeholder="First name" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Last Name <span style={{ color:'#EF4444' }}>*</span></label>
                    <input className="input-field" name="lastName" type="text"
                      value={form.lastName} onChange={handleChange} placeholder="Last name" />
                  </div>
                </div>

                {/* University */}
                <div>
                  <label className="field-label">University <span style={{ color:'#EF4444' }}>*</span></label>
                  <div className="input-icon-wrap">
                    <span className="icon-left"><GraduationCap size={15} strokeWidth={2} /></span>
                    <select className="select-field" name="university"
                      value={form.university} onChange={handleChange} style={{ paddingLeft:38 }}>
                      <option value="">Select your university…</option>
                      {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                {/* Year & Degree */}
                <div className="field-row">
                  <div>
                    <label className="field-label">Academic Year <span style={{ color:'#EF4444' }}>*</span></label>
                    <select className="select-field" name="year" value={form.year} onChange={handleChange}>
                      <option value="">Year…</option>
                      {[1,2,3,4,5].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Degree Programme</label>
                    <div className="input-icon-wrap">
                      <span className="icon-left"><BookOpen size={15} strokeWidth={2} /></span>
                      <select className="select-field" name="degree"
                        value={form.degree} onChange={handleChange} style={{ paddingLeft:38 }}>
                        <option value="">Select…</option>
                        {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Phone (optional) */}
                <div>
                  <label className="field-label">Mobile Number <span style={{ color:'var(--text-muted)', fontWeight:400 }}>(optional)</span></label>
                  <div className="input-icon-wrap">
                    <span className="icon-left"><Phone size={15} strokeWidth={2} /></span>
                    <input className="input-field has-icon-left" name="phone" type="tel"
                      value={form.phone} onChange={handleChange} placeholder="07X XXXXXXX" maxLength={10} />
                  </div>
                </div>

                {error && <div className="error-banner"><span>⚠</span>{error}</div>}

                <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop:4 }}>
                  {loading ? 'Saving profile…' : (<>Complete Profile <ArrowRight size={15} strokeWidth={2.5} /></>)}
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
