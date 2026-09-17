import React from 'react';
import { ComponentCard, PropsTable, CodeSnippet } from '../DocsComponents';
import Button from '../../components/Button/Button';
import useToast from '../../components/Toast/useToast';
import { CheckCircleFillIcon, XCircleFillIcon, AlertFillIcon, PlusCircleIcon } from '@primer/octicons-react';

export const ButtonPage: React.FC = () => {
  const { addToast } = useToast();

  const buttonPropsData = [
    { prop: 'label', type: 'string', default: 'Required', description: 'Text label displayed inside the button.' },
    { prop: 'severity', type: "'primary' | 'secondary' | 'danger' | 'warning' | 'success'", default: "'primary'", description: 'Color theme and visual intent.' },
    { prop: 'rounded', type: 'boolean', default: 'false', description: 'When true, applies fully rounded-full pill styling.' },
    { prop: 'icon', type: 'React.ReactNode', default: 'undefined', description: 'Leading icon displayed before the label.' },
    { prop: 'onClick', type: '() => void', default: 'undefined', description: 'Callback function triggered upon click.' },
    { prop: 'className', type: 'string', default: 'undefined', description: 'Additional custom CSS classes.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Button</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Interactive buttons used for actions, forms, and triggers with built-in theme severities.
        </p>
      </div>

      <ComponentCard
        title='Rounded Pill Buttons'
        description='Buttons with rounded-full border radius and optional leading icons.'
        badge='<Button rounded />'
        code={`import { Button } from 'argf-react';\nimport { CheckCircleFillIcon } from '@primer/octicons-react';\n\n<Button\n  label="Primary Action"\n  severity="primary"\n  rounded\n  icon={<CheckCircleFillIcon />}\n  onClick={() => console.log('Clicked!')}\n/>`}
      >
        <Button
          label='Primary'
          icon={<CheckCircleFillIcon />}
          rounded
          severity='primary'
          onClick={() => addToast({ severity: 'success', message: 'Primary triggered!' })}
        />
        <Button
          label='Success'
          icon={<CheckCircleFillIcon />}
          rounded
          severity='success'
          onClick={() => addToast({ severity: 'success', message: 'Saved successfully!' })}
        />
        <Button
          label='Danger'
          icon={<XCircleFillIcon />}
          severity='danger'
          rounded
          onClick={() => addToast({ severity: 'error', message: 'Deleted record!' })}
        />
        <Button
          label='Warning'
          icon={<AlertFillIcon />}
          rounded
          severity='warning'
          onClick={() => addToast({ severity: 'warning', message: 'Warning alert!' })}
        />
        <Button
          icon={<PlusCircleIcon />}
          label='Secondary'
          rounded
          severity='secondary'
          onClick={() => addToast({ severity: 'success', message: 'Secondary clicked!' })}
        />
      </ComponentCard>

      <ComponentCard
        title='Standard Rectangular Buttons'
        description='Classic rounded-md buttons suitable for forms and modal actions.'
        badge='<Button />'
        code={`<Button label="Primary" severity="primary" />\n<Button label="Success" severity="success" />\n<Button label="Danger" severity="danger" />`}
      >
        <Button label='Primary' severity='primary' onClick={() => addToast({ severity: 'success', message: 'Primary' })} />
        <Button label='Success' severity='success' onClick={() => addToast({ severity: 'success', message: 'Saved' })} />
        <Button label='Danger' severity='danger' onClick={() => addToast({ severity: 'error', message: 'Deleted' })} />
        <Button label='Warning' severity='warning' onClick={() => addToast({ severity: 'warning', message: 'Review' })} />
        <Button label='Secondary' severity='secondary' onClick={() => addToast({ severity: 'warning', message: 'Secondary' })} />
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={buttonPropsData} />
      </div>
    </div>
  );
};

export default ButtonPage;
