'use client';

import React, { createContext, useContext } from 'react';
import { api } from '@/api';
import { TokenType, UserType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

type AuthContextType = {
  user: UserType | null;
  token: TokenType | null;
  setUser: (payload: { user: UserType; token: TokenType | null }) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserType | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('auth_user') || 'null');
    } catch {
      return null;
    }
  });

  const [token, setToken] = React.useState<TokenType | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  });

  const queryClient = useQueryClient();

  const setAuth = (payload: { user: UserType; token: string | null }) => {
    setUser(payload.user);
    setToken(payload.token);

    if (typeof window !== 'undefined') {
      if (payload.token) localStorage.setItem('access_token', payload.token);
      localStorage.setItem('auth_user', JSON.stringify(payload.user));
    }
  };

  React.useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
    queryClient.clear(); // clear react-query cache on logout
  };

  const val = {
    user,
    setUser: setAuth,
    clearAuth,
    token,
  };

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
