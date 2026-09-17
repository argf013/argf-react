import React, { useState } from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import DialogConfirm from '../../components/DialogConfirm/DialogConfirm';
import Button from '../../components/Button/Button';
import useToast from '../../components/Toast/useToast';

export const DialogConfirmPage: React.FC = () => {
  const { addToast } = useToast();
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isDangerOpen, setIsDangerOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const propsData = [
    { prop: 'header', type: 'string', default: 'Required', description: 'Header text displayed in the confirmation dialog.' },
    { prop: 'message', type: 'string', default: 'Required', description: 'Clarification message describing the action to confirm.' },
    { prop: 'visible', type: 'boolean', default: 'Required', description: 'Visibility state of the confirmation dialog.' },
    { prop: 'onCancel', type: '() => void', default: 'Required', description: 'Callback when cancel button is clicked or dismissed.' },
    { prop: 'onSubmit', type: '() => void', default: 'Required', description: 'Callback when confirmation submit button is clicked.' },
    { prop: 'items', type: 'string[]', default: 'undefined', description: 'Array of item names to display with tooltips.' },
    { prop: 'severity', type: "'info' | 'warning' | 'danger'", default: "'info'", description: 'Severity color intent.' },
    { prop: 'submitLabel', type: 'string', default: "'Submit'", description: 'Custom label for the confirm button.' },
    { prop: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Custom label for the cancel button.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>DialogConfirm</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Structured confirmation dialogs for confirming critical, permanent, or destructive user actions.
        </p>
      </div>

      <ComponentCard
        title='Confirmation Triggers'
        description='Click to test confirmation workflows with action handlers.'
        badge='<DialogConfirm />'
        code={`import { DialogConfirm } from 'argf-react';\n\n<DialogConfirm\n  header="Confirm Action"\n  message="Are you sure you want to proceed?"\n  severity="danger"\n  items={['backup_2026.sql']}\n  visible={isOpen}\n  onCancel={() => setIsOpen(false)}\n  onSubmit={handleDelete}\n/>`}
      >
        <Button label='Confirm Info' severity='primary' onClick={() => setIsInfoOpen(true)} />
        <Button label='Confirm Warning' severity='warning' onClick={() => setIsWarningOpen(true)} />
        <Button label='Confirm Danger' severity='danger' onClick={() => setIsDangerOpen(true)} />
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>

      <DialogConfirm
        header='Confirm Information Sync'
        message='Synchronize these resources with cloud storage?'
        items={['Customer Database', 'Product Inventory Catalog']}
        severity='info'
        submitLabel='Sync Now'
        visible={isInfoOpen}
        onCancel={() => setIsInfoOpen(false)}
        onSubmit={() => {
          setIsInfoOpen(false);
          addToast({ severity: 'success', message: 'Synchronization complete!' });
        }}
      />

      <DialogConfirm
        header='Confirm Warning Action'
        message='Are you sure you want to proceed with this warning state action?'
        severity='warning'
        visible={isWarningOpen}
        onCancel={() => setIsWarningOpen(false)}
        onSubmit={() => {
          setIsWarningOpen(false);
          addToast({ severity: 'warning', message: 'Action accepted.' });
        }}
      />

      <DialogConfirm
        header='Confirm Destructive Action'
        message='Are you sure you want to permanently delete these files?'
        items={['document_budget_2026.pdf', 'contract_signed_v2.docx']}
        severity='danger'
        submitLabel='Delete Permanently'
        visible={isDangerOpen}
        onCancel={() => setIsDangerOpen(false)}
        onSubmit={() => {
          setIsDangerOpen(false);
          addToast({ severity: 'error', message: 'Files permanently deleted!' });
        }}
      />
    </div>
  );
};

export default DialogConfirmPage;
