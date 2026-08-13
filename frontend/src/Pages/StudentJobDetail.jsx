import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Category tabs — keeps the header consistent with StudentHome
const CATEGORIES = [
  { key: 'job', label: 'Retail Job' },
  { key: 'company', label: 'Company' },
  { key: 'freelancer', label: 'Freelancer' },
];

const THUMBNAILS = [
  'bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400',
  'bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400',
  'bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400',
  'bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500',
  'bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500',
  'bg-gradient-to-br from-cyan-700 via-teal-500 to-lime-500',
];

// Derive a colour from the job id so it stays consistent
function thumbnailForId(id = '') {
  const sum = [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return THUMBNAILS[sum % THUMBNAILS.length];
}

// Format pay nicely
function formatPay(amount, paymentType) {
  const n = Number(amount);
  if (!n) return 'Unpaid / Negotiable';
  const fmt = n.toLocaleString();
  return paymentType === 'DAILY_WAGE' ? `Rs. ${fmt} / day` : `Rs. ${fmt}`;
}

// Derive friendly job type label
function jobTypeLabel(job) {
  if (!job) return '';
  if (job.paymentType === 'DAILY_WAGE') return 'Full-time';
  const match = (job.description || '').match(/Listing type:\s*(Intern|Project)/i);
  if (match) return match[1];
  return 'Part-time';
}

// EmployerType: decide if retail or company
function employerLabel(job) {
  const emp = job.employer || {};
  if (emp.shopName) return emp.shopName;
  if (emp.companyName) return emp.companyName;
  return emp.name || job.category || 'Employer';
}

export default function StudentJobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Apply state
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applyError, setApplyError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    api.get(`/jobs/${id}`)
      .then(res => {
        if (!active) return;
        setJob(res.data?.data || null);
      })
      .catch(err => {
        if (!active) return;
        setError(err.response?.data?.message || 'Unable to load job details. Please try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    setApplyError('');
    try {
      await api.put(`/jobs/${id}/assign`);
      setApplied(true);
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Failed to apply. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  // ── Loading skeleton ────────────────────────────────────────
  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
        <Header
          categories={CATEGORIES}
          activeCategory="job"
          onSelectCategory={() => navigate('/student/home')}
          profileHref="/student/profile"
        />
        <main className="flex flex-1 items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#1A3268]" />
            <p className="text-sm">Loading job details…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────
  if (error || !job) {
    return (
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
        <Header
          categories={CATEGORIES}
          activeCategory="job"
          onSelectCategory={() => navigate('/student/home')}
          profileHref="/student/profile"
        />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">😕</div>
          <p className="text-base font-semibold text-slate-700">{error || 'Job not found.'}</p>
          <button
            onClick={() => navigate('/student/home')}
            className="mt-2 rounded-xl bg-[#0D1F4C] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1A3268]"
          >
            ← Back to listings
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const thumbnail = thumbnailForId(job.id);
  const typeLabel = jobTypeLabel(job);
  const poster = employerLabel(job);
  const pay = formatPay(job.amount, job.paymentType);
  const isOpen = job.status === 'OPEN';

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header
        categories={CATEGORIES}
        activeCategory="job"
        onSelectCategory={() => navigate('/student/home')}
        profileHref="/student/profile"
      />

      <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
        {/* Back */}
        <button
          onClick={() => navigate('/student/home')}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#1A3268]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
          </svg>
          Back to listings
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

          {/* ── Left: Job Details ─────────────────────────────── */}
          <div>
            {/* Hero thumbnail (poster preview) */}
            <div className={`relative mb-6 h-52 w-full overflow-hidden rounded-2xl sm:h-64 ${thumbnail}`}>
              {/* Job type chip */}
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: 'rgba(11,77,46,0.85)', color: '#4ADE80', backdropFilter: 'blur(4px)' }}
              >
                {typeLabel}
              </span>

              {/* Status chip */}
              <span
                className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
                  isOpen ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-200'
                }`}
              >
                {isOpen ? 'Open' : job.status}
              </span>

              {/* Poster name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-8">
                <p className="text-sm font-semibold text-white">{poster}</p>
                {job.city && (
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.city}
                  </p>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {job.title}
            </h1>

            {/* Meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-4 0v2" />
                </svg>
                {typeLabel}
              </span>
              {job.city && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {job.city}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {pay}
              </span>
            </div>

            {/* Divider */}
            <hr className="my-6 border-slate-100" />

            {/* Description */}
            <h2 className="mb-3 text-base font-bold text-slate-800">About this role</h2>
            <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
              {job.description || 'No description provided.'}
            </p>
          </div>

          {/* ── Right: Apply Card ──────────────────────────────── */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
            {/* Pay */}
            <div className="mb-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Pay</p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#0D1F4C]">{pay}</p>
            </div>

            <hr className="mb-5 border-slate-100" />

            {/* Details summary */}
            <div className="mb-6 space-y-3">
              <DetailRow label="Posted by" value={poster} />
              <DetailRow label="Location" value={job.city || 'Sri Lanka'} />
              <DetailRow label="Type" value={typeLabel} />
              <DetailRow label="Status" value={job.status} />
            </div>

            {/* Apply / Success / Error */}
            {applied ? (
              <div className="flex flex-col items-center gap-3 rounded-xl bg-emerald-50 p-5 text-center">
                <span className="text-3xl">🎉</span>
                <p className="font-bold text-emerald-700">Application Sent!</p>
                <p className="text-xs text-emerald-600">The employer will review your profile and reach out soon.</p>
                <button
                  onClick={() => navigate('/student/home')}
                  className="mt-2 w-full rounded-xl bg-[#0D1F4C] py-2.5 text-sm font-bold text-white hover:bg-[#1A3268]"
                >
                  Back to Listings
                </button>
              </div>
            ) : (
              <>
                {!isOpen && (
                  <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-700 font-medium">
                    This position is no longer open.
                  </div>
                )}

                {applyError && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {applyError}
                  </div>
                )}

                <button
                  onClick={handleApply}
                  disabled={applying || !isOpen}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 100%)', boxShadow: '0 4px 16px rgba(11,77,46,0.28)' }}
                >
                  {applying ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Applying…
                    </>
                  ) : (
                    <>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                      Apply for this Job
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-slate-400">
                  By applying you agree to share your UniLift profile with the employer.
                </p>
              </>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Small helper row
function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-semibold text-slate-400">{label}</span>
      <span className="text-right text-xs font-semibold text-slate-700">{value || '—'}</span>
    </div>
  );
}
