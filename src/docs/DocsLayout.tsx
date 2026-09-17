import React, { useState, useEffect } from 'react';
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
  LinkIcon,
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
      { path: '/components/menu', label: 'Menu', icon: <ThreeBarsIcon /> },
      { path: '/components/tabs', label: 'Tabs', icon: <ColumnsIcon /> },
    ],
  },
  {
    category: 'Data Display',
    items: [
      { path: '/components/badge', label: 'Badge', icon: <TagIcon /> },
      { path: '/components/avatar', label: 'Avatar', icon: <PeopleIcon /> },
      { path: '/components/card', label: 'Card', icon: <SquareIcon /> },
      { path: '/components/skeleton', label: 'Skeleton', icon: <RowsIcon /> },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { path: '/components/toast', label: 'Toast', icon: <BellIcon /> },
    ],
  },
];

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export const DocsLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
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

  // Scan headings on page change for "On this page" TOC
  useEffect(() => {
    // Slight delay to ensure child component has rendered
    const timer = setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (!mainElement) return;

      const elements = Array.from(mainElement.querySelectorAll('h1, h2, h3'));
      const items: TocHeading[] = [];

      elements.forEach((el, index) => {
        const text = el.textContent?.trim() || '';
        if (!text || text === 'argf-react' || text === 'Overview' || text === 'Installation') return;

        let id = el.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          if (!id) id = `heading-${index}`;
          el.id = id;
        }

        const level = el.tagName === 'H1' ? 1 : el.tagName === 'H2' ? 2 : 3;
        items.push({ id, text, level });
      });

      setHeadings(items);
      if (items.length > 0) {
        setActiveHeadingId(items[0].id);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Track active heading on window scroll
  useEffect(() => {
    const handleScroll = () => {
      if (headings.length === 0) return;
      const scrollPosition = window.scrollY + 120;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveHeadingId(headings[i].id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

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
                  v2.1.42
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

            <a
              href='https://github.com/argf013/argf-react'
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 transition-all shadow-xs'
              aria-label='GitHub repository'
            >
              <svg
                height='16'
                width='16'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='text-slate-800'
                aria-hidden='true'
              >
                <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
              </svg>
              <span>GitHub</span>
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

      {/* Docs Shell: Fixed Sidebar + Window Scroll Main Content + Right TOC */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex gap-8'>
        {/* Left Dashboard Sidebar - FIXED Viewport Position */}
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

        {/* Spacer on Desktop so Main Content doesn't overlap the fixed left sidebar */}
        <div className='hidden lg:block w-64 flex-shrink-0' aria-hidden='true' />

        {/* Main Content Area (uses default browser window scrollbar) */}
        <main className='flex-1 min-w-0 py-6 max-w-3xl'>
          <Outlet />

          <footer className='pt-16 pb-8 text-center text-xs text-slate-500 border-t border-slate-200/80 mt-16'>
            <p>Built with React 18, TypeScript, Tailwind CSS, and Primer Octicons.</p>
            <p className='mt-1 text-slate-400'>argf-react • Open Source Component Library</p>
          </footer>
        </main>

        {/* Right Sticky Sidebar - "On this page" TOC (Visible on XL screens) */}
        {headings.length > 0 && (
          <aside className='hidden xl:block w-56 flex-shrink-0'>
            <div className='sticky top-24 pl-4 border-l border-slate-200/80 space-y-3'>
              <div className='flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider'>
                <LinkIcon size={12} className='text-slate-400' />
                <span>On this page</span>
              </div>
              <ul className='space-y-1.5 text-xs'>
                {headings.map((h) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <li
                      key={h.id}
                      style={{ paddingLeft: h.level === 3 ? '0.75rem' : '0' }}
                    >
                      <button
                        type='button'
                        onClick={() => scrollToHeading(h.id)}
                        className={`text-left block w-full truncate transition-colors py-0.5 ${
                          isActive
                            ? 'text-blue-600 font-semibold'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                        title={h.text}
                      >
                        {h.text}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default DocsLayout;
