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
    small: 'w-1/4 min-w-[15em]',
    medium: 'w-1/3 min-w-[20em]',
    large: 'w-1/2 min-w-[30em]',
  };

  const severityClasses = {
    info: 'text-primary',
    danger: 'text-danger',
    warning: 'text-warning',
  };

  return (
    <>
      {(show || isClosing) && (
        <div
          className={`fixed z-50 inset-0 flex items-center justify-center backdrop-blur transition-all transform transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className={`bg-gray-50 px-6 py-5 rounded-lg shadow-lg ${sizeClasses[size]} transform transition-transform duration-300 ease-in-out ${animate ? 'scale-100' : 'scale-95'}`}
          >
            <div
              className={`rounded-t-lg flex justify-between items-center ${severityClasses[severity as 'info' | 'danger' | 'warning']}`}
            >
              <div className='flex items-center'>
                {icon && <div className='mr-2 flex items-center'>{icon}</div>}
                <h2 className='text-lg font-semibold flex items-center'>
                  {header}
                </h2>
              </div>
              {closeable && (
                <button
                  onClick={onClose}
                  className='text-dark flex items-center hover:bg-gray-200 p-2 rounded-full'
                >
                  <XIcon />
                </button>
              )}
            </div>
            <div className='text-left pt-2'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
