import { ChevronDownIcon } from '@primer/octicons-react';
import React, { useState } from 'react';

/**
 * Represents an item in the accordion.
 */
export interface AccordionItem {
  title: string;

  /**
   * Content to be displayed when the item is expanded.
   * Can be a string or a React component.
   * e.g <p>Hello this is accordion body</p>
   */
  content: React.ReactNode;
}

interface AccordionProps {
  /**
   * Array of items to be displayed in the accordion.
   */
  items: AccordionItem[];

  /**
   * Index of the item that should be active by default.
   * If not provided, no item will be active initially.
   */
  defaultActiveIndex?: number;

  /**
   * If true, multiple items can be expanded at the same time.
   * If false, only one item can be expanded at a time.
   */
  multiple?: boolean;

  /**
   * Callback function that is called when an item is toggled.
   * Receives the index of the toggled item as an argument.
   */
  onToggle?: (index: number) => void;

  /**
   * Additional class name for the accordion container.
   */
  accordionClassName?: string;

  /**
   * Additional class name for each item in the accordion.
   */
  itemClassName?: string;

  /**
   * Additional class name for the heading of each item.
   */
  headingClassName?: string;

  /**
   * Additional class name for the content of each item.
   */
  contentClassName?: string;

  /**
   * Duration of the expand/collapse animation in milliseconds.
   */
  animationDuration?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultActiveIndex = null,
  multiple = false,
  onToggle,
  accordionClassName = '',
  itemClassName = '',
  headingClassName = '',
  contentClassName = '',
  animationDuration = 500,
}) => {
  const [expanded, setExpanded] = useState<number[]>(
    defaultActiveIndex !== null ? [defaultActiveIndex] : [],
  );

  const toggleAccordion = (index: number) => {
    let newExpanded;
    if (multiple) {
      newExpanded = expanded.includes(index)
        ? expanded.filter((i) => i !== index)
        : [...expanded, index];
    } else {
      newExpanded = expanded.includes(index) ? [] : [index];
    }
    setExpanded(newExpanded);
    if (onToggle) onToggle(index);
  };

  return (
    <div
      id='accordion-collapse'
      data-accordion='collapse'
      className={`argf-box-border ${accordionClassName}`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`argf-box-border ${itemClassName} ${index === items.length - 1 ? 'argf-border-b argf-border-solid argf-border-gray-200' : ''}`}
        >
          <h2 id={`accordion-collapse-heading-${index}`} className='argf-m-0 argf-p-0 argf-border-0'>
            <button
              type='button'
              className={`argf-box-border argf-flex argf-items-center argf-justify-between argf-bg-gray-100 hover:argf-bg-gray-200 argf-w-full argf-p-5 argf-font-medium rtl:argf-text-right argf-text-gray-500 argf-border argf-border-solid argf-border-b-0 argf-border-gray-200 argf-cursor-pointer argf-outline-none ${
                index === 0 ? 'argf-rounded-tl-xl argf-rounded-tr-xl' : ''
              } hover:argf-bg-gray-100 argf-gap-3 ${headingClassName}`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={expanded.includes(index)}
              aria-controls={`accordion-collapse-body-${index}`}
            >
              <span>{item.title}</span>
              <ChevronDownIcon
                size={24}
                className={`argf-transform argf-transition-transform argf-duration-300 ${expanded.includes(index) ? 'argf-rotate-180' : 'argf-rotate-0'}`}
              />
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            style={{ transitionDuration: `${animationDuration}ms` }}
            className={`argf-box-border argf-transition-all argf-bg-[#f5f6f7] argf-ease-in-out argf-overflow-hidden ${expanded.includes(index) ? 'argf-max-h-screen' : 'argf-max-h-0'} ${contentClassName}`}
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className='argf-p-5 argf-text-sm argf-border argf-border-solid argf-border-b-0 argf-border-gray-200 argf-box-border'>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
