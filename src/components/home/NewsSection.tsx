import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

// Import API dan types
import { newsAPI } from "../../api/news";
import type { News } from "../../types/news";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// Fungsi untuk format tanggal
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fungsi untuk strip HTML tags dan truncate text
const stripHtmlAndTruncate = (
  html: string,
  maxLength: number = 100,
): string => {
  // Buat temporary div untuk parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  // Ambil text content tanpa HTML tags
  const text = tempDiv.textContent || tempDiv.innerText || "";
  // Truncate
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Fungsi untuk mendapatkan preview konten (tanpa HTML)
const getContentPreview = (html: string, maxLength: number = 100): string => {
  return stripHtmlAndTruncate(html, maxLength);
};

const NewsSection = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Fungsi untuk mengambil data dari API
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsAPI.getAll();

      // Urutkan berita berdasarkan tanggal terbaru
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      setNews(sortedData);
      setFailedImages(new Set());
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Gagal mengambil data berita. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali di-render
  useEffect(() => {
    fetchNews();
  }, []);

  // Fungsi untuk mendapatkan thumbnail
  const getThumbnail = (newsItem: News): string => {
    if (!newsItem.thumbnail || failedImages.has(newsItem.id)) {
      return PLACEHOLDER_IMAGE;
    }
    return getImageUrl(newsItem.thumbnail);
  };

  // Handle error gambar
  const handleImageError = (newsId: number) => {
    setFailedImages((prev) => new Set(prev).add(newsId));
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat berita...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Jika tidak ada data
  if (news.length === 0) {
    return (
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-left w-full mb-12">
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              Latest News
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Latest News & Insights
            </h2>
          </div>
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">Belum ada berita.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="text-left w-full md:w-auto">
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              Latest News
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Latest News & Insights
            </h2>
          </div>
          <Link
            to="/news"
            className="mt-6 md:mt-0 inline-flex items-center self-end bg-white border border-gray-200 shadow-sm hover:shadow-md text-[#0F172A] px-6 py-3 rounded-md font-bold transition-all md:self-auto"
          >
            View All News <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* SWIPER SLIDER (Mobile) & GRID (Desktop) */}
        <div className="relative">
          {/* Mobile Version */}
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="pb-10"
            >
              {news.map((newsItem) => (
                <SwiperSlide key={newsItem.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group h-full flex flex-col"
                  >
                    <div className="h-48 overflow-hidden shrink-0 bg-gray-100 relative">
                      <img
                        src={getThumbnail(newsItem)}
                        alt={newsItem.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(newsItem.id)}
                        loading="lazy"
                      />
                      {newsItem.is_featured && (
                        <div className="absolute top-3 left-3 bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <p className="text-xs text-gray-400 font-medium">
                        {formatDate(newsItem.created_at)}
                      </p>
                      <h4 className="font-bold text-[#0F172A] text-lg my-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
                        {newsItem.judul}
                      </h4>
                      {/* Render konten tanpa HTML tags */}
                      <div
                        className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow"
                        dangerouslySetInnerHTML={{
                          __html: getContentPreview(newsItem.konten, 100),
                        }}
                      />
                      <Link
                        to={`/news/${newsItem.slug}`}
                        className="text-sm font-semibold text-[#0F172A] group-hover:gap-2 flex items-center transition-all mt-auto"
                      >
                        Read More <FaArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Version */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {news.map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group h-full flex flex-col"
              >
                <div className="h-48 overflow-hidden shrink-0 bg-gray-100 relative">
                  <img
                    src={getThumbnail(newsItem)}
                    alt={newsItem.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(newsItem.id)}
                    loading="lazy"
                  />
                  {newsItem.is_featured && (
                    <div className="absolute top-3 left-3 bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-xs text-gray-400 font-medium">
                    {formatDate(newsItem.created_at)}
                  </p>
                  <h4 className="font-bold text-[#0F172A] text-lg my-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
                    {newsItem.judul}
                  </h4>
                  {/* Render konten tanpa HTML tags */}
                  <div
                    className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow"
                    dangerouslySetInnerHTML={{
                      __html: getContentPreview(newsItem.konten, 100),
                    }}
                  />
                  <Link
                    to={`/news/${newsItem.slug}`}
                    className="text-sm font-semibold text-[#0F172A] group-hover:gap-2 flex items-center transition-all mt-auto"
                  >
                    Read More <FaArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
