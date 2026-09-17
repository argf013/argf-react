import React from 'react';
import clsx from 'clsx';

type Severity = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

interface ButtonProps {
  /**
   *  Set the button severity
   */
  severity?: Severity;

  /* Button label */
  label: string;

  /**
   * Callback function when button is clicked
   */
  onClick?: () => void;

  /**
   * Set button radius. When `true`, the button will be rounded.
   * @type {boolean}
   * @default true
   */
  rounded?: boolean;

  /**
   * Button icon
   * @type {React.ReactNode}
   * e.g. <InfoIcon />
   */
  icon?: React.ReactNode;

  /**
   * Additional styles for the button
   */
  style?: React.CSSProperties;

  /**
   * Additional class names for the button
   */
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  severity,
  label,
  onClick,
  rounded,
  icon,
  style,
  className,
}) => {
  const getButtonClass = (severity: string) => {
    const baseClass =
      'argf-text-white argf-font-medium argf-text-[14px] argf-px-5 argf-py-2.5 argf-inline-block';
    const roundedClass = rounded ? 'argf-rounded-full' : 'argf-rounded-md';
    switch (severity) {
      case 'primary':
        return `${baseClass} ${roundedClass} argf-bg-primary hover:argf-bg-primary-hover`;
      case 'secondary':
        return `${baseClass} ${roundedClass} argf-bg-secondary hover:argf-bg-secondary-hover`;
      case 'danger':
        return `${baseClass} ${roundedClass} argf-bg-danger hover:argf-bg-danger-hover`;
      case 'warning':
        return `${baseClass} ${roundedClass} argf-bg-warning hover:argf-bg-warning-hover`;
      case 'success':
        return `${baseClass} ${roundedClass} argf-bg-success hover:argf-bg-success-hover`;
      default:
        return baseClass;
    }
  };

  return (
    <button
      className={clsx(
        'argf-border-0 argf-outline-none',
        getButtonClass(severity as Severity),
        'argf-flex argf-flex-row argf-items-center',
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {icon && <span className='argf-mr-2'>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
