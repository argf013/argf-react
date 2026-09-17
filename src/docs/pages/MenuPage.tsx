import React from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Menu from '../../components/Menu/Menu';
import useToast from '../../components/Toast/useToast';
import { CheckCircleFillIcon, InfoIcon, AlertFillIcon } from '@primer/octicons-react';

export const MenuPage: React.FC = () => {
  const { addToast } = useToast();

  const menuItems = [
    { label: 'View Profile', icon: <CheckCircleFillIcon />, onClick: () => addToast({ severity: 'success', message: 'Profile clicked' }) },
    { label: 'Documentation', icon: <InfoIcon />, onClick: () => addToast({ severity: 'warning', message: 'Docs clicked' }) },
    { label: 'Delete Project', icon: <AlertFillIcon />, danger: true, onClick: () => addToast({ severity: 'error', message: 'Delete triggered' }) },
  ];

  const propsData = [
    { prop: 'items', type: 'MenuItem[]', default: 'Required', description: 'Array of { label, icon?, onClick?, disabled?, danger? }.' },
    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Popover menu width and text size.' },
    { prop: 'vertical', type: 'boolean', default: 'false', description: 'Rotate kebab trigger icon 90 degrees.' },
    { prop: 'className', type: 'string', default: 'undefined', description: 'Custom CSS class for container.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Menu (Kebab Popover)</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Dropdown action popover triggered by a kebab button with outside-click dismissal.
        </p>
      </div>

      <ComponentCard
        title='Horizontal & Vertical Kebab'
        description='Click either kebab button below to see the animated action dropdown.'
        badge='<Menu />'
        code={`import { Menu } from 'argf-react';\n\n<Menu\n  items={[\n    { label: 'Profile', onClick: handleProfile },\n    { label: 'Delete', danger: true, onClick: handleDelete }\n  ]}\n  vertical\n/>`}
      >
        <div className='flex items-center gap-16 py-4'>
          <div className='flex flex-col items-center gap-1.5'>
            <span className='text-xs font-medium text-slate-500'>Horizontal Kebab</span>
            <Menu items={menuItems} size='medium' />
          </div>
          <div className='flex flex-col items-center gap-1.5'>
            <span className='text-xs font-medium text-slate-500'>Vertical Kebab</span>
            <Menu items={menuItems} size='medium' vertical />
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

export default MenuPage;
