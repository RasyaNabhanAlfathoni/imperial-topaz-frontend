import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendar } from "react-icons/fa6";

interface NewsCardProps {
  news: {
    id: number;
    judul: string;
    slug: string;
    kategori_berita: string;
    thumbnail: string;
    is_featured: boolean;
    created_at?: string;
  };
  index: number;
}

const NewsCard = ({ news, index }: NewsCardProps) => {
  // Format tanggal (bisa disesuaikan dengan API)
  const formattedDate = news.created_at || "20 Mei 2025";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={news.thumbnail}
          alt={news.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge FEATURED */}
        {news.is_featured && (
          <div className="absolute top-4 left-4 bg-[#F97316] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        )}
        {/* Badge Kategori (di atas gambar) */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F172A] border border-gray-100 shadow-sm">
          {news.kategori_berita}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h4 className="font-bold text-[#0F172A] text-lg mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {news.judul}
        </h4>
        <p className="text-gray-500 text-sm mb-3 flex-grow line-clamp-2">
          {/* Deskripsi singkat bisa diambil dari konten, di sini kita pakai placeholder */}
          Dapatkan informasi terbaru seputar dunia konstruksi dan perkembangan
          perusahaan kami.
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FaCalendar className="w-3 h-3" />
            <span>{formattedDate}</span>
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
