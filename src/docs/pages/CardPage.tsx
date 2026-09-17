import React from 'react';
import { ComponentCard, PropsTable } from '../DocsComponents';
import Card, { CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import useToast from '../../components/Toast/useToast';

export const CardPage: React.FC = () => {
  const { addToast } = useToast();

  const propsData = [
    { prop: 'variant', type: "'default' | 'outline' | 'flat'", default: "'default'", description: 'Border and background style.' },
    { prop: 'hoverable', type: 'boolean', default: 'false', description: 'Enables shadow elevation and lift on hover.' },
    { prop: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes.' },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Card</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Flexible content container with composable Header, Title, Description, Body, and Footer blocks.
        </p>
      </div>

      <ComponentCard
        title='Default & Outline Cards'
        description='Composable subcomponents allow easy arrangement of titles, badges, and actions.'
        badge='<Card />'
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, Button } from 'argf-react';\n\n<Card hoverable>\n  <CardHeader>\n    <CardTitle>Analytics Project</CardTitle>\n    <CardDescription>Created by Muhamad Arfa</CardDescription>\n  </CardHeader>\n  <CardBody>Track visits, conversions, and metrics.</CardBody>\n  <CardFooter>\n    <span>ID: #PRJ-2026</span>\n    <Button label="Explore" severity="primary" rounded />\n  </CardFooter>\n</Card>`}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl'>
          <Card hoverable>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle>Standard Card</CardTitle>
                <Badge label='New' severity='success' variant='soft' />
              </div>
              <CardDescription>Card with header, body, and footer</CardDescription>
            </CardHeader>
            <CardBody>
              Modular layout makes it straightforward to arrange headers, descriptions, custom media, and actions seamlessly.
            </CardBody>
            <CardFooter>
              <span className='text-slate-400 font-mono text-[11px]'>ID: #PRJ-2026</span>
              <Button label='Explore' severity='primary' rounded onClick={() => addToast({ severity: 'success', message: 'Card explored!' })} />
            </CardFooter>
          </Card>

          <Card variant='outline' className='flex flex-col justify-between'>
            <CardHeader>
              <CardTitle>Outline Variant</CardTitle>
              <CardDescription>Clean border style without card background shadow</CardDescription>
            </CardHeader>
            <CardBody>
              Suitable for secondary widgets, filter panels, or clean minimal dashboards.
            </CardBody>
            <CardFooter className='bg-transparent border-slate-100'>
              <span className='text-slate-500 text-xs font-medium'>Status: In Review</span>
              <Badge label='Pending' severity='warning' variant='outline' />
            </CardFooter>
          </Card>
        </div>
      </ComponentCard>

      <div className='space-y-3 pt-4'>
        <h2 className='text-lg font-bold text-slate-900'>Props Reference</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default CardPage;
