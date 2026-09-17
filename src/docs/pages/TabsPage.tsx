import React from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Tabs from '../../components/Tabs/Tabs';

export const TabsPage: React.FC = () => {
  const propsData = [
    { prop: 'items', type: 'TabItem[]', default: 'Required', description: 'Array of { id, label, content?, icon?, badge?, disabled? }.' },
    { prop: 'variant', type: "'line' | 'pills' | 'enclosed'", default: "'line'", description: 'Visual style for the tab strip.' },
    { prop: 'defaultActiveId', type: 'string', default: 'First item ID', description: 'Uncontrolled initial active tab ID.' },
    { prop: 'activeId', type: 'string', default: 'undefined', description: 'Controlled active tab ID.' },
    { prop: 'onChange', type: '(activeId: string) => void', default: 'undefined', description: 'Callback triggered when tab selection changes.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Tabs</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Segmented views allowing users to switch between related panels within the same context.
        </p>
      </div>

      <ComponentCard
        title='Pills & Line Variants'
        description='Switch between sub-views with badge counts and smooth tab active transitions.'
        badge='<Tabs />'
        code={`import { Tabs } from 'argf-react';\n\nconst items = [\n  { id: 'tab1', label: 'Overview', badge: '3', content: <p>Overview details</p> },\n  { id: 'tab2', label: 'Team', content: <p>Team details</p> }\n];\n\n<Tabs items={items} variant="pills" />`}
      >
        <div className='w-full max-w-xl space-y-6'>
          <div>
            <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2'>Pills Variant</span>
            <Tabs
              variant='pills'
              items={[
                { id: '1', label: 'Overview', badge: '3', content: <div className='p-4 bg-white rounded-xl border border-slate-200 text-slate-600 text-xs'>📊 Real-time overview metrics and performance indicators.</div> },
                { id: '2', label: 'Team', badge: '8', content: <div className='p-4 bg-white rounded-xl border border-slate-200 text-slate-600 text-xs'>👥 Manage organization seats, roles, and security permissions.</div> },
                { id: '3', label: 'Integrations', content: <div className='p-4 bg-white rounded-xl border border-slate-200 text-slate-600 text-xs'>⚡ Connect webhooks, Slack, and cloud pipelines.</div> },
              ]}
            />
          </div>

          <div>
            <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2'>Line Variant</span>
            <Tabs
              variant='line'
              items={[
                { id: 'l1', label: 'General Settings', content: <p className='text-xs text-slate-500 pt-1'>Application language and default timezone.</p> },
                { id: 'l2', label: 'Security & Auth', content: <p className='text-xs text-slate-500 pt-1'>Two-factor authentication and token management.</p> },
                { id: 'l3', label: 'Archived', disabled: true, content: null },
              ]}
            />
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

export default TabsPage;
