import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
              </svg>
            </div>
            BuildCore
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Building tomorrow, together with quality and integrity.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:bg-[#F97316] transition-colors"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:bg-[#F97316] transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:bg-[#F97316] transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:bg-[#F97316] transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:bg-[#F97316] transition-colors"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/" className="hover:text-[#F97316] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#F97316] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-[#F97316] transition-colors"
              >
                Our Products
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-[#F97316] transition-colors"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="hover:text-[#F97316] transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#F97316] transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Solutions</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link
                to="/products"
                className="hover:text-[#F97316] transition-colors"
              >
                Our Products
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-[#F97316] transition-colors"
              >
                Our Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>📞 +62 812 3456 7890</li>
              <li>✉️ info@buildcore.co.id</li>
              <li>📍 Jl. Raya Construction No. 88, Jakarta, Indonesia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Newsletter</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#1E293B] text-white rounded-md px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#F97316] px-3 rounded-md hover:bg-[#ea580c] flex items-center justify-center">
                <span className="text-white">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-gray-500">
        <p>© 2026 BuildCore. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
