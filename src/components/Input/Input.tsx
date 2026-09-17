import React, { useState } from 'react';

interface InputProps {
  /**
   * Type of the input field
   */
  type: string;

  /**
   * Placeholder text for the input field
   * @default ''
   */
  placeholder?: string;

  /**
   * Value of the input field
   */
  value: string;

  /**
   * Callback function that is called when the input value changes
   * @param event - The event object
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Size of the input field
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Label for the input field
   */
  label?: string;

  /**
   * Set the input field to disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom styles for the input field
   */
  style?: React.CSSProperties;

  /**
   * Custom class name for the input field
   */
  className?: string;

  /**
   * Set the input field to required
   * @default false
   */
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder = 'Type something...',
  value,
  onChange,
  size = 'medium',
  label,
  disabled = false,
  style,
  className = '',
  required = false,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  let sizeClass = '';

  switch (size) {
    case 'small':
      sizeClass = 'argf-px-2 argf-py-1 argf-text-sm argf-max-w-[10em]';
      break;
    case 'medium':
      sizeClass = 'argf-px-4 argf-py-2 argf-text-sm argf-font-medium argf-max-w-[15em]';
      break;
    case 'large':
      sizeClass = 'argf-px-6 argf-py-3 argf-text-lg argf-max-w-[20em]';
      break;
    default:
      sizeClass = 'argf-px-4 argf-py-2 argf-text-base argf-max-w-[15em]';
  }

  const handleBlur = () => {
    setIsTouched(true);
  };

  const borderClass =
    required && isTouched && !value ? 'argf-border-danger' : 'argf-border-gray-300';

  return (
    <div className='argf-box-border'>
      {label && (
        <label htmlFor={label} className='argf-block argf-mb-[0.5px] argf-text-sm argf-text-slate-700'>
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        disabled={disabled}
        style={style}
        className={`${sizeClass} argf-box-border argf-border argf-border-solid focus:argf-outline-gray-700 ${borderClass} argf-rounded-md argf-bg-white argf-text-slate-900 ${className}`}
        required={required}
      />
    </div>
  );
};

export default Input;
