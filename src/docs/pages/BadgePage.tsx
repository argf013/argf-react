import React, { useState } from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Badge from '../../components/Badge/Badge';
import useToast from '../../components/Toast/useToast';

export const BadgePage: React.FC = () => {
  const { addToast } = useToast();
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind CSS', 'Vite']);

  const propsData = [
    { prop: 'label', type: 'string', default: 'Required', description: 'Badge display text.' },
    { prop: 'severity', type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'", default: "'primary'", description: 'Color scheme.' },
    { prop: 'variant', type: "'soft' | 'solid' | 'outline'", default: "'soft'", description: 'Visual style of background and border.' },
    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Padding and font size preset.' },
    { prop: 'dot', type: 'boolean', default: 'false', description: 'Displays an active status indicator circle.' },
    { prop: 'onRemove', type: '() => void', default: 'undefined', description: 'Adds an interactive dismiss x button.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Badge</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Compact indicators used to highlight status, count items, or tag categories.
        </p>
      </div>

      <ComponentCard
        title='Badge Variants & Tags'
        description='Soft pastel, high-contrast solid, outline styles, and interactive removable chips.'
        badge='<Badge />'
        code={`import { Badge } from 'argf-react';\n\n<Badge label="Active" severity="success" dot />\n<Badge label="Pending" severity="warning" variant="soft" />\n<Badge label="Dismissible" onRemove={() => handleRemove()} />`}
      >
        <div className='flex flex-col items-center gap-4 w-full'>
          <div className='flex flex-wrap items-center justify-center gap-2.5'>
            <Badge label='Primary' severity='primary' variant='soft' dot />
            <Badge label='Active' severity='success' variant='soft' dot />
            <Badge label='Warning' severity='warning' variant='soft' dot />
            <Badge label='Critical' severity='danger' variant='soft' dot />
            <Badge label='Notice' severity='info' variant='soft' dot />
            <Badge label='Neutral' severity='secondary' variant='soft' />
          </div>

          <div className='flex flex-wrap items-center justify-center gap-2.5'>
            <Badge label='Solid Success' severity='success' variant='solid' />
            <Badge label='Solid Danger' severity='danger' variant='solid' />
            <Badge label='Outline Info' severity='info' variant='outline' />
            <Badge label='Outline Warning' severity='warning' variant='outline' />
          </div>

          <div className='flex flex-wrap items-center justify-center gap-2 pt-2'>
            <span className='text-xs text-slate-500 font-medium mr-1'>Removable:</span>
            {tags.map((tag) => (
              <Badge
                key={tag}
                label={tag}
                severity='primary'
                variant='soft'
                onRemove={() => {
                  setTags((prev) => prev.filter((t) => t !== tag));
                  addToast({ severity: 'warning', message: `Removed "${tag}"` });
                }}
              />
            ))}
            {tags.length === 0 && (
              <button
                type='button'
                onClick={() => setTags(['React', 'TypeScript', 'Tailwind CSS', 'Vite'])}
                className='text-xs font-semibold text-blue-600 hover:underline'
              >
                Reset Tags
              </button>
            )}
          </div>
        </div>
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default BadgePage;
