import React from 'react';
import { ComponentCard, PropsTable, CodeSnippet } from '../DocsComponents';
import Button from '../../components/Button/Button';
import useToast from '../../components/Toast/useToast';
import { CheckCircleFillIcon, AlertFillIcon, XCircleFillIcon } from '@primer/octicons-react';

export const ToastPage: React.FC = () => {
  const { addToast } = useToast();

  const propsData = [
    { prop: 'severity', type: "'success' | 'warning' | 'error'", default: 'Required', description: 'Color scheme and alert icon.' },
    { prop: 'message', type: 'string', default: "''", description: 'Message body text.' },
    { prop: 'life', type: 'number', default: '3000', description: 'Auto-dismiss duration in milliseconds.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Toast</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Non-blocking notification system that gives feedback for actions with auto-dismiss timers.
        </p>
      </div>

      <ComponentCard
        title='Toast Triggers'
        description='Click each button below to trigger toast notifications in the bottom-right corner.'
        badge='useToast() + <ToastProvider />'
        code={`import { useToast, ToastProvider } from 'argf-react';\n\n// 1. Wrap your root in <ToastProvider>\n// 2. In your component:\nconst { addToast } = useToast();\n\naddToast({\n  severity: 'success',\n  message: 'Saved successfully!',\n  life: 3000,\n});`}
      >
        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Button
            label='Toast Success'
            severity='success'
            icon={<CheckCircleFillIcon />}
            rounded
            onClick={() => addToast({ severity: 'success', message: 'Action completed successfully!' })}
          />
          <Button
            label='Toast Warning'
            severity='warning'
            icon={<AlertFillIcon />}
            rounded
            onClick={() => addToast({ severity: 'warning', message: 'Please review warning notice.' })}
          />
          <Button
            label='Toast Danger'
            severity='danger'
            icon={<XCircleFillIcon />}
            rounded
            onClick={() => addToast({ severity: 'error', message: 'Failed to complete requested task.' })}
          />
        </div>
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Toast Options</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default ToastPage;
