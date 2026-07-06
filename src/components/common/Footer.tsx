import React from "react";
import { Link } from "react-router-dom";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Konstruksi</h3>
            <p className="text-gray-400 mb-4">
              Perusahaan konstruksi terpercaya dengan pengalaman lebih dari 10
              tahun dalam membangun infrastruktur berkualitas.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <YoutubeIcon size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Proyek
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  Jl. Contoh No. 123, Jakarta
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-400">info@konstruksi.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Jam Kerja</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-400">Senin - Jumat</p>
                  <p className="text-gray-400">08:00 - 17:00</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-400">Sabtu</p>
                  <p className="text-gray-400">08:00 - 12:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Konstruksi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
