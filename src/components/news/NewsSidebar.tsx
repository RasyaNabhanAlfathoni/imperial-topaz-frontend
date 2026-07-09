import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTag, FaFire, FaMagnifyingGlass, FaCalendar } from "react-icons/fa6";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

interface NewsSidebarProps {
  categories: {
    id: number;
    kategori_berita: string;
    count: number;
  }[];
  popularNews: {
    id: number;
    judul: string;
    slug: string;
    thumbnail?: string;
    date: string;
  }[];
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

const NewsSidebar = ({
  categories,
  popularNews,
  onCategoryChange,
  activeCategory,
}: NewsSidebarProps) => {
  const getThumbnail = (thumbnail?: string): string => {
    if (!thumbnail) return PLACEHOLDER_IMAGE;
    return thumbnail.startsWith("http") ? thumbnail : getImageUrl(thumbnail);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari berita..."
            className="w-full border border-gray-200 rounded-lg py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F97316]">
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>

      {/* Kategori (SEKARANG BISA DIKLIK) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-bold text-[#0F172A] text-lg mb-4">Kategori</h4>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onCategoryChange("Semua")}
              className={`flex justify-between items-center w-full text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                activeCategory === "Semua"
                  ? "text-[#F97316] bg-orange-50"
                  : "text-gray-600 hover:text-[#F97316] hover:bg-gray-50"
              }`}
            >
              <span>Semua</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryChange(cat.kategori_berita)}
                className={`flex justify-between items-center w-full text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === cat.kategori_berita
                    ? "text-[#F97316] bg-orange-50"
                    : "text-gray-600 hover:text-[#F97316] hover:bg-gray-50"
                }`}
              >
                <span>{cat.kategori_berita}</span>
                <span className="text-gray-400 text-xs">
                  ({cat.count || 0})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Berita Populer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-bold text-[#0F172A] text-lg mb-4">
          Berita Populer
        </h4>
        <div className="space-y-4">
          {popularNews.slice(0, 3).map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.slug}`}
              className="flex gap-4 group"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <img
                  src={getThumbnail(news.thumbnail)}
                  alt={news.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors line-clamp-2">
                  {news.judul}
                </h5>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <FaCalendar className="w-3 h-3" />
                  <span>{news.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsSidebar;
