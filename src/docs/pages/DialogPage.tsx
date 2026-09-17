import React, { useState } from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Dialog from '../../components/Dialog/Dialog';
import Button from '../../components/Button/Button';
import { AlertFillIcon, InfoIcon } from '@primer/octicons-react';

export const DialogPage: React.FC = () => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const [isDangerOpen, setIsDangerOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const propsData = [
    { prop: 'header', type: 'string', default: 'Required', description: 'Dialog header title.' },
    { prop: 'visible', type: 'boolean', default: 'Required', description: 'Controls visibility state of the modal dialog.' },
    { prop: 'onClose', type: '() => void', default: 'Required', description: 'Callback function triggered when closing dialog.' },
    { prop: 'severity', type: "'info' | 'danger' | 'warning'", default: "'info'", description: 'Color intent of header and icons.' },
    { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Width sizing presets for the modal body.' },
    { prop: 'closeable', type: 'boolean', default: 'true', description: 'Whether the close button and Esc-to-close are enabled.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Dialog</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Modal windows that interrupt user flow to show alerts, forms, or detailed information.
        </p>
      </div>

      <ComponentCard
        title='Dialog Variations'
        description='Click the triggers below to preview dialog transitions and severity themes.'
        badge='<Dialog />'
        code={`import { Dialog, Button } from 'argf-react';\n\n<Dialog\n  header="Information"\n  visible={isOpen}\n  severity="info"\n  onClose={() => setIsOpen(false)}\n>\n  <p>Your modal content goes here.</p>\n</Dialog>`}
      >
        <Button label='Open Info Dialog' severity='primary' onClick={() => setIsInfoOpen(true)} />
        <Button label='Open Warning Dialog' severity='warning' onClick={() => setIsWarningOpen(true)} />
        <Button label='Open Danger Dialog' severity='danger' onClick={() => setIsDangerOpen(true)} />
        <Button label='Open Default Dialog' severity='secondary' onClick={() => setIsDefaultOpen(true)} />
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>

      {/* Dialog Modals */}
      <Dialog header='Default Dialog' visible={isDefaultOpen} onClose={() => setIsDefaultOpen(false)}>
        <p className='text-slate-600 text-sm'>This is the default dialog content. You can place arbitrary React components here.</p>
      </Dialog>
      <Dialog icon={<InfoIcon />} header='Information Overview' severity='info' visible={isInfoOpen} onClose={() => setIsInfoOpen(false)}>
        <p className='text-slate-600 text-sm'>Here is some helpful information regarding system status or updates.</p>
      </Dialog>
      <Dialog icon={<AlertFillIcon />} header='System Warning' severity='warning' visible={isWarningOpen} onClose={() => setIsWarningOpen(false)}>
        <p className='text-slate-600 text-sm'>Please make sure to save your changes before proceeding.</p>
      </Dialog>
      <Dialog icon={<AlertFillIcon />} header='Critical Danger Alert' severity='danger' visible={isDangerOpen} onClose={() => setIsDangerOpen(false)}>
        <p className='text-slate-600 text-sm'>This is a destructive action warning styled with danger severity accents.</p>
      </Dialog>
    </div>
  );
};

export default DialogPage;
