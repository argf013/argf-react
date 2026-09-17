import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from '@primer/octicons-react';

export function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='relative mt-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono p-4 border border-slate-800 shadow-inner group overflow-x-auto'>
      <button
        type='button'
        onClick={handleCopy}
        aria-label='Copy code'
        className='absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors border border-slate-700'
      >
        {copied ? (
          <>
            <CheckIcon className='text-emerald-400' />
            <span className='text-emerald-400'>Copied!</span>
          </>
        ) : (
          <>
            <CopyIcon />
            <span>Copy</span>
          </>
        )}
      </button>
      <pre className='pr-16 whitespace-pre-wrap leading-relaxed'>{code}</pre>
    </div>
  );
}

export function ComponentCard({
  title,
  description,
  badge,
  children,
  code,
}: {
  title: string;
  description?: string;
  badge?: string;
  children: React.ReactNode;
  code?: string;
}) {
  return (
    <section className='bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4'>
        <div>
          <div className='flex items-center gap-2.5'>
            <h2 className='text-xl font-bold text-slate-900 tracking-tight'>
              {title}
            </h2>
            {badge && (
              <span className='text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60'>
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className='text-sm text-slate-500 mt-1 leading-relaxed'>
              {description}
            </p>
          )}
        </div>
      </div>

      <div className='p-6 rounded-xl bg-slate-50/70 border border-dashed border-slate-200 flex flex-wrap items-center justify-center gap-4 min-h-[120px]'>
        {children}
      </div>

      {code && <CodeSnippet code={code} />}
    </section>
  );
}

export function PropsTable({
  data,
}: {
  data: { prop: string; type: string; default?: string; description: string }[];
}) {
  return (
    <div className='overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs'>
      <table className='w-full text-left border-collapse text-xs sm:text-sm'>
        <thead>
          <tr className='bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold'>
            <th className='py-3 px-4'>Prop</th>
            <th className='py-3 px-4'>Type</th>
            <th className='py-3 px-4'>Default</th>
            <th className='py-3 px-4'>Description</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100 text-slate-700'>
          {data.map((item, idx) => (
            <tr key={idx} className='hover:bg-slate-50/50 transition-colors'>
              <td className='py-3 px-4 font-mono font-semibold text-blue-600'>
                {item.prop}
              </td>
              <td className='py-3 px-4 font-mono text-slate-500 text-xs'>
                {item.type}
              </td>
              <td className='py-3 px-4 font-mono text-slate-400 text-xs'>
                {item.default || '-'}
              </td>
              <td className='py-3 px-4 leading-relaxed text-slate-600'>
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
