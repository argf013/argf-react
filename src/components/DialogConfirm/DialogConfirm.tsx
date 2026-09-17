import { Tooltip } from 'react-tooltip';
import React, { useEffect, useCallback } from 'react';
import Dialog from '../Dialog/Dialog';
import { InfoIcon, AlertFillIcon } from '@primer/octicons-react';

interface DialogConfirmProps {
  /**
   *  Set the dialog header text
   *  e.g. 'Delete item'
   */
  header: string;

  /**
   *  Set the dialog message
   *  e.g. 'Are you sure you want to delete this item?'
   */
  message: string;

  /**
   *  Set the dialog items
   *  you can pass items as an array of strings
   *  e.g. ['item1', 'item2']
   */
  items?: string[];

  /**
   *  Set the dialog severity
   *  @default 'info'
   */
  severity?: 'info' | 'warning' | 'danger';

  /**
   *  Callback function to cancel the dialog
   *  e.g. () => setOpen(false)
   */
  onCancel: () => void;

  /**
   *  Callback function to submit the dialog
   *  e.g. () => setOpen(false)
   */
  onSubmit: () => void;

  /**
   *  Set the dialog submit label
   *  @default 'Submit'
   *  e.g. submitLabel='Delete'
   */
  submitLabel?: string;

  /**
   *  Set the dialog cancel label
   *  @default 'Cancel'
   *  e.g. cancelLabel='Cancel'
   */
  cancelLabel?: string;

  /**
   *  Controls whether the dialog is visible or not
   *  @default false
   *  e.g. visible={true}
   */
  visible: boolean;

  /**
   *  Controls whether the dialog header icon is visible or not
   *  @default true
   *  e.g. headerIcon={false}
   */
  headerIcon?: boolean;
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  header,
  message,
  items,
  severity = 'info',
  onCancel,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  visible,
  headerIcon = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onCancel]);

  const getButtonClass = useCallback(
    (severity: 'info' | 'warning' | 'danger') => {
      switch (severity) {
        case 'warning':
          return 'argf-bg-warning hover:argf-bg-warning-hover argf-text-white hover:argf-text-gray-100';
        case 'danger':
          return 'argf-bg-danger hover:argf-bg-danger-hover argf-text-white hover:argf-text-gray-100';
        default:
          return 'argf-bg-primary hover:argf-bg-primary-hover argf-text-white hover:argf-text-gray-100';
      }
    },
    [],
  );

  const getIcon = useCallback(
    (severity: 'info' | 'warning' | 'danger') => {
      if (!headerIcon) return null;
      switch (severity) {
        case 'warning':
        case 'danger':
          return <AlertFillIcon />;
        default:
          return <InfoIcon />;
      }
    },
    [headerIcon],
  );

  return (
    <Dialog
      icon={getIcon(severity)}
      header={header}
      visible={visible}
      onClose={onCancel}
      severity={severity}
      closeable={false}
    >
      <div>
        <span>{message}</span>
        <ul className='argf-list-none argf-m-0 argf-px-2 argf-py-2'>
          {items?.map((item, index) => (
            <li key={index} className='argf-truncate argf-max-w-xs argf-m-0 argf-p-0'>
              <span>&#8226; </span>
              <span
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={item}
              >
                {item}
              </span>
              <Tooltip id={`tooltip-${index}`} place='top' />
            </li>
          ))}
        </ul>
        <div className='argf-flex argf-justify-end argf-gap-2 argf-mt-4'>
          <button
            type='button'
            onClick={onCancel}
            className='argf-border-0 argf-outline-none argf-bg-transparent hover:argf-bg-gray-200 argf-py-2 argf-px-5 argf-rounded-full argf-cursor-pointer'
          >
            {cancelLabel}
          </button>
          <button
            type='button'
            onClick={onSubmit}
            className={`argf-border-0 argf-outline-none ${getButtonClass(severity)} argf-py-2 argf-px-5 argf-rounded-full argf-cursor-pointer`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogConfirm;
