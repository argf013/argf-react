import React from 'react';
import { NavLink } from 'react-router-dom';
import { SparkleFillIcon, CopyIcon, PackageIcon } from '@primer/octicons-react';
import useToast from '../../components/Toast/useToast';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardBody } from '../../components/Card/Card';

export const OverviewPage: React.FC = () => {
  const { addToast } = useToast();

  const featured = [
    { title: 'Button', path: '/components/button', desc: 'Custom severities, pill & square variants, icons.' },
    { title: 'Dialog & Confirm', path: '/components/dialog', desc: 'Animated modal dialogs with blur backdrop.' },
    { title: 'Input & Dropdown', path: '/components/input', desc: 'Form controls with validation & live search.' },
    { title: 'Switch', path: '/components/switch', desc: 'Accessible animated toggle switches.' },
    { title: 'Badge & Avatar', path: '/components/badge', desc: 'Status badges and user profile group stacks.' },
    { title: 'Card & Tabs', path: '/components/card', desc: 'Composable panels and segmented tabs views.' },
  ];

  return (
    <div className='space-y-10'>
      {/* Hero Section */}
      <div className='bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 text-center max-w-3xl mx-auto'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4 shadow-xs'>
          <SparkleFillIcon />
          <span>argf-react Component Library</span>
        </div>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3'>
          Reusable UI components crafted for React & Tailwind CSS
        </h1>
        <p className='text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-8'>
          Lightweight, modular, and fully typed with TypeScript. Designed to speed up your dashboard and application development.
        </p>

        {/* Quick Install Banner */}
        <div className='inline-flex items-center justify-between gap-3 bg-slate-50 p-1.5 pl-3.5 rounded-xl border border-slate-200 max-w-md w-full mx-auto'>
          <div className='flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wide'>
            <span className='text-slate-400 select-none font-semibold'>$</span>
            <span className='font-semibold text-blue-600'>pnpm</span>
            <span className='font-semibold text-blue-600'>add</span>
            <span className='font-semibold text-blue-600'>argf-react</span>
          </div>
          <button
            type='button'
            onClick={() => {
              navigator.clipboard.writeText('pnpm add argf-react');
              addToast({ severity: 'success', message: 'Copied command to clipboard!' });
            }}
            className='px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs'
          >
            <CopyIcon />
            Copy
          </button>
        </div>
      </div>

      {/* Featured Component Grid */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-900'>Browse Components</h2>
          <Badge label='14 Components' severity='primary' variant='soft' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {featured.map((item) => (
            <NavLink key={item.title} to={item.path}>
              <Card hoverable className='h-full'>
                <CardHeader>
                  <CardTitle className='text-base text-blue-600'>{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardBody className='pt-0 text-xs font-medium text-slate-400'>
                  View documentation &rarr;
                </CardBody>
              </Card>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
