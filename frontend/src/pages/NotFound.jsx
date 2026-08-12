import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-mid) 100%)',
      padding: '24px',
    }}>
      <div style={{
        background: 'var(--white)', borderRadius: 24,
        padding: '56px 44px', textAlign: 'center',
        maxWidth: 400, width: '100%',
        boxShadow: 'var(--shadow-lg)',
      }} className="fade-up">

        {/* Icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'var(--accent-soft)', border: '2px solid var(--accent-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <SearchX size={36} color="var(--primary)" strokeWidth={1.5} />
        </div>

        {/* 404 Number */}
        <div style={{
          fontSize: 72, fontWeight: 900, lineHeight: 1,
          color: 'var(--accent)', letterSpacing: '-0.04em',
          marginBottom: 8,
        }}>404</div>

        <h1 style={{
          fontSize: 20, fontWeight: 800,
          color: 'var(--text-main)', marginBottom: 10,
        }}>
          Page not found
        </h1>

        <p style={{
          fontSize: 14, color: 'var(--text-sub)',
          lineHeight: 1.7, marginBottom: 32,
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 28px',
          background: 'var(--primary)',
          color: '#fff', borderRadius: 12,
          fontSize: 13, fontWeight: 600,
          textDecoration: 'none',
          transition: 'background 0.18s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-mid)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--primary)'}>
          <ArrowLeft size={15} strokeWidth={2.5} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}