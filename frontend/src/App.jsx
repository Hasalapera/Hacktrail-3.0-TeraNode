
// ============================================================
// App.jsx — UniLift Route Configuration
// BrowserRouter is already wrapped in main.jsx
// ============================================================
import { Routes, Route } from 'react-router-dom';
import MessageButton from './Components/MessageButton.jsx';
import LandingPage from './pages/LandingPage';

// ── Auth & Onboarding pages (hass branch) ──────────────────
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/management/user/AddUser'; // The page with the form
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

import StudentHome from './pages/StudentHome';
import CompanyRegister from './pages/CompanyRegister';
import RetailerRegister from './pages/RetailerRegister';
import NotFound from './pages/NotFound';

// ── Student & Publisher pages (Rasara branch) ──────────────
import RetailJobPublisher from './pages/RetailJobPublisher';
import CompanyJobPublisher from './pages/CompanyJobPublisher';

import FreelancerClient    from './pages/FreelancerClient';
import RetailProfile       from './pages/RetailProfile';
import CompanyProfile      from './pages/CompanyProfile';
import FreelancerProfile   from './pages/FreelancerProfile';
import StudentProfile      from './pages/StudentProfile';

export default function App() {
  return (
    <>
      <Routes>
        {/* Landing page */}
        <Route path="/"  element={<LandingPage />} />

        {/* ── Auth routes ── */}
        <Route path="/login"              element={<Login />} />
        <Route path="/register"           element={<Register />} />
        <Route path="/register/company"   element={<CompanyRegister />} />
        <Route path="/register/retailer"  element={<RetailerRegister />} />

        {/* ── Student routes (Rasara branch — add here as built) ── */}
        <Route path="/student/home"       element={<StudentHome />} />
        <Route path="/student/freelance"  element={<FreelancerClient />} />
        <Route path="/student/profile"    element={<StudentProfile />} />

        {/* ── Publisher routes (Rasara branch — add here as built) ── */}
        <Route path="/retail/jobs"        element={<RetailJobPublisher />} />
        <Route path="/company/jobs"       element={<CompanyJobPublisher />} />

        {/* ── Publisher profile pages ── */}
        <Route path="/retail/profile"     element={<RetailProfile />} />
        <Route path="/company/profile"    element={<CompanyProfile />} />
        <Route path="/freelancer/profile" element={<FreelancerProfile />} />

        {/* ── Placeholder routes (unlock as pages are built) ── */}
        <Route path="/change-password"    element={<PlaceholderPage title="Change Password" />} />
        <Route path="/complete-profile"   element={<PlaceholderPage title="Complete Your Profile" />} />
        <Route path="/dashboard"          element={<PlaceholderPage title="Dashboard 🚀" />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <MessageButton />
    </>
  );
}

/* ── Under-construction placeholder ───────────────────────── */
function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-primary-mid p-6">
      <div className="w-full max-w-[360px] rounded-[20px] bg-white p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
        <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[18px] border-2 border-accent-border bg-accent-soft text-[40px]">
          🚧
        </div>
        <h1 className="mb-2 text-lg font-extrabold text-text-main">
          {title}
        </h1>
        <p className="mb-7 text-[13.5px] text-text-sub">
          This page is under construction.
        </p>
        <a
          href="/student/home"
          className="inline-block rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-white no-underline"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
