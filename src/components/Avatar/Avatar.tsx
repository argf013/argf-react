import React, { useState } from 'react';
import clsx from 'clsx';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  /**
   * Image URL source for avatar
   */
  src?: string;

  /**
   * Name of the user (used for fallback initials and alt text)
   */
  name?: string;

  /**
   * Size of the avatar
   * @default 'medium'
   */
  size?: AvatarSize;

  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: AvatarShape;

  /**
   * Status dot indicator
   */
  status?: AvatarStatus;

  /**
   * Custom icon element as fallback
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: React.CSSProperties;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColorFromName = (name?: string): string => {
  if (!name) return 'argf-bg-slate-500 argf-text-white';
  const colors = [
    'argf-bg-blue-600 argf-text-white',
    'argf-bg-indigo-600 argf-text-white',
    'argf-bg-purple-600 argf-text-white',
    'argf-bg-emerald-600 argf-text-white',
    'argf-bg-amber-600 argf-text-white',
    'argf-bg-rose-600 argf-text-white',
    'argf-bg-teal-600 argf-text-white',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'medium',
  shape = 'circle',
  status,
  icon,
  className,
  style,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses: Record<AvatarSize, string> = {
    small: 'argf-w-8 argf-h-8 argf-text-xs',
    medium: 'argf-w-10 argf-h-10 argf-text-sm',
    large: 'argf-w-12 argf-h-12 argf-text-base',
    xlarge: 'argf-w-16 argf-h-16 argf-text-lg',
  };

  const shapeClasses: Record<AvatarShape, string> = {
    circle: 'argf-rounded-full',
    rounded: 'argf-rounded-xl',
    square: 'argf-rounded-none',
  };

  const statusDotSizes: Record<AvatarSize, string> = {
    small: 'argf-w-2 argf-h-2',
    medium: 'argf-w-2.5 argf-h-2.5',
    large: 'argf-w-3 argf-h-3',
    xlarge: 'argf-w-3.5 argf-h-3.5',
  };

  const statusColors: Record<AvatarStatus, string> = {
    online: 'argf-bg-emerald-500',
    offline: 'argf-bg-slate-400',
    busy: 'argf-bg-rose-500',
    away: 'argf-bg-amber-500',
  };

  const showImage = src && !hasError;

  return (
    <div className='argf-relative argf-inline-block argf-select-none argf-box-border'>
      <div
        style={style}
        className={clsx(
          'argf-box-border argf-relative argf-flex argf-items-center argf-justify-center argf-font-semibold argf-overflow-hidden argf-flex-shrink-0',
          sizeClasses[size],
          shapeClasses[shape],
          !showImage && getColorFromName(name),
          className,
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            onError={() => setHasError(true)}
            className='argf-w-full argf-h-full argf-object-cover argf-m-0 argf-p-0'
          />
        ) : icon ? (
          <span className='argf-flex argf-items-center argf-justify-center'>{icon}</span>
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={clsx(
            'argf-absolute argf-bottom-0 argf-right-0 argf-rounded-full argf-ring-2 argf-ring-white',
            statusDotSizes[size],
            statusColors[status],
          )}
        />
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  className,
}) => {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const excess = max && total > max ? total - max : 0;

  return (
    <div className={clsx('argf-box-border argf-inline-flex argf-items-center -argf-space-x-2.5', className)}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className='argf-box-border argf-relative argf-inline-flex argf-items-center argf-justify-center argf-ring-2 argf-ring-white argf-rounded-full'
        >
          {child}
        </div>
      ))}
      {excess > 0 && (
        <div className='argf-box-border argf-relative argf-inline-flex argf-items-center argf-justify-center argf-w-10 argf-h-10 argf-rounded-full argf-bg-slate-200 argf-text-slate-700 argf-text-xs argf-font-bold argf-ring-2 argf-ring-white argf-select-none argf-flex-shrink-0'>
          +{excess}
        </div>
      )}
    </div>
  );
};

export default Avatar;
