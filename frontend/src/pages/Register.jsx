import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setError('');
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Note: me endpoint eken EMPLOYER role users la witharai hadanna puluwan
      // (Students la admin keneku add karanna one)
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'EMPLOYER',
      });

      // Registration success - login page ekata success message eka samaga redirect karanna
      navigate('/login', {
        state: { message: 'Account created successfully. Please sign in.' },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-1 text-center text-2xl font-bold text-gray-800">Create an Employer Account</h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Register your business to post jobs and hire students.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#1A3268] focus:shadow-[0_0_0_3px_rgba(26,50,104,0.1)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#1A3268] focus:shadow-[0_0_0_3px_rgba(26,50,104,0.1)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              className="w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#1A3268] focus:shadow-[0_0_0_3px_rgba(26,50,104,0.1)]"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <span>⚠</span>{error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0D1F4C] py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[#1A3268] hover:shadow-[0_4px_16px_rgba(13,31,76,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-[#1A3268] hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
