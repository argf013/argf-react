import React from 'react';
import clsx from 'clsx';
import { XIcon } from '@primer/octicons-react';

export type BadgeSeverity = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps {
  /**
   * Badge label text
   */
  label: string;

  /**
   * Visual severity level
   * @default 'primary'
   */
  severity?: BadgeSeverity;

  /**
   * Visual style variant
   * @default 'soft'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: BadgeSize;

  /**
   * Optional leading icon
   */
  icon?: React.ReactNode;

  /**
   * If true, displays a status indicator dot
   * @default false
   */
  dot?: boolean;

  /**
   * If provided, makes the badge removable with a close button
   */
  onRemove?: () => void;

  /**
   * Additional custom CSS classes
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  severity = 'primary',
  variant = 'soft',
  size = 'medium',
  icon,
  dot = false,
  onRemove,
  className,
  style,
}) => {
  const sizeClasses: Record<BadgeSize, string> = {
    small: 'argf-text-[11px] argf-px-2 argf-py-0.5 argf-gap-1',
    medium: 'argf-text-xs argf-px-2.5 argf-py-0.5 argf-gap-1.5',
    large: 'argf-text-sm argf-px-3 argf-py-1 argf-gap-2',
  };

  const dotSizeClasses: Record<BadgeSize, string> = {
    small: 'argf-w-1.5 argf-h-1.5',
    medium: 'argf-w-2 argf-h-2',
    large: 'argf-w-2.5 argf-h-2.5',
  };

  const variantSeverityClasses: Record<BadgeVariant, Record<BadgeSeverity, string>> = {
    solid: {
      primary: 'argf-bg-primary argf-text-white',
      secondary: 'argf-bg-secondary argf-text-white',
      success: 'argf-bg-success argf-text-white',
      danger: 'argf-bg-danger argf-text-white',
      warning: 'argf-bg-warning argf-text-white',
      info: 'argf-bg-sky-600 argf-text-white',
    },
    soft: {
      primary: 'argf-bg-blue-50 argf-text-blue-700 argf-border argf-border-solid argf-border-blue-200/60',
      secondary: 'argf-bg-gray-100 argf-text-gray-700 argf-border argf-border-solid argf-border-gray-200/70',
      success: 'argf-bg-emerald-50 argf-text-emerald-700 argf-border argf-border-solid argf-border-emerald-200/60',
      danger: 'argf-bg-rose-50 argf-text-rose-700 argf-border argf-border-solid argf-border-rose-200/60',
      warning: 'argf-bg-amber-50 argf-text-amber-800 argf-border argf-border-solid argf-border-amber-200/60',
      info: 'argf-bg-sky-50 argf-text-sky-700 argf-border argf-border-solid argf-border-sky-200/60',
    },
    outline: {
      primary: 'argf-bg-transparent argf-text-primary argf-border argf-border-solid argf-border-primary',
      secondary: 'argf-bg-transparent argf-text-secondary argf-border argf-border-solid argf-border-secondary',
      success: 'argf-bg-transparent argf-text-success argf-border argf-border-solid argf-border-success',
      danger: 'argf-bg-transparent argf-text-danger argf-border argf-border-solid argf-border-danger',
      warning: 'argf-bg-transparent argf-text-warning argf-border argf-border-solid argf-border-warning',
      info: 'argf-bg-transparent argf-text-sky-600 argf-border argf-border-solid argf-border-sky-600',
    },
  };

  const dotColorClasses: Record<BadgeSeverity, string> = {
    primary: 'argf-bg-primary',
    secondary: 'argf-bg-secondary',
    success: 'argf-bg-success',
    danger: 'argf-bg-danger',
    warning: 'argf-bg-warning',
    info: 'argf-bg-sky-500',
  };

  return (
    <span
      style={style}
      className={clsx(
        'argf-box-border argf-inline-flex argf-items-center argf-justify-center argf-font-medium argf-rounded-full argf-select-none argf-transition-colors',
        sizeClasses[size],
        variantSeverityClasses[variant][severity],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            'argf-rounded-full argf-flex-shrink-0',
            dotSizeClasses[size],
            variant === 'solid' ? 'argf-bg-white' : dotColorClasses[severity],
          )}
        />
      )}

      {icon && <span className='argf-flex-shrink-0 argf-flex argf-items-center'>{icon}</span>}

      <span>{label}</span>

      {onRemove && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className='argf-border-0 argf-bg-transparent hover:argf-opacity-75 focus:argf-outline-none argf-p-0.5 argf-rounded-full argf-inline-flex argf-items-center argf-justify-center argf-ml-0.5 argf-cursor-pointer'
          aria-label={`Remove ${label}`}
        >
          <XIcon size={size === 'small' ? 10 : 12} />
        </button>
      )}
    </span>
  );
};

export default Badge;
