import { createContext, useContext } from 'react';

// Auth state eka share karana context eka
// (Component file ekakata hook eka danna ba nisa meka venama file eke thiyenawa - fast refresh)
export const AuthContext = createContext(null);

// AuthContext eka access karanna hook eka
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
