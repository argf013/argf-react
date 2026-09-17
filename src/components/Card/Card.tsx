import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'default' | 'outline' | 'flat';
  hoverable?: boolean;
  className?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className,
  ...props
}) => {
  const variantClasses = {
    default: 'argf-bg-white argf-border argf-border-solid argf-border-slate-200/90 argf-shadow-sm',
    outline: 'argf-bg-transparent argf-border argf-border-solid argf-border-slate-200',
    flat: 'argf-bg-slate-50 argf-border-0',
  };

  return (
    <div
      className={clsx(
        'argf-box-border argf-rounded-xl argf-text-slate-800 argf-transition-all argf-duration-200 argf-overflow-hidden',
        variantClasses[variant],
        hoverable && 'hover:argf-shadow-md hover:-argf-translate-y-0.5 argf-cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('argf-box-border argf-px-6 argf-pt-6 argf-pb-2 argf-flex argf-flex-col argf-gap-1', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={clsx('argf-m-0 argf-p-0 argf-border-0 argf-font-semibold argf-text-lg argf-text-slate-900 argf-tracking-tight argf-leading-none', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={clsx('argf-m-0 argf-p-0 argf-text-xs argf-text-slate-500 argf-leading-relaxed argf-mt-0.5', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('argf-box-border argf-px-6 argf-py-4 argf-text-sm argf-leading-relaxed argf-text-slate-600', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'argf-box-border argf-px-6 argf-py-4 argf-bg-slate-50/50 argf-border-t argf-border-solid argf-border-slate-100 argf-flex argf-items-center argf-justify-between argf-text-xs',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
