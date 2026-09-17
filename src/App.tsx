import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DocsLayout from './docs/DocsLayout';
import OverviewPage from './docs/pages/OverviewPage';
import GettingStartedPage from './docs/pages/GettingStartedPage';
import ButtonPage from './docs/pages/ButtonPage';
import DialogPage from './docs/pages/DialogPage';
import DialogConfirmPage from './docs/pages/DialogConfirmPage';
import InputPage from './docs/pages/InputPage';
import DropdownPage from './docs/pages/DropdownPage';
import SwitchPage from './docs/pages/SwitchPage';
import AccordionPage from './docs/pages/AccordionPage';
import MenuPage from './docs/pages/MenuPage';
import TabsPage from './docs/pages/TabsPage';
import BadgePage from './docs/pages/BadgePage';
import AvatarPage from './docs/pages/AvatarPage';
import CardPage from './docs/pages/CardPage';
import SkeletonPage from './docs/pages/SkeletonPage';
import ToastPage from './docs/pages/ToastPage';

function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route path='/' element={<OverviewPage />} />
        <Route path='/getting-started' element={<GettingStartedPage />} />
        <Route path='/components/button' element={<ButtonPage />} />
        <Route path='/components/dialog' element={<DialogPage />} />
        <Route path='/components/dialog-confirm' element={<DialogConfirmPage />} />
        <Route path='/components/input' element={<InputPage />} />
        <Route path='/components/dropdown' element={<DropdownPage />} />
        <Route path='/components/switch' element={<SwitchPage />} />
        <Route path='/components/accordion' element={<AccordionPage />} />
        <Route path='/components/menu' element={<MenuPage />} />
        <Route path='/components/tabs' element={<TabsPage />} />
        <Route path='/components/badge' element={<BadgePage />} />
        <Route path='/components/avatar' element={<AvatarPage />} />
        <Route path='/components/card' element={<CardPage />} />
        <Route path='/components/skeleton' element={<SkeletonPage />} />
        <Route path='/components/toast' element={<ToastPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
