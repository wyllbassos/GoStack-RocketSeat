import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('addToast');
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
    </toastContext.Provider>
  );
};

export const useToast = (): ToastContextData => {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error('useToast must be used withn a ToastProvider');
  }

  return context;
};
