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
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Set menu as vertical
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
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (item: MenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
      setOpenMenu(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenMenu(false);
    }
  };

  const sizeClasses = {
    small: 'p-3 text-sm w-32',
    medium: 'p-4 text-sm w-52',
    large: 'p-5 text-lg w-64',
  };

  useEffect(() => {
    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div ref={menuRef} className={`relative inline-block ${className || ''}`} style={style}>
      <button
        type='button'
        aria-haspopup='true'
        aria-expanded={openMenu}
        className='menu-button p-2 text-slate-700 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center'
        onClick={() => setOpenMenu(!openMenu)}
      >
        <KebabHorizontalIcon className={vertical ? 'rotate-90' : ''} />
      </button>
      <div
        className={`absolute z-50 left-0 mt-1 transition-all transform duration-200 ease-out ${
          openMenu
            ? 'translate-y-0 opacity-100 scale-100'
            : '-translate-y-2 opacity-0 scale-95 pointer-events-none'
        } origin-top-left`}
      >
        <ul
          className={`menu-list flex gap-1 flex-col bg-white border border-gray-200 shadow-xl rounded-lg ${sizeClasses[size]} ${itemClassName || ''}`}
          style={itemStyle}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`menu-item px-2.5 py-1.5 rounded-md transition-colors ${
                item.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : item.danger
                    ? 'text-red-600 hover:bg-red-50 cursor-pointer'
                    : 'text-slate-700 hover:bg-slate-100 cursor-pointer'
              } gap-2.5 flex items-center`}
              onClick={() => handleClick(item)}
            >
              {item.icon && (
                <span className='flex items-center'>{item.icon}</span>
              )}
              <span className='flex-1 whitespace-nowrap'>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
