import React, { useState } from 'react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className='flex p-1 cursor-pointer hover:text-secondary-300 transition ease-linear duration-100 font-normal relative z-20'
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='md:hidden relative z-20'>
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
      <ul
        className={`m-0 text-secondary-200 py-2 px-5 md:p-2 fixed right-0 md:static flex flex-col md:justify-center  md:flex-row bg-white w-full md:w-auto transition-all duration-300 ease-in ${
          isOpen ? ' top-[3.3rem]' : ' top-[-7rem]'
        }`}
      >
        <li className='hover:text-secondary-300'>Home</li>
        <li className='ml-0 md:ml-4 hover:text-secondary-300'>Login</li>
        <li className='ml-0 md:ml-4 hover:text-secondary-300'>Sign Up</li>
      </ul>
    </nav>
  );
}

export default Nav;
