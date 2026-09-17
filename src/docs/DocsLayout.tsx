import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  PackageIcon,
  SearchIcon,
  ThreeBarsIcon,
  XIcon,
  HomeIcon,
  PlayIcon,
  CommentDiscussionIcon,
  AlertFillIcon,
  SingleSelectIcon,
  RowsIcon,
  SlidersIcon,
  ColumnsIcon,
  TagIcon,
  PeopleIcon,
  SquareIcon,
  BellIcon,
} from '@primer/octicons-react';

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export interface NavGroup {
  category: string;
  items: NavItem[];
}

export const navigationGroups: NavGroup[] = [
  {
    category: 'General',
    items: [
      { path: '/', label: 'Overview', icon: <HomeIcon /> },
      { path: '/getting-started', label: 'Installation', icon: <PackageIcon /> },
    ],
  },
  {
    category: 'Buttons',
    items: [
      { path: '/components/button', label: 'Button', icon: <PlayIcon /> },
    ],
  },
  {
    category: 'Modals & Dialogs',
    items: [
      { path: '/components/dialog', label: 'Dialog', icon: <CommentDiscussionIcon /> },
      { path: '/components/dialog-confirm', label: 'DialogConfirm', icon: <AlertFillIcon /> },
    ],
  },
  {
    category: 'Forms & Inputs',
    items: [
      { path: '/components/input', label: 'Input', icon: <SingleSelectIcon /> },
      { path: '/components/dropdown', label: 'Dropdown', icon: <RowsIcon /> },
      { path: '/components/switch', label: 'Switch', icon: <SlidersIcon /> },
    ],
  },
  {
    category: 'Navigation',
    items: [
      { path: '/components/accordion', label: 'Accordion', icon: <RowsIcon /> },
      { path: '/components/menu', label: 'Menu (Kebab)', icon: <ColumnsIcon /> },
      { path: '/components/tabs', label: 'Tabs', icon: <ColumnsIcon /> },
    ],
  },
  {
    category: 'Data Display',
    items: [
      { path: '/components/badge', label: 'Badge', icon: <TagIcon /> },
      { path: '/components/avatar', label: 'Avatar', icon: <PeopleIcon /> },
      { path: '/components/card', label: 'Card', icon: <SquareIcon /> },
      { path: '/components/skeleton', label: 'Skeleton', icon: <PackageIcon /> },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { path: '/components/toast', label: 'Toast', icon: <BellIcon /> },
    ],
  },
];

export const DocsLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Filter navigation items by search
  const filteredGroups = navigationGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className='min-h-screen bg-slate-50/60 text-slate-800 font-sans'>
      {/* Top Fixed Header */}
      <header className='fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-16 transition-all'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className='lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none'
              aria-label='Toggle navigation menu'
            >
              {mobileSidebarOpen ? <XIcon size={20} /> : <ThreeBarsIcon size={20} />}
            </button>

            <NavLink to='/' className='flex items-center gap-3 group'>
              <div className='w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors'>
                <PackageIcon />
              </div>
              <div className='flex items-center'>
                <span className='font-bold text-slate-900 tracking-tight text-lg'>
                  argf-react
                </span>
                <span className='ml-2 text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200'>
                  v2.1.40
                </span>
              </div>
            </NavLink>
          </div>

          <div className='flex items-center gap-4'>
            {/* Quick search input */}
            <div className='relative hidden sm:block w-48 lg:w-60'>
              <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400'>
                <SearchIcon />
              </div>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search docs...'
                className='w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 transition-all'
              />
            </div>

            <NavLink
              to='/playground'
              className='text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors hidden md:block'
            >
              Playground
            </NavLink>

            <a
              href='https://github.com/argf013/argf-react'
              target='_blank'
              rel='noreferrer'
              className='px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-xs'
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className='fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden'
        />
      )}

      {/* Docs Shell: Fixed Sidebar + Window Scroll Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex gap-8'>
        {/* Left Dashboard Sidebar - FIXED Viewport Position (Never moves on scroll) */}
        <aside
          className={`fixed top-16 bottom-0 left-0 z-30 w-72 bg-white/95 backdrop-blur-md border-r border-slate-200/90 p-5 overflow-y-auto transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:left-auto lg:w-64 lg:p-0 lg:py-6 lg:bg-transparent lg:border-0 ${
            mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          <div className='h-full overflow-y-auto pr-1 pb-6 space-y-5 rounded-2xl lg:p-4 lg:bg-white lg:border lg:border-slate-200/80 lg:shadow-xs scrollbar-thin'>
            {filteredGroups.map((group) => (
              <div key={group.category}>
                <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2.5 mb-1.5'>
                  {group.category}
                </span>
                <ul className='space-y-0.5 text-xs font-medium'>
                  {group.items.map((item) => {
                    const isActive =
                      item.path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.path);

                    return (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-all ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <div className='flex items-center gap-2.5'>
                            <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          {isActive && (
                            <span className='w-1.5 h-1.5 rounded-full bg-blue-600' />
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Spacer on Desktop so Main Content doesn't overlap the fixed sidebar */}
        <div className='hidden lg:block w-64 flex-shrink-0' aria-hidden='true' />

        {/* Main Content Area (uses default browser window scrollbar) */}
        <main className='flex-1 min-w-0 py-6'>
          <Outlet />

          <footer className='pt-16 pb-8 text-center text-xs text-slate-500 border-t border-slate-200/80 mt-16'>
            <p>Built with React 18, TypeScript, Tailwind CSS, and Primer Octicons.</p>
            <p className='mt-1 text-slate-400'>argf-react • Open Source Component Library</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
