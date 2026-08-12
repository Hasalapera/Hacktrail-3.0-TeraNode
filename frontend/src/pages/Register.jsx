import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14"
         style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 50%, #15803D 100%)' }}>

      {/* Background orbs */}
      <div className="fixed -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'rgba(74,222,128,0.06)' }} />
      <div className="fixed -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
           style={{ background: 'rgba(34,197,94,0.05)' }} />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg text-lg font-extrabold"
                 style={{ background: '#4ADE80', color: '#0B4D2E' }}>
              U
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">UniLift</span>
              <p className="text-xs" style={{ color: 'rgba(187,247,208,0.7)' }}>Student Opportunity Platform</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl shadow-2xl overflow-hidden" style={{ background: '#ffffff' }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #0B4D2E 0%, #166534 100%)' }}>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                 style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.25)' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#4ADE80' }} />
              New to UniLift?
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mt-2">Create an Account</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(240,253,244,0.60)' }}>
              Choose your account type to get started
            </p>
          </div>

          {/* Account type chooser */}
          <div className="px-8 py-8 space-y-4">
            <p className="text-sm font-semibold mb-6" style={{ color: '#475569' }}>
              I am registering as a:
            </p>

            {/* Student (redirects to login for now) */}
            <Link to="/login"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{ border: '1.5px solid #E2E8F0', background: '#F8FAFB' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#15803D'; e.currentTarget.style.background = '#F0FDF4'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFB'; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                   style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
                🎓
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: '#0F172A' }}>Student</div>
                <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Find internships, part-time jobs & freelance gigs</div>
              </div>
              <span className="text-lg" style={{ color: '#94A3B8' }}>→</span>
            </Link>

            {/* Company */}
            <Link to="/register/company"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{ border: '1.5px solid #E2E8F0', background: '#F8FAFB' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#15803D'; e.currentTarget.style.background = '#F0FDF4'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFB'; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                   style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
                🏛️
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: '#0F172A' }}>Company</div>
                <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Post internships & corporate projects</div>
              </div>
              <span className="text-lg" style={{ color: '#94A3B8' }}>→</span>
            </Link>

            {/* Retailer */}
            <Link to="/register/retailer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{ border: '1.5px solid #4ADE80', background: 'linear-gradient(135deg, rgba(74,222,128,0.08) 0%, rgba(34,197,94,0.05) 100%)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#22C55E'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(74,222,128,0.20)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#4ADE80'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                   style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0' }}>
                🏪
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm flex items-center gap-2" style={{ color: '#0F172A' }}>
                  Local Shop / Retailer
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: '#4ADE80', color: '#0B4D2E' }}>FREE</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>Post part-time jobs for local students</div>
              </div>
              <span className="text-lg" style={{ color: '#22C55E' }}>→</span>
            </Link>

            {/* Sign in link */}
            <div className="pt-2 text-center">
              <p className="text-sm" style={{ color: '#475569' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold hover:underline" style={{ color: '#166534' }}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: 'rgba(240,253,244,0.40)' }}>
          © 2025 UniLift · Empowering Sri Lankan Students
        </p>
      </div>
    </div>
  );
}