import React, { useState } from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Switch from '../../components/Switch/Switch';
import useToast from '../../components/Toast/useToast';

export const SwitchPage: React.FC = () => {
  const { addToast } = useToast();
  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(false);

  const propsData = [
    { prop: 'checked', type: 'boolean', default: 'Required', description: 'Controlled boolean checked state.' },
    { prop: 'onChange', type: '(checked: boolean) => void', default: 'Required', description: 'Callback function on state change.' },
    { prop: 'label', type: 'string', default: 'undefined', description: 'Title label next to switch.' },
    { prop: 'description', type: 'string', default: 'undefined', description: 'Subtext helper below label.' },
    { prop: 'labelPlacement', type: "'left' | 'right'", default: "'right'", description: 'Position of label relative to track.' },
    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Size preset.' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disable toggle interaction.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Switch</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Accessible toggle controls for preferences, settings, and boolean inputs.
        </p>
      </div>

      <ComponentCard
        title='Switch Examples'
        description='Fully accessible with keyboard focus (Space/Enter) and smooth slide animations.'
        badge='<Switch />'
        code={`import { Switch } from 'argf-react';\n\n<Switch\n  checked={enabled}\n  onChange={setEnabled}\n  label="Notifications"\n  description="Receive real-time alerts"\n/>`}
      >
        <div className='flex flex-wrap items-center justify-center gap-8'>
          <Switch
            checked={s1}
            onChange={(val) => {
              setS1(val);
              addToast({ severity: 'success', message: `Notifications ${val ? 'enabled' : 'disabled'}` });
            }}
            label='Push Notifications'
            description='Receive alerts for updates'
          />
          <Switch checked={s2} onChange={setS2} label='Auto-save drafts' />
          <Switch checked={false} onChange={() => {}} label='Disabled Option' disabled />
        </div>
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default SwitchPage;
