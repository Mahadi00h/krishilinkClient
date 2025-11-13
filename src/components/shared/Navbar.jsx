import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLinks = user ? (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-crops"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          All Crops
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-crop"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          Add Crops
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-posts"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          My Posts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-interests"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          My Interests
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-crops"
          className={({ isActive }) =>
            `transition-all duration-300 ${
              isActive
                ? "text-primary-600 font-semibold"
                : "text-gray-700 hover:text-primary-600"
            }`
          }
        >
          All Crops
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-display font-bold gradient-text">
                KrishiLink
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Farm to Future
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 font-medium">{navLinks}</ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="cursor-pointer flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring-2 ring-primary-500 ring-offset-2">
                        <img
                          src={
                            user.photoURL ||
                            "https://ui-avatars.com/api/?name=" +
                              user.displayName
                          }
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500">View Profile</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-white rounded-2xl w-56 border border-gray-100"
                  >
                    <li className="menu-title px-4 py-2">
                      <span className="text-gray-800 font-semibold">
                        Account
                      </span>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="px-4 py-3 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-posts"
                        className="px-4 py-3 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        My Posts
                      </Link>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-3 rounded-xl text-error hover:bg-red-50 transition-all"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="hidden sm:block px-6 py-2.5 text-gray-700 font-semibold hover:text-primary-600 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
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
                <svg
                  className="w-6 h-6"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <ul className="space-y-2">
              {navLinks}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block px-4 py-3 bg-gradient-primary text-white rounded-xl text-center font-semibold"
                    >
                      Get Started
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
