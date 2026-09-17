import React from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Avatar, { AvatarGroup } from '../../components/Avatar/Avatar';

export const AvatarPage: React.FC = () => {
  const propsData = [
    { prop: 'name', type: 'string', default: 'undefined', description: 'User name used for fallback initials and random color.' },
    { prop: 'src', type: 'string', default: 'undefined', description: 'Image URL source.' },
    { prop: 'size', type: "'small' | 'medium' | 'large' | 'xlarge'", default: "'medium'", description: 'Dimension size.' },
    { prop: 'shape', type: "'circle' | 'rounded' | 'square'", default: "'circle'", description: 'Border radius shape.' },
    { prop: 'status', type: "'online' | 'offline' | 'busy' | 'away'", default: 'undefined', description: 'Status badge indicator.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Avatar & AvatarGroup</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Profile portraits with automatic fallback initials, status dots, and overlapping group stacks.
        </p>
      </div>

      <ComponentCard
        title='Avatars & Team Overlap'
        description='Displays images or fallback initials with status dots, plus AvatarGroup team stack.'
        badge='<Avatar />'
        code={`import { Avatar, AvatarGroup } from 'argf-react';\n\n<Avatar name="Alex Chen" status="online" size="medium" />\n\n<AvatarGroup max={3}>\n  <Avatar name="Arfa Alghiffari" />\n  <Avatar name="Sarah Connor" />\n  <Avatar name="Bruce Wayne" />\n  <Avatar name="Tony Stark" />\n</AvatarGroup>`}
      >
        <div className='flex flex-col md:flex-row items-center justify-around gap-8 w-full py-2'>
          <div className='flex flex-col items-center gap-3'>
            <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Sizes & Indicators</span>
            <div className='flex items-center gap-3'>
              <Avatar name='Alex Chen' size='small' status='online' />
              <Avatar src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' name='Sarah Lee' size='medium' status='online' />
              <Avatar name='Budi Santoso' size='large' status='busy' />
              <Avatar name='Zack Snyder' size='xlarge' shape='rounded' status='away' />
            </div>
          </div>

          <div className='hidden md:block w-px h-16 bg-slate-200' />

          <div className='flex flex-col items-center gap-3'>
            <span className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>Team Stack</span>
            <AvatarGroup max={3}>
              <Avatar name='Arfa Alghiffari' />
              <Avatar src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' name='Michael Scott' />
              <Avatar name='Diana Prince' />
              <Avatar name='Bruce Banner' />
              <Avatar name='Clark Kent' />
            </AvatarGroup>
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

export default AvatarPage;
