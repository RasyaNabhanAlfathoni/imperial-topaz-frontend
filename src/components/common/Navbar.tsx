import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaBars,
  FaXmark,
  FaGears,
  FaBox,
} from "react-icons/fa6";

// 👇 Tambahkan type untuk dropdown items
interface DropdownItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

interface NavLink {
  name: string;
  path: string;
  dropdown?: boolean;
  items?: DropdownItem[]; // 👈 Gunakan type DropdownItem
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks: NavLink[] = [
    // 👈 Tambahkan type di sini
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Solutions",
      path: "#",
      dropdown: true,
      items: [
        {
          name: "Our Products",
          path: "/products",
          icon: <FaBox className="w-4 h-4" />,
        },
        {
          name: "Our Services",
          path: "/services",
          icon: <FaGears className="w-4 h-4" />,
        },
      ],
    },
    { name: "Projects", path: "/projects" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Fungsi untuk cek apakah link aktif
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // 👇 Ganti any[] dengan DropdownItem[]
  const isDropdownActive = (items: DropdownItem[]) => {
    return items.some((item) => location.pathname.startsWith(item.path));
  };

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
              {link.dropdown && link.items ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-1 transition-colors relative py-2 ${
                      isDropdownActive(link.items)
                        ? "text-[#F97316]"
                        : "hover:text-[#F97316]"
                    }`}
                  >
                    {link.name} <FaChevronDown className="w-3 h-3" />
                    {/* Garis orange untuk dropdown active */}
                    {isDropdownActive(link.items) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-0 left-0 right-0 h-[2px] bg-[#F97316]"
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
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
                            className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                              isActive(item.path)
                                ? "text-[#F97316] bg-white/5"
                                : "hover:text-[#F97316]"
                            }`}
                          >
                            <span
                              className={`${
                                isActive(item.path)
                                  ? "text-[#F97316]"
                                  : "group-hover:text-white"
                              } transition-colors`}
                            >
                              {item.icon}
                            </span>
                            {item.name}
                            {/* Indicator active di dropdown */}
                            {isActive(item.path) && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`relative py-2 transition-colors ${
                    isActive(link.path)
                      ? "text-[#F97316]"
                      : "hover:text-[#F97316]"
                  }`}
                >
                  {link.name}
                  {/* Garis orange di bawah dengan animasi */}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-0 left-0 right-0 h-[2px] bg-[#F97316]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              )}
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
                  {link.dropdown && link.items ? (
                    <div className="flex flex-col">
                      <span
                        className={`font-medium py-2 ${
                          isDropdownActive(link.items)
                            ? "text-[#F97316]"
                            : "text-white"
                        }`}
                      >
                        {link.name}
                      </span>
                      <div className="pl-4 space-y-2 border-l-2 border-gray-500">
                        {link.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block py-1 ${
                              isActive(item.path)
                                ? "text-[#F97316] font-semibold"
                                : "hover:text-[#F97316]"
                            }`}
                          >
                            {item.name}
                            {isActive(item.path) && (
                              <span className="ml-2 text-[#F97316]">•</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block font-medium py-2 ${
                        isActive(link.path)
                          ? "text-[#F97316]"
                          : "text-white hover:text-[#F97316]"
                      }`}
                    >
                      {link.name}
                      {/* Indicator di mobile */}
                      {isActive(link.path) && (
                        <span className="ml-2 text-[#F97316]">▸</span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
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
