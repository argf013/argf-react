import React, { useState } from 'react';
import clsx from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content?: React.ReactNode;
  badge?: string | number;
}

export type TabsVariant = 'line' | 'pills' | 'enclosed';

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (activeId: string) => void;
  variant?: TabsVariant;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  activeId: controlledActiveId,
  onChange,
  variant = 'line',
  className,
  listClassName,
  contentClassName,
}) => {
  const [internalActiveId, setInternalActiveId] = useState(
    controlledActiveId || defaultActiveId || items[0]?.id || '',
  );

  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleTabClick = (item: TabItem) => {
    if (item.disabled) return;
    if (controlledActiveId === undefined) {
      setInternalActiveId(item.id);
    }
    if (onChange) {
      onChange(item.id);
    }
  };

  const variantListClasses: Record<TabsVariant, string> = {
    line: 'argf-border-b argf-border-solid argf-border-slate-200 argf-gap-6',
    pills: 'argf-p-1 argf-bg-slate-100/90 argf-rounded-xl argf-gap-1 argf-border argf-border-solid argf-border-slate-200/60',
    enclosed: 'argf-border-b argf-border-solid argf-border-slate-200 argf-gap-1',
  };

  const getTabButtonClass = (item: TabItem, isActive: boolean) => {
    const baseClasses =
      'argf-border-0 argf-bg-transparent argf-inline-flex argf-items-center argf-gap-2 argf-font-medium argf-text-xs sm:argf-text-sm argf-transition-all focus:argf-outline-none argf-select-none argf-cursor-pointer argf-box-border';

    if (item.disabled) {
      return clsx(baseClasses, 'argf-opacity-40 argf-cursor-not-allowed argf-py-2 argf-px-3');
    }

    switch (variant) {
      case 'pills':
        return clsx(
          baseClasses,
          'argf-px-3.5 argf-py-1.5 argf-rounded-lg',
          isActive
            ? 'argf-bg-white argf-text-slate-900 argf-shadow-sm argf-font-semibold'
            : 'argf-text-slate-600 hover:argf-text-slate-900 hover:argf-bg-white/60',
        );
      case 'enclosed':
        return clsx(
          baseClasses,
          'argf-px-4 argf-py-2 argf-border-t argf-border-x argf-border-solid argf-rounded-t-lg -argf-mb-px',
          isActive
            ? 'argf-bg-white argf-border-slate-200 argf-border-b-white argf-text-blue-600 argf-font-semibold'
            : 'argf-border-transparent argf-text-slate-600 hover:argf-text-slate-900 hover:argf-bg-slate-50',
        );
      case 'line':
      default:
        return clsx(
          baseClasses,
          'argf-py-3 argf-border-b-2 argf-border-solid -argf-mb-px',
          isActive
            ? 'argf-border-blue-600 argf-text-blue-600 argf-font-semibold'
            : 'argf-border-transparent argf-text-slate-600 hover:argf-text-slate-900 hover:argf-border-slate-300',
        );
    }
  };

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div className={clsx('argf-w-full argf-flex argf-flex-col argf-box-border', className)}>
      <div
        role='tablist'
        className={clsx('argf-flex argf-items-center argf-overflow-x-auto argf-box-border', variantListClasses[variant], listClassName)}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              role='tab'
              type='button'
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleTabClick(item)}
              className={getTabButtonClass(item, isActive)}
            >
              {item.icon && <span className='argf-flex argf-items-center'>{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={clsx(
                    'argf-text-[10px] argf-px-1.5 argf-py-0.5 argf-rounded-full argf-font-bold argf-leading-none',
                    isActive
                      ? 'argf-bg-blue-100 argf-text-blue-800'
                      : 'argf-bg-slate-200 argf-text-slate-600',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeItem?.content && (
        <div role='tabpanel' className={clsx('argf-pt-4 argf-text-sm argf-leading-relaxed argf-box-border', contentClassName)}>
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
