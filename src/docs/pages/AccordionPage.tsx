import React from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import { Accordion, AccordionItem } from '../../components/Accordion/Accordion';

export const AccordionPage: React.FC = () => {
  const items: AccordionItem[] = [
    {
      title: 'What is argf-react?',
      content: <p className='text-slate-600 leading-relaxed'>A lightweight, modular React component library built with TypeScript and Tailwind CSS.</p>,
    },
    {
      title: 'Can I customize styles easily?',
      content: <p className='text-slate-600 leading-relaxed'>Yes, every component accepts standard custom className and inline styles.</p>,
    },
    {
      title: 'How do I install argf-react?',
      content: <p className='text-slate-600 leading-relaxed'>Run <code>pnpm add argf-react</code> in your terminal.</p>,
    },
  ];

  const propsData = [
    { prop: 'items', type: 'AccordionItem[]', default: 'Required', description: 'Array of { title: string, content: ReactNode }.' },
    { prop: 'defaultActiveIndex', type: 'number', default: 'null', description: 'Initial active item index.' },
    { prop: 'multiple', type: 'boolean', default: 'false', description: 'Allow expanding multiple items concurrently.' },
    { prop: 'animationDuration', type: 'number', default: '500', description: 'Duration of expand/collapse transition in ms.' },
    { prop: 'onToggle', type: '(index: number) => void', default: 'undefined', description: 'Callback when an item is expanded.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Accordion</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Expandable disclosure panels for organizing FAQs, multi-step sections, or collapsible drawers.
        </p>
      </div>

      <ComponentCard
        title='Multiple Expandable Accordion'
        description='Smooth height collapse and chevron rotation animation.'
        badge='<Accordion />'
        code={`import { Accordion } from 'argf-react';\n\nconst items = [\n  { title: 'Question 1', content: <p>Answer 1</p> },\n  { title: 'Question 2', content: <p>Answer 2</p> }\n];\n\n<Accordion items={items} defaultActiveIndex={0} multiple={true} />`}
      >
        <div className='w-full max-w-xl mx-auto'>
          <Accordion items={items} defaultActiveIndex={0} multiple animationDuration={300} />
        </div>
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default AccordionPage;
