import { NavLink } from 'react-router-dom';

function NavMenuMobile({ items, isOpen }) {
  return (
    <ul
      className={`flex flex-col items-center justify-center px-5 fixed ${
        isOpen ? 'top-0' : 'top-[-55%]'
      } left-0 w-full bg-gray-50 h-3/6 transiton-[top] duration-300 shadow text-xl font-semibold z-10`}
    >
      {items?.map((item) => (
        <li
          key={item.name}
          className='ml-0 py-2 md:ml-4 hover:text-secondary-200 transition ease-linear duration-100'
        >
          <NavLink to={item.link}>{item.name}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavMenuMobile;
