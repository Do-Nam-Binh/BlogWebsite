import { Link, Outlet } from "react-router-dom";
import { LogoutApi } from "./LogoutApi";

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { handleLogout } = LogoutApi();
  return (
    <>
      <header className="flex border-b py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide z-50 sticky top-0">
        <div className="flex flex-wrap items-center gap-4 w-full">
          <Link to="/">
            <h3 className="text-2xl font-semibold">Simply Bloggin</h3>
          </Link>

          <div className="lg:!flex lg:flex-auto lg:ml-12 max-lg:hidden max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
            <div className="lg:!flex lg:flex-auto max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 justify-end">
              <ul className="lg:flex lg:gap-x-8 max-lg:space-y-2">
                <li className="mb-6 hidden max-lg:block">
                  <a href="">
                    <img src="" className="w-36" />
                  </a>
                </li>
                <li className="max-lg:border-b max-lg:py-3">
                  <Link
                    to="/"
                    className="hover:text-[#007bff] text-[#007bff] block font-bold text-[15px]"
                  >
                    Home
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3">
                  <Link
                    to="/projects"
                    className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
                  >
                    Projects
                  </Link>
                </li>
                <li className="max-lg:border-b max-lg:py-3">
                  <Link
                    to="/about"
                    className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-l border-[#333] h-6 max-lg:hidden"></div>

          <div className="flex items-center ml-auto space-x-6">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
              >
                Log in
              </Link>
            ) : (
              <button
                className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default NavBar;
