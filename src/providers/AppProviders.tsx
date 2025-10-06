'use client';

import { AuthProvider } from '@/context/auth';
import { DialogProvider } from '@/context/dialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DialogProvider>{children}</DialogProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
