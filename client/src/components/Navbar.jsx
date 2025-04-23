import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
// import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const menuItems = (
    <>
      <NavLink
        to="/"
        onClick={handleLinkClick}
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/cart"
        onClick={handleLinkClick}
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
        }
      >
        Cart
      </NavLink>
      {user ? (
        <>
          <NavLink
            to="/orders"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/profile"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-700"
          onClick={() => window.scrollTo(0, 0)}
        >
          A.K.Kumar
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          {menuItems}
          {/* <DarkModeToggle /> */}
        </div>

        {/* Mobile Hamburger */}
        {/* <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div> */}
        {/* Mobile Hamburger / Close Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            {isOpen ? (
              // X icon
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden px-4 pb-4 text-gray-700 font-medium flex flex-col transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 max-h-screen"
            : "opacity-0 -translate-y-5 max-h-0 overflow-hidden"
        }`}
      >
        {menuItems}
        {/* <DarkModeToggle /> */}
      </div>
    </nav>
  );
}
