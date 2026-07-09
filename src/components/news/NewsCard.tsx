import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa6";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

interface NewsCardProps {
  news: {
    id: number;
    judul: string;
    slug: string;
    kategori_berita: string;
    thumbnail?: string;
    is_featured: boolean;
    created_at?: string;
    konten?: string;
  };
  index: number;
}

const NewsCard = ({ news, index }: NewsCardProps) => {
  // Fungsi untuk mendapatkan thumbnail
  const getThumbnail = (): string => {
    if (!news.thumbnail) return PLACEHOLDER_IMAGE;
    return news.thumbnail.startsWith("http")
      ? news.thumbnail
      : getImageUrl(news.thumbnail);
  };

  // Format tanggal
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Tanggal tidak tersedia";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fungsi untuk strip HTML dan truncate
  const stripHtmlAndTruncate = (
    html: string,
    maxLength: number = 100,
  ): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Dapatkan preview konten
  const getContentPreview = (): string => {
    if (news.konten) {
      return stripHtmlAndTruncate(news.konten, 100);
    }
    return "Dapatkan informasi terbaru seputar dunia konstruksi dan perkembangan perusahaan kami.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      <div className="h-48 overflow-hidden relative bg-gray-100">
        <img
          src={getThumbnail()}
          alt={news.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
          loading="lazy"
        />
        {/* Badge FEATURED */}
        {news.is_featured && (
          <div className="absolute top-4 left-4 bg-[#F97316] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        )}
        {/* Badge Kategori */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F172A] border border-gray-100 shadow-sm">
          {news.kategori_berita || "Uncategorized"}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h4 className="font-bold text-[#0F172A] text-lg mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {news.judul}
        </h4>
        <p className="text-gray-500 text-sm mb-3 flex-grow line-clamp-2">
          {getContentPreview()}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FaCalendar className="w-3 h-3" />
            <span>{formatDate(news.created_at)}</span>
          </div>
          <Link
            to={`/news/${news.slug}`}
            className="text-[#F97316] text-sm font-semibold hover:translate-x-1 transition-transform flex items-center gap-1"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
