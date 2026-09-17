import { ChevronDownIcon } from '@primer/octicons-react';
import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import clsx from 'clsx';

interface Option {
  /**
   * Label to be displayed in the dropdown
   */
  label: string;

  /**
   * Value to be passed when the option is selected
   */
  value: string;
}

interface DropdownProps {
  /**
   * Options to be displayed in the dropdown
   * e.g. 
   * [
   *  {
   *    label: 'Option 1',
   *    value: 'option1'
   *  },
   *  {  
   *    label: 'Option 2',
   *    value: 'option2'
   *  }
   * ]
   */
  options: Option[];

  /**
   * Callback function to be called when an option is selected
   * e.g. (option) => alert(option.label)
   */
  onSelect: (option: Option) => void;

  /**
   * Placeholder text to be displayed when no option is selected
   * @default 'Select an option'
   */
  placeholder?: string;

  /**
   * Size of the dropdown
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;

  /**
   * Initial value to be displayed in the dropdown
   */
  initialValue?: Option;

  /**
   * Custom styles to be applied to the dropdown
   * e.g. { width: '200px', height: '300px' }
   */
  style?: CSSProperties;

  /**
   * Custom class name to be applied to the dropdown
   */
  className?: string;

  /**
   * If true, the dropdown will be searchable
   * @default false
   */
  isSearchable?: boolean;

  /**
   * Custom class name to be applied to the label
   */
  labelClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = 'Select an option',
  size = 'medium',
  disabled = false,
  initialValue,
  style,
  className,
  isSearchable = false,
  labelClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialValue || null,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [maxHeight, setMaxHeight] = useState('0px');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setMaxHeight(isOpen ? '0px' : '300px');
    }
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
    setSearchTerm('');
    setMaxHeight('0px');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchTerm('');
      setMaxHeight('0px');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
      setMaxHeight('0px');
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sizeClass =
    size === 'small' ? 'argf-w-32' : size === 'large' ? 'argf-w-64' : 'argf-w-48';

  return (
    <div
      ref={dropdownRef}
      className={clsx('argf-relative argf-inline-block argf-text-left argf-box-border', sizeClass, className)}
      style={style}
    >
      <button
        type='button'
        onClick={handleToggle}
        className={clsx(
          'argf-inline-flex argf-items-center argf-gap-2 argf-justify-start argf-box-border argf-outline-none',
          sizeClass,
          'argf-rounded-md argf-border argf-border-solid argf-border-gray-300 argf-px-4 argf-py-2 argf-bg-white argf-text-sm argf-font-medium argf-text-gray-700 hover:argf-bg-gray-50 argf-cursor-pointer',
          { 'argf-cursor-not-allowed argf-opacity-50': disabled },
        )}
        disabled={disabled}
      >
        <span
          className={clsx({ 'argf-text-gray-400': !selectedOption }, labelClassName)}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon className='argf-ml-auto' />
      </button>
      <div
        className={clsx(
          'argf-absolute argf-z-50 argf-mt-2 argf-transition-all argf-duration-300 argf-ease-in-out argf-box-border',
          sizeClass,
          'argf-rounded-md argf-bg-white argf-shadow-lg argf-ring-1 argf-ring-black argf-ring-opacity-5',
          {
            'argf-opacity-0': !isOpen,
            'argf-opacity-100': isOpen,
            'argf-invisible': !isOpen,
            'argf-visible': isOpen,
          },
        )}
        style={{
          maxHeight: maxHeight,
          transition:
            'max-height 0.3s ease, opacity 0.3s ease, visibility 0.3s ease',
        }}
      >
        {isSearchable && (
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='argf-w-full argf-px-4 argf-font-medium argf-py-2 argf-text-sm argf-rounded-t-md argf-border-b argf-border-solid argf-border-gray-300 focus:argf-outline-none argf-bg-white argf-text-slate-900 argf-box-border'
            placeholder='Search...'
          />
        )}
        <ul className='argf-list-none argf-m-0 argf-max-h-60 argf-overflow-auto argf-px-2 argf-py-2'>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className='argf-cursor-pointer argf-select-none argf-py-2 argf-px-3 argf-font-medium argf-text-sm argf-relative argf-rounded-md hover:argf-bg-gray-100 hover:argf-text-slate-900 argf-text-slate-700 argf-m-0'
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
