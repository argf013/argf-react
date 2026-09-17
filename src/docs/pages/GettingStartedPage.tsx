import React from 'react';
import { CodeSnippet } from '../DocsComponents';
import useToast from '../../components/Toast/useToast';
import { CopyIcon } from '@primer/octicons-react';

export const GettingStartedPage: React.FC = () => {
  const { addToast } = useToast();

  return (
    <div className='space-y-8 max-w-3xl'>
      <div>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Installation</h1>
        <p className='text-sm text-slate-600 mt-1.5'>
          Learn how to install and setup argf-react in your React + Tailwind project.
        </p>
      </div>

      <div className='bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6'>
        <div>
          <h2 className='text-base font-bold text-slate-900'>1. Install the Package</h2>
          <p className='text-xs text-slate-500 mt-1'>Add argf-react using your favorite package manager:</p>
          <CodeSnippet code={`# pnpm\npnpm add argf-react\n\n# npm\nnpm install argf-react\n\n# yarn\nyarn add argf-react`} />
        </div>

        <div>
          <h2 className='text-base font-bold text-slate-900'>2. Import CSS Styles</h2>
          <p className='text-xs text-slate-500 mt-1'>Import the prebuilt styles in your main entry file (e.g. main.tsx or App.tsx):</p>
          <CodeSnippet code={`import 'argf-react/style.css';`} />
        </div>

        <div>
          <h2 className='text-base font-bold text-slate-900'>3. Wrap with ToastProvider (Optional)</h2>
          <p className='text-xs text-slate-500 mt-1'>If you plan on using the toast notification hook <code>useToast()</code>, wrap your application with <code>ToastProvider</code>:</p>
          <CodeSnippet code={`import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport { ToastProvider } from 'argf-react';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <ToastProvider>\n    <App />\n  </ToastProvider>\n);`} />
        </div>

        <div>
          <h2 className='text-base font-bold text-slate-900'>4. Start Using Components</h2>
          <CodeSnippet code={`import { Button, Badge, Card, useToast } from 'argf-react';\n\nexport function MyComponent() {\n  const { addToast } = useToast();\n\n  return (\n    <Button\n      label="Click Me"\n      severity="primary"\n      onClick={() => addToast({ severity: 'success', message: 'Hello World!' })}\n    />\n  );\n}`} />
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;
