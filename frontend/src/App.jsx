// ============================================================
// App.jsx — UniLift Route Configuration
// BrowserRouter is already wrapped in main.jsx
// ============================================================
import { Routes, Route, Navigate } from 'react-router-dom';

// ── Auth & Onboarding pages (hass branch) ──────────────────
import Login from './pages/Login';
import Register from './pages/Register';
import CompanyRegister from './pages/CompanyRegister';
import RetailerRegister from './pages/RetailerRegister';
import NotFound from './pages/NotFound';

// ── Student & Publisher pages (Rasara branch) ──────────────
import StudentHome from './pages/StudentHome';
import RetailJobPublisher from './pages/RetailJobPublisher';
import CompanyJobPublisher from './pages/CompanyJobPublisher';
import FreelancerClient from './pages/FreelancerClient';

export default function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/student/home" replace />} />

      {/* ── Auth routes ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/company" element={<CompanyRegister />} />
      <Route path="/register/retailer" element={<RetailerRegister />} />

      {/* ── Student routes (Rasara branch — add here as built) ── */}
      <Route path="/student/home" element={<StudentHome />} />
      <Route path="/student/freelance" element={<FreelancerClient />} />

      {/* ── Publisher routes (Rasara branch — add here as built) ── */}
      <Route path="/retail/jobs" element={<RetailJobPublisher />} />
      <Route path="/company/jobs" element={<CompanyJobPublisher />} />

      {/* ── Placeholder routes (unlock as pages are built) ── */}
      <Route path="/change-password" element={<PlaceholderPage title="Change Password" />} />
      <Route path="/complete-profile" element={<PlaceholderPage title="Complete Your Profile" />} />
      <Route path="/dashboard" element={<PlaceholderPage title="Dashboard 🚀" />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* ── Under-construction placeholder ───────────────────────── */
function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0D1F4C] to-[#1A3268] p-6">
      <div className="w-full max-w-[360px] rounded-[20px] bg-white p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
        <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[18px] border-2 border-[#E4E9F2] bg-[#FEF3C7] text-[40px]">
          🚧
        </div>
        <h1 className="mb-2 text-lg font-extrabold text-gray-900">
          {title}
        </h1>
        <p className="mb-7 text-[13.5px] text-gray-500">
          This page is under construction.
        </p>
        <a
          href="/student/home"
          className="inline-block rounded-xl bg-[#0D1F4C] px-6 py-2.5 text-[13px] font-semibold text-white no-underline"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
