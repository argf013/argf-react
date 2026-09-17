import React from 'react';
import clsx from 'clsx';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  ...props
}) => {
  const variantClasses = {
    text: 'argf-h-4 argf-w-full argf-rounded',
    circular: 'argf-rounded-full',
    rectangular: 'argf-rounded-none',
    rounded: 'argf-rounded-xl',
  };

  const animationClasses = {
    pulse: 'argf-animate-pulse argf-bg-slate-200',
    wave: 'argf-relative argf-overflow-hidden argf-bg-slate-200 before:argf-absolute before:argf-inset-0 before:-argf-translate-x-full before:argf-animate-[shimmer_1.5s_infinite] before:argf-bg-gradient-to-r before:argf-from-transparent before:argf-via-white/50 before:argf-to-transparent',
    none: 'argf-bg-slate-200',
  };

  const computedStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div
      aria-hidden='true'
      style={computedStyle}
      className={clsx(
        'argf-box-border',
        variantClasses[variant],
        animationClasses[animation],
        className,
      )}
      {...props}
    />
  );
};

export default Skeleton;
