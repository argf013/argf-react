import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/Toast/ToastProvider';
import './index.css';
import '../style.css';
import App from './App.tsx';
import Playground from './playground/Playground';

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </Router>
  </ToastProvider>,
);
