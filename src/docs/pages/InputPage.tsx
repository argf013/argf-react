import React, { useState } from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Input from '../../components/Input/Input';

export const InputPage: React.FC = () => {
  const [val, setVal] = useState('argf-react user');

  const propsData = [
    { prop: 'value', type: 'string', default: 'Required', description: 'Current input text value.' },
    { prop: 'onChange', type: '(e) => void', default: 'Required', description: 'Callback triggered when value changes.' },
    { prop: 'type', type: 'string', default: "'text'", description: 'HTML input type (text, password, email, number).' },
    { prop: 'label', type: 'string', default: 'undefined', description: 'Top label text displayed above input.' },
    { prop: 'placeholder', type: 'string', default: "''", description: 'Placeholder helper text.' },
    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Dimension sizing preset.' },
    { prop: 'required', type: 'boolean', default: 'false', description: 'Mark input as required with blur validation.' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disable user interaction.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Input</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Text field components for gathering user text input with label and validation states.
        </p>
      </div>

      <ComponentCard
        title='Input Sizing & Validation'
        description='Available in small, medium, and large sizing with automatic required feedback on blur.'
        badge='<Input />'
        code={`import { Input } from 'argf-react';\n\n<Input\n  label="Full Name"\n  placeholder="e.g. Jane Doe"\n  value={name}\n  onChange={(e) => setName(e.target.value)}\n  size="medium"\n  required\n/>`}
      >
        <div className='flex flex-wrap items-end justify-center gap-5 w-full'>
          <Input label='Small Input' size='small' type='text' placeholder='Small size...' value={val} onChange={(e) => setVal(e.target.value)} />
          <Input label='Medium (Default)' size='medium' type='text' placeholder='Medium size...' value={val} onChange={(e) => setVal(e.target.value)} />
          <Input label='Large Input' size='large' type='text' placeholder='Large size...' value={val} onChange={(e) => setVal(e.target.value)} />
          <Input label='Required Field' type='text' placeholder='Touch and leave empty' value='' onChange={() => {}} required />
        </div>
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default InputPage;
