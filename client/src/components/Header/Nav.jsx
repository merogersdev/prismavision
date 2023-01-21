import React, { useState } from 'react';

import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const user = null;

  const navItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Sign Up',
      link: '/signup',
    },
    {
      name: `${user ? 'Logout' : 'Login'}`,
      link: `${user ? '/logout' : '/login'}`,
    },
  ];
  return (
    <nav className='flex mr-2 relative '>
      <div
        className='md:hidden cursor-pointer z-20'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path
              fillRule='evenodd'
              d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
              clipRule='evenodd'
            />
          </svg>
        )}
      </div>
      <NavMenu items={navItems} />
      <MobileMenu items={navItems} isOpen={isOpen} />
    </nav>
  );
}

export default Nav;
