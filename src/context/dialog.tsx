'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogContextValue, DialogOptions } from '@/types';

const DialogContext = React.createContext<DialogContextValue | undefined>(
  undefined
);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<DialogOptions>({});

  const openDialog = (opts: DialogOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);
  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            {options.title && <DialogTitle>{options.title}</DialogTitle>}
            {options.desc && (
              <DialogDescription>{options.desc}</DialogDescription>
            )}
          </DialogHeader>

          {options.content && <div className='py-2'>{options.content}</div>}

          {options.footer && <DialogFooter>{options.footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export function useDialog() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used inside <DialogProvider>');
  return ctx;
}
