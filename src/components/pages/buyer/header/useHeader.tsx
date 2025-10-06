'use client';

import React, { createContext, useContext } from 'react';

type HeaderContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderContext = createContext<HeaderContextType | null>(null);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <HeaderContext.Provider value={{ open, setOpen }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    return {
      setOpen: () => {},
      open: false,
    };
  }

  return context;
};
