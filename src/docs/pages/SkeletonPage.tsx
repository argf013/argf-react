import React from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Skeleton from '../../components/Skeleton/Skeleton';

export const SkeletonPage: React.FC = () => {
  const propsData = [
    { prop: 'variant', type: "'text' | 'circular' | 'rectangular' | 'rounded'", default: "'text'", description: 'Placeholder geometry shape.' },
    { prop: 'animation', type: "'pulse' | 'wave' | 'none'", default: "'pulse'", description: 'Loading animation style.' },
    { prop: 'width', type: 'string | number', default: 'undefined', description: 'Explicit width in px, rem, or %.' },
    { prop: 'height', type: 'string | number', default: 'undefined', description: 'Explicit height in px, rem, or %.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Skeleton</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Placeholder loading animations that preview content layout while data is being fetched.
        </p>
      </div>

      <ComponentCard
        title='Skeleton Layout Previews'
        description='Combine circular, text, and rounded skeletons to simulate card layouts.'
        badge='<Skeleton />'
        code={`import { Skeleton } from 'argf-react';\n\n// Circular avatar\n<Skeleton variant="circular" width={44} height={44} />\n\n// Text line placeholders\n<Skeleton variant="text" className="w-3/4" />\n<Skeleton variant="text" className="w-1/2" />`}
      >
        <div className='flex flex-wrap items-center justify-center gap-10 w-full'>
          <div className='p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm w-72 space-y-4'>
            <div className='flex items-center gap-3'>
              <Skeleton variant='circular' width={44} height={44} />
              <div className='space-y-1.5 flex-1'>
                <Skeleton variant='text' className='w-3/4 h-3.5' />
                <Skeleton variant='text' className='w-1/2 h-2.5' />
              </div>
            </div>
            <div className='space-y-2 pt-1'>
              <Skeleton variant='text' className='w-full h-3' />
              <Skeleton variant='text' className='w-5/6 h-3' />
              <Skeleton variant='text' className='w-2/3 h-3' />
            </div>
            <div className='pt-2 flex justify-between items-center'>
              <Skeleton variant='rounded' width={70} height={26} />
              <Skeleton variant='rounded' width={85} height={26} />
            </div>
          </div>

          <div className='p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm w-72 space-y-3'>
            <Skeleton variant='rounded' className='w-full h-24' />
            <div className='space-y-1.5 pt-1'>
              <Skeleton variant='text' className='w-2/3 h-3.5' />
              <Skeleton variant='text' className='w-full h-2.5' />
            </div>
            <div className='pt-1'>
              <Skeleton variant='rounded' className='w-full h-8' />
            </div>
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

export default SkeletonPage;
