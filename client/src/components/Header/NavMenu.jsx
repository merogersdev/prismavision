import { NavLink } from 'react-router-dom';

function NavMenu({ items }) {
  return (
    <ul className='hidden md:flex md:flex-row md:bg-white md:relative md:top-0 md:pt-0 md:px-0 md:shadow-none text-xl font-semibold'>
      {items?.map((item) => (
        <li
          key={item.name}
          className='ml-0 py-2 md:ml-8 hover:text-secondary-200 transition ease-linear duration-100 '
        >
          <NavLink to={item.link}>{item.name}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavMenu;
