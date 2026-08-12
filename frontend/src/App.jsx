import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
function App() {

import Login            from './pages/Login';
import CompanyRegister  from './pages/CompanyRegister';
import RetailerRegister from './pages/RetailerRegister';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

/* Temporary placeholder for routes not yet built */
function PlaceholderPage({ title }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f2557, #1a3a7c)' }}
         className="flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-sm w-full mx-4">
        <span className="text-5xl block mb-4">🚧</span>
        <h1 className="text-xl font-bold text-slate-800 mb-2">{title}</h1>
        <p className="text-slate-500 text-sm mb-6">This page is under construction.</p>
        <a href="/login" className="inline-block py-3 px-6 rounded-xl font-bold text-white text-sm"
           style={{ background: 'linear-gradient(135deg, #0f2557, #1a3a7c)' }}>
          ← Back to Login
        </a>
      </div>
    </div>
  );
}
