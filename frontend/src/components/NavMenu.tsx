import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { logout, reset } from "../app/features/authSlice";

export default function NavMenu() {
  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <ul className="hidden md:items-center md:flex md:flex-row md:bg-white md:relative md:top-0 md:pt-0 md:px-0 md:shadow-none text-xl font-semibold">
      <li className="ml-0 py-2 md:ml-8 hover:text-secondary-200 transition ease-linear duration-100 ">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="ml-0 py-2 md:ml-8 hover:text-secondary-200 transition ease-linear duration-100 ">
        <NavLink to="/signup">Sign Up</NavLink>
      </li>

      <li>
        {user ? (
          <button
            className="ml-0 md:ml-8 py-1 px-4 border border-secondary-200 rounded hover:text-secondary-200 transition ease-linear duration-100"
            onClick={onLogout}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="ml-0 md:ml-8 py-1 px-4 border border-secondary-200 rounded hover:text-secondary-200 transition ease-linear duration-100"
          >
            Login
          </NavLink>
        )}
      </li>
    </ul>
  );
}
