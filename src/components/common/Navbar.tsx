import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaBars, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Solutions",
      path: "#",
      dropdown: true,
      items: [
        { name: "Our Products", path: "/products" },
        { name: "Our Services", path: "/services" },
      ],
    },
    { name: "Projects", path: "/projects" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0F172A] shadow-md z-50 py-4">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </svg>
          </div>
          BuildCore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 hover:text-[#F97316] transition-colors"
                >
                  {link.name} <FaChevronDown className="w-3 h-3" />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="hover:text-[#F97316] transition-colors"
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.dropdown && isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-[#0F172A] shadow-xl rounded-lg overflow-hidden"
                  >
                    {link.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-3 hover:bg-[#0F172A] hover:text-[#F97316] transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="hidden md:block bg-[#F97316] hover:bg-[#ea580c] text-white px-6 py-2.5 rounded-md font-semibold transition-all hover:shadow-lg"
        >
          Get in Touch
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F172A] overflow-hidden text-white"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="flex flex-col">
                      <span className="font-medium text-white py-2">
                        {link.name}
                      </span>
                      <div className="pl-4 space-y-2 border-l-2 border-gray-500">
                        {link.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block hover:text-[#F97316] py-1"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="block font-medium text-white hover:text-[#F97316] py-2"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="bg-[#F97316] text-white text-center px-6 py-2.5 rounded-md font-semibold mt-2"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
