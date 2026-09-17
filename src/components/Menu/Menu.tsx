import { KebabHorizontalIcon } from '@primer/octicons-react';
import React, { useState, useRef, useEffect } from 'react';

export interface MenuItem {
  /**
   * Menu item label
   */
  label: string;

  /**
   * Menu item icon
   */
  icon?: React.ReactNode;

  /**
   * Callback function when menu item is clicked
   */
  onClick?: () => void;

  /**
   * Disable menu item
   * @default false
   */
  disabled?: boolean;

  /**
   * Set menu item as danger
   * @default false
   */
  danger?: boolean;
}

export interface MenuProps {
  /**
   * Menu items
   */
  items: MenuItem[];

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional style
   */
  style?: React.CSSProperties;

  /**
   * Additional class name for menu items
   */
  itemClassName?: string;

  /**
   * Additional style for menu items
   */
  itemStyle?: React.CSSProperties;

  /**
   * Menu size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Display icon vertically
   * @default false
   */
  vertical?: boolean;
}

const Menu: React.FC<MenuProps> = ({
  items,
  className,
  style,
  itemClassName,
  itemStyle,
  size = 'medium',
  vertical = false,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (item: MenuItem) => {
    if (item.disabled) return;
    if (item.onClick) item.onClick();
    setOpenMenu(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sizeClasses = {
    small: 'argf-w-36 argf-p-1 argf-text-xs',
    medium: 'argf-w-48 argf-p-1.5 argf-text-sm',
    large: 'argf-w-56 argf-p-2 argf-text-base',
  };

  return (
    <div ref={menuRef} className={`argf-relative argf-inline-block argf-box-border ${className || ''}`} style={style}>
      <button
        type='button'
        aria-haspopup='true'
        aria-expanded={openMenu}
        className='argf-border-0 argf-outline-none argf-bg-transparent menu-button argf-p-2 argf-text-slate-700 argf-rounded-full hover:argf-bg-slate-200 argf-transition-colors argf-flex argf-items-center argf-justify-center argf-cursor-pointer'
        onClick={() => setOpenMenu(!openMenu)}
      >
        <KebabHorizontalIcon className={vertical ? 'argf-rotate-90' : ''} />
      </button>
      <div
        className={`argf-absolute argf-z-50 argf-left-0 argf-mt-1 argf-transition-all argf-transform argf-duration-200 argf-ease-out ${
          openMenu
            ? 'argf-translate-y-0 argf-opacity-100 argf-scale-100'
            : '-argf-translate-y-2 argf-opacity-0 argf-scale-95 argf-pointer-events-none'
        } argf-origin-top-left`}
      >
        <ul
          className={`menu-list argf-list-none argf-m-0 argf-flex argf-gap-1 argf-flex-col argf-bg-white argf-border argf-border-solid argf-border-gray-200 argf-shadow-xl argf-rounded-lg argf-box-border ${sizeClasses[size]} ${itemClassName || ''}`}
          style={itemStyle}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`menu-item argf-px-2.5 argf-py-1.5 argf-rounded-md argf-transition-colors ${
                item.disabled
                  ? 'argf-opacity-40 argf-cursor-not-allowed'
                  : item.danger
                    ? 'argf-text-red-600 hover:argf-bg-red-50 argf-cursor-pointer'
                    : 'argf-text-slate-700 hover:argf-bg-slate-100 argf-cursor-pointer'
              } argf-gap-2.5 argf-flex argf-items-center argf-m-0`}
              onClick={() => handleClick(item)}
            >
              {item.icon && (
                <span className='argf-flex argf-items-center'>{item.icon}</span>
              )}
              <span className='argf-flex-1 argf-whitespace-nowrap'>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
