import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isRegDropdownOpen, setIsRegDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const navigate = useNavigate();

  const toggleRegDropdown = () => {
    setIsRegDropdownOpen(!isRegDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRegDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
const token=localStorage.getItem("token");
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl text-blue-600">
                Techerudite
              </span>
            </div>
          </div>
          {token ? (
            <>
              <div className="flex items-center relative">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleRegDropdown}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                  >
                    Register
                  </button>
                  {isRegDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        onClick={toggleRegDropdown}
                        to={"/customer-registration"}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Customer Registration
                      </Link>
                      <Link
                        onClick={toggleRegDropdown}
                        to="/admin-registration"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Admin Registration
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
