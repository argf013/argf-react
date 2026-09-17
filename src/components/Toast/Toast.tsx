import {
  AlertFillIcon,
  CheckCircleFillIcon,
  XCircleFillIcon,
  XIcon,
} from '@primer/octicons-react';
import React, { useEffect, useState } from 'react';

export type Severity = 'error' | 'success' | 'warning';

export interface ToastProps {
  message?: string;
  severity: Severity;
  life?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  severity,
  life = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, life);
    return () => clearTimeout(timer);
  }, [life, onClose]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const severityClasses = {
    error: 'argf-bg-danger argf-text-white',
    success: 'argf-bg-success argf-text-white',
    warning: 'argf-bg-warning argf-text-white',
  };

  const severityIcons = {
    error: <XCircleFillIcon />,
    success: <CheckCircleFillIcon />,
    warning: <AlertFillIcon />,
  };

  return (
    <div
      className={`argf-box-border argf-relative argf-px-3 argf-py-2 argf-flex argf-flex-row argf-items-center argf-gap-2 argf-rounded-lg argf-w-[20em] argf-text-[14px] argf-shadow-md argf-transform argf-transition-all argf-duration-300 argf-ease-in-out 
        ${isVisible && !isClosing ? 'argf-translate-y-0 argf-opacity-100' : 'argf-translate-y-5 argf-opacity-0'}
        ${severityClasses[severity]}`}
    >
      <span className='argf-flex argf-items-center'>{severityIcons[severity]}</span>
      <span className='argf-flex-1'>{message}</span>
      <button
        type='button'
        className='argf-border-0 argf-outline-none argf-bg-transparent argf-cursor-pointer argf-text-white/80 hover:argf-text-white argf-flex argf-items-center argf-p-1 argf-rounded'
        onClick={handleClose}
        aria-label='Close toast'
      >
        <XIcon />
      </button>
    </div>
  );
};

export default Toast;
