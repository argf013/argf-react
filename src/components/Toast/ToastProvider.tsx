import React, { createContext, useState, ReactNode, useCallback } from 'react';
import Toast, { ToastProps } from './Toast';

/**
 * Interface for the Toast context properties.
 * Contains functions to add and remove toasts.
 */
export interface ToastContextProps {
  addToast: (toast: Omit<ToastProps, 'onClose'>) => void;
  removeToast: (id: number) => void;
}

/**
 * Create a context for Toast with undefined as default value.
 */
export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);

/**
 * ToastProvider component to wrap around the part of the app where you want to use toasts.
 * Provides the context value to its children.
 *
 * @param {ReactNode} children - The children components that will have access to the Toast context.
 * @returns {JSX.Element} The provider component with the Toast context.
 */
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: number }>>([]);

  /**
   * Function to remove a toast by its id.
   *
   * @param {number} id - The id of the toast to be removed.
   */
  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Function to add a new toast.
   *
   * @param {Omit<ToastProps, 'onClose'>} toast - The toast properties excluding the onClose function.
   */
  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        ...toast,
        id,
        life: toast.life ?? 3000,
        onClose: () => removeToast(id),
      },
    ]);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className='fixed bottom-0 right-0 p-4 space-y-2 max-w-full w-auto z-50 pointer-events-none [&>*]:pointer-events-auto'>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
