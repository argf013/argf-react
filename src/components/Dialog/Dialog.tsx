import React, { useState, useEffect } from 'react';
import { XIcon } from '@primer/octicons-react';

interface DialogProps {
  /**
   * Sets the header of the dialog.
   */
  header: string;

  /**
   * Sets the content of the dialog.
   * e.g. <p>Hello this is dialog body</p>
   */
  children: React.ReactNode;

  /**
   * Controls whether the dialog is visible or not.
   */
  visible: boolean;

  /**
   * Sets the size of the dialog.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Sets the icon of the dialog.
   */
  icon?: React.ReactNode;

  /**
   * Sets the severity of the dialog.
   * @default 'info'
   */
  severity?: 'info' | 'danger' | 'warning';

  /**
   * Controls whether the dialog can be closed by the user.
   * @default
   * true
   */
  closeable?: boolean;

  /**
   * Callback function that is called when the dialog is closed.
   */
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  header,
  children,
  visible,
  onClose,
  size = 'medium',
  icon,
  severity = 'info',
  closeable = true,
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setTimeout(() => {
        setAnimate(true);
      }, 10);
    } else {
      setAnimate(false);
      setIsClosing(true);
      setTimeout(() => {
        setShow(false);
        setIsClosing(false);
      }, 300);
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeable) {
        onClose();
      }
    };

    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, closeable, onClose]);

  const sizeClasses = {
    small: 'argf-w-1/4 argf-min-w-[15em]',
    medium: 'argf-w-1/3 argf-min-w-[20em]',
    large: 'argf-w-1/2 argf-min-w-[30em]',
  };

  const severityClasses = {
    info: 'argf-text-primary',
    danger: 'argf-text-danger',
    warning: 'argf-text-warning',
  };

  return (
    <>
      {(show || isClosing) && (
        <div
          className={`argf-fixed argf-z-50 argf-inset-0 argf-flex argf-items-center argf-justify-center argf-backdrop-blur argf-transition-all argf-transform argf-transition-opacity argf-duration-300 argf-ease-in-out ${animate ? 'argf-opacity-100' : 'argf-opacity-0'}`}
        >
          <div
            className={`argf-bg-gray-50 argf-box-border argf-px-6 argf-py-5 argf-rounded-lg argf-shadow-lg ${sizeClasses[size]} argf-transform argf-transition-transform argf-duration-300 argf-ease-in-out ${animate ? 'argf-scale-100' : 'argf-scale-95'}`}
          >
            <div
              className={`argf-rounded-t-lg argf-flex argf-justify-between argf-items-center ${severityClasses[severity as 'info' | 'danger' | 'warning']}`}
            >
              <div className='argf-flex argf-items-center'>
                {icon && <div className='argf-mr-2 argf-flex argf-items-center'>{icon}</div>}
                <h2 className='argf-text-lg argf-font-semibold argf-flex argf-items-center argf-m-0 argf-p-0'>
                  {header}
                </h2>
              </div>
              {closeable && (
                <button
                  type='button'
                  onClick={onClose}
                  className='argf-bg-transparent argf-border-0 argf-outline-none argf-text-slate-700 argf-flex argf-items-center hover:argf-bg-gray-200 argf-p-2 argf-rounded-full argf-cursor-pointer'
                >
                  <XIcon />
                </button>
              )}
            </div>
            <div className='argf-text-left argf-pt-2'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
