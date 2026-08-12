import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-center px-4">
      <h1 className="text-9xl font-bold text-text-main">404</h1>
      <p className="text-2xl font-semibold text-text-sub mt-4">Oops! Page not found.</p>
      <p className="text-text-muted mt-2 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-mid transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
