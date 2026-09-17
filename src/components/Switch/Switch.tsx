import React from 'react';
import clsx from 'clsx';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps {
  /**
   * Controlled checked state of switch
   */
  checked: boolean;

  /**
   * Change event callback
   */
  onChange: (checked: boolean) => void;

  /**
   * Optional label displayed alongside the switch
   */
  label?: string;

  /**
   * Optional helper text displayed under the label
   */
  description?: string;

  /**
   * Position of the label relative to the switch toggle
   * @default 'right'
   */
  labelPlacement?: 'left' | 'right';

  /**
   * Size of the switch
   * @default 'medium'
   */
  size?: SwitchSize;

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional name attribute for forms
   */
  name?: string;

  /**
   * Additional custom CSS classes for the container
   */
  className?: string;

  /**
   * Custom inline styles for the container
   */
  style?: React.CSSProperties;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  labelPlacement = 'right',
  size = 'medium',
  disabled = false,
  name,
  className,
  style,
}) => {
  const toggleTrackSizes: Record<SwitchSize, string> = {
    small: 'argf-w-8 argf-h-4',
    medium: 'argf-w-11 argf-h-6',
    large: 'argf-w-14 argf-h-7',
  };

  const toggleThumbSizes: Record<SwitchSize, string> = {
    small: 'argf-w-3 argf-h-3',
    medium: 'argf-w-5 argf-h-5',
    large: 'argf-w-6 argf-h-6',
  };

  const translateClasses: Record<SwitchSize, string> = {
    small: checked ? 'argf-translate-x-4' : 'argf-translate-x-0.5',
    medium: checked ? 'argf-translate-x-5' : 'argf-translate-x-0.5',
    large: checked ? 'argf-translate-x-7' : 'argf-translate-x-0.5',
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const textElement = (label || description) && (
    <div className='argf-flex argf-flex-col argf-select-none'>
      {label && (
        <span
          className={clsx(
            'argf-text-sm argf-font-medium',
            disabled ? 'argf-text-slate-400' : 'argf-text-slate-800',
          )}
        >
          {label}
        </span>
      )}
      {description && (
        <span className='argf-text-xs argf-text-slate-500 argf-mt-0.5'>{description}</span>
      )}
    </div>
  );

  return (
    <label
      style={style}
      className={clsx(
        'argf-box-border argf-inline-flex argf-items-center argf-gap-3',
        disabled ? 'argf-cursor-not-allowed argf-opacity-60' : 'argf-cursor-pointer',
        className,
      )}
    >
      {labelPlacement === 'left' && textElement}

      <button
        type='button'
        role='switch'
        aria-checked={checked}
        disabled={disabled}
        name={name}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={clsx(
          'argf-border-0 argf-p-0 argf-relative argf-inline-flex argf-flex-shrink-0 argf-items-center argf-rounded-full argf-transition-colors argf-duration-200 argf-ease-in-out focus:argf-outline-none focus:argf-ring-2 focus:argf-ring-blue-500/30 argf-cursor-pointer',
          toggleTrackSizes[size],
          checked ? 'argf-bg-primary' : 'argf-bg-slate-300',
        )}
      >
        <span
          className={clsx(
            'argf-pointer-events-none argf-inline-block argf-transform argf-rounded-full argf-bg-white argf-shadow-sm argf-ring-0 argf-transition-transform argf-duration-200 argf-ease-in-out',
            toggleThumbSizes[size],
            translateClasses[size],
          )}
        />
      </button>

      {labelPlacement === 'right' && textElement}
    </label>
  );
};

export default Switch;
