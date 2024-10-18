import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const categories = [
  { name: "Indian", url: "/category/indian" },
  { name: "Italian", url: "/category/italian" },
  { name: "American", url: "/category/american" },
  { name: "Thai", url: "/category/thai" },
  { name: "Spanish", url: "/category/spanish" },
  { name: "Mexican", url: "/category/mexican" },
];

function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:flex md:items-center md:justify-between">
        {/* Logo and Branding */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-4xl font-extrabold tracking-wider text-[#ff5a60] transition duration-300 hover:text-[#ff7f7f]">
            <h1 className="flex items-center space-x-2">
              <span className="text-gray-800">Cook</span>
              <span className="text-[#ff5a60]">Recipes</span>
            </h1>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" className="text-gray-800 focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M3 6h18M3 12h18M3 18h18"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links & Search Bar */}
        <div className="md:flex md:items-center md:space-x-6 mt-4 md:mt-0">
          {/* Search Bar */}
          <div className="md:w-64 md:ml-auto">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row md:space-x-8">
            {categories.map((category) => (
              <NavLink
                key={category.name}
                to={category.url}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#ff5a60] font-semibold border-b-2 border-[#ff5a60] py-2 md:py-0 hover:shadow-md transition duration-300"
                    : "text-gray-600 hover:text-[#ff5a60] py-2 md:py-0 transition duration-300"
                }
              >
                {category.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
