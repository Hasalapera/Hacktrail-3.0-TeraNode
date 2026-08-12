// ============================================================
// App.jsx — UniLift Route Configuration
// BrowserRouter is already wrapped in main.jsx
// ============================================================
import { Routes, Route, Navigate } from 'react-router-dom';

// ── Auth & Onboarding pages (hass branch) ──────────────────
import Login            from './pages/Login';
import Register         from './pages/Register';
import CompanyRegister  from './pages/CompanyRegister';
import RetailerRegister from './pages/RetailerRegister';
import NotFound         from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/"  element={<Navigate to="/login" replace />} />

      {/* ── Auth routes ── */}
      <Route path="/login"              element={<Login />} />
      <Route path="/register"           element={<Register />} />
      <Route path="/register/company"   element={<CompanyRegister />} />
      <Route path="/register/retailer"  element={<RetailerRegister />} />

      {/* ── Student routes (Rasara branch — add here as built) ── */}
      {/* <Route path="/student/home"       element={<StudentHome />} /> */}
      {/* <Route path="/student/freelance"  element={<FreelancerClient />} /> */}

      {/* ── Publisher routes (Rasara branch — add here as built) ── */}
      {/* <Route path="/retail/jobs"        element={<RetailJobPublisher />} /> */}
      {/* <Route path="/company/jobs"       element={<CompanyJobPublisher />} /> */}

      {/* ── Placeholder routes (unlock as pages are built) ── */}
      <Route path="/change-password"    element={<PlaceholderPage title="Change Password" />} />
      <Route path="/complete-profile"   element={<PlaceholderPage title="Complete Your Profile" />} />
      <Route path="/dashboard"          element={<PlaceholderPage title="Dashboard 🚀" />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* ── Under-construction placeholder ───────────────────────── */
function PlaceholderPage({ title }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary), var(--primary-mid))',
      padding: '24px',
    }}>
      <div style={{
        background: 'var(--white)', borderRadius: 20,
        padding: '48px 40px', textAlign: 'center',
        maxWidth: 360, width: '100%',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{
          fontSize: 40, marginBottom: 16,
          width: 72, height: 72, borderRadius: 18,
          background: 'var(--accent-soft)', border: '2px solid var(--accent-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>🚧</div>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 8 }}>
          {title}
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--text-sub)', marginBottom: 28 }}>
          This page is under construction.
        </p>
        <a href="/login" style={{
          display: 'inline-block', padding: '11px 24px',
          background: 'var(--primary)', color: '#fff',
          borderRadius: 12, fontSize: 13, fontWeight: 600,
          textDecoration: 'none',
        }}>← Back to Login</a>
      </div>
    </div>
  );
}
