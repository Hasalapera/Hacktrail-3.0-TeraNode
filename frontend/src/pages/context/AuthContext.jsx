import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { AuthContext } from './authContext.js';

// Global authentication state eka manage karana provider component eka
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Token ekak thiyenawada? Ehenam api eken verify karanna one nisa loading true
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

  // App eka load wena gaman localStorage eken token eka ganna
  // token ekak thiyenawada /api/auth/me eken user eka verify karala ganna
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    let active = true;
    api
      .get('/auth/me')
      .then((res) => {
        if (active) setUser(res.data.user);
      })
      .catch(() => {
        // Token eka invalid/expired wela nam clear karanna
        if (active) {
          localStorage.removeItem('token');
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Login wena eka - token eka localStorage eke save karala user state set karanna
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const updateUser = (userData) => {
    setUser((currentUser) => ({ ...currentUser, ...userData }));
  };

  // Logout - token eka remove karala user state eka clear karanna
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
