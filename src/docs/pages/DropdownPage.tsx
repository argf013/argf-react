import React, { useState } from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Dropdown from '../../components/Dropdown/Dropdown';
import useToast from '../../components/Toast/useToast';

export const DropdownPage: React.FC = () => {
  const { addToast } = useToast();
  const [selected, setSelected] = useState('Jakarta');

  const cityOptions = [
    { label: 'Jakarta (Indonesia)', value: 'Jakarta' },
    { label: 'Bandung (Indonesia)', value: 'Bandung' },
    { label: 'Tokyo (Japan)', value: 'Tokyo' },
    { label: 'Seoul (South Korea)', value: 'Seoul' },
  ];

  const propsData = [
    { prop: 'options', type: 'Option[]', default: 'Required', description: 'Array of { label: string, value: string } options.' },
    { prop: 'onSelect', type: '(option: Option) => void', default: 'Required', description: 'Callback when an option is selected.' },
    { prop: 'placeholder', type: 'string', default: "'Select an option'", description: 'Placeholder when no option is picked.' },
    { prop: 'isSearchable', type: 'boolean', default: 'false', description: 'Enables live filter search input at the top.' },
    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Width sizing preset.' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Dropdown</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Custom select menu with smooth dropdown transition and real-time live search filtering.
        </p>
      </div>

      <ComponentCard
        title='Searchable & Disabled Dropdowns'
        description='Search items dynamically or lock dropdown with the disabled prop.'
        badge='<Dropdown />'
        code={`import { Dropdown } from 'argf-react';\n\n<Dropdown\n  placeholder="Select a city"\n  options={[\n    { label: 'Jakarta (Indonesia)', value: 'Jakarta' },\n    { label: 'Bandung (Indonesia)', value: 'Bandung' }\n  ]}\n  onSelect={(opt) => setSelected(opt.value)}\n  isSearchable\n/>`}
      >
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <div className='text-center'>
            <span className='block text-xs font-semibold text-slate-500 mb-2'>Searchable</span>
            <Dropdown
              placeholder='Select city'
              options={cityOptions}
              initialValue={{ label: selected, value: selected }}
              onSelect={(opt) => {
                setSelected(opt.value);
                addToast({ severity: 'success', message: `Selected ${opt.label}` });
              }}
              isSearchable
            />
          </div>
          <div className='text-center'>
            <span className='block text-xs font-semibold text-slate-500 mb-2'>Disabled</span>
            <Dropdown placeholder='Disabled menu' options={cityOptions} onSelect={() => {}} disabled />
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

export default DropdownPage;
