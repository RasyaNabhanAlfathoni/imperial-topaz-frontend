import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import toast from "react-hot-toast";

// Import Icons
import {
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaLink,
  FaBuilding,
  FaCalendar,
  FaClock,
  FaBookmark,
  FaQuoteLeft,
  FaChevronRight,
} from "react-icons/fa6";

// Import API dan types
import { newsAPI } from "../../api/news";
import type { News, NewsCategory } from "../../types/news";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// ==========================================
// KOMPONEN - KOMPONEN
// ==========================================

// --- KOMPONEN BREADCRUMB ---
const Breadcrumb = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
    <Link to="/" className="hover:text-[#F97316] transition-colors">
      Home
    </Link>
    <span className="text-gray-300">›</span>
    <Link to="/news" className="hover:text-[#F97316] transition-colors">
      News
    </Link>
    <span className="text-gray-300">›</span>
    <span className="text-[#0F172A] font-medium">{title}</span>
  </div>
);

// --- KOMPONEN SHARE BUTTONS ---
const ShareButtons = () => {
  const url = window.location.href;
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link berhasil disalin!", {
          duration: 3000,
          position: "bottom-right",
          style: {
            background: "#0F172A",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
          icon: "🔗",
        });
      })
      .catch(() => {
        toast.error("Gagal menyalin link!", {
          duration: 3000,
          position: "bottom-right",
        });
      });
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all"
      >
        <FaFacebookF className="w-4 h-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all"
      >
        <FaTwitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all"
      >
        <FaLinkedinIn className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopyLink}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all"
      >
        <FaLink className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- KOMPONEN KONTEN UTAMA BERITA ---
interface NewsContentProps {
  news: News;
  categoryName: string;
}

const NewsContent = ({ news, categoryName }: NewsContentProps) => {
  // Format tanggal
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Hitung estimasi waktu baca (1 menit per 200 kata)
  const getReadTime = (content: string): string => {
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} menit baca`;
  };

  // Fungsi untuk mendapatkan thumbnail
  const getThumbnail = (): string => {
    if (!news.thumbnail) return PLACEHOLDER_IMAGE;
    return news.thumbnail.startsWith("http")
      ? news.thumbnail
      : getImageUrl(news.thumbnail);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Breadcrumb */}
      <Breadcrumb title={news.judul} />

      {/* Badge FEATURED */}
      {news.is_featured && (
        <div>
          <span className="bg-[#F97316] text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-block">
            FEATURED
          </span>
        </div>
      )}

      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
        {news.judul}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaBuilding className="w-4 h-4 text-[#0F172A]" />
          <span className="text-[#0F172A] font-medium">
            {categoryName || "Uncategorized"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendar className="w-4 h-4 text-[#0F172A]" />
          <span>{formatDate(news.created_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="w-4 h-4 text-[#0F172A]" />
          <span>{getReadTime(news.konten)}</span>
        </div>
      </div>

      {/* Gambar Utama */}
      <div className="rounded-2xl overflow-hidden shadow-sm bg-gray-100">
        <img
          src={getThumbnail()}
          alt={news.judul}
          className="w-full h-[300px] md:h-[450px] object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>

      {/* Konten Berita (HTML) */}
      <div
        className="prose prose-base md:prose-lg max-w-none text-gray-600 leading-relaxed prose-headings:text-[#0F172A] prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1 prose-a:text-[#F97316] prose-strong:text-[#0F172A]"
        dangerouslySetInnerHTML={{ __html: news.konten }}
      />
    </motion.div>
  );
};

// --- KOMPONEN SIDEBAR ---
interface NewsSidebarProps {
  popularNews: News[];
  categories: NewsCategory[];
  onCategoryChange?: (category: string) => void;
}

const NewsSidebar = ({
  popularNews,
  categories,
  onCategoryChange,
}: NewsSidebarProps) => {
  // Format tanggal
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fungsi untuk mendapatkan thumbnail
  const getThumbnail = (thumbnail?: string): string => {
    if (!thumbnail) return PLACEHOLDER_IMAGE;
    return thumbnail.startsWith("http") ? thumbnail : getImageUrl(thumbnail);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Bagikan Berita */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-bold text-[#0F172A] text-lg mb-4">
          Bagikan Berita
        </h4>
        <ShareButtons />
      </div>

      {/* Berita Populer */}
      {popularNews.length > 0 && (
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
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={getThumbnail(news.thumbnail)}
                    alt={news.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h5 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors line-clamp-2">
                    {news.judul}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <FaCalendar className="w-3 h-3" />
                    <span>{formatDate(news.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ==========================================
// HALAMAN UTAMA NEWS DETAIL
// ==========================================
const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [allNews, setAllNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data
  const fetchNewsDetail = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      // Ambil data berita detail, semua berita, dan kategori secara paralel
      const [newsData, allNewsData, categoriesData] = await Promise.all([
        newsAPI.getBySlug(slug),
        newsAPI.getAll(),
        newsAPI.getCategories(),
      ]);

      console.log("News Detail:", newsData);
      console.log("All News:", allNewsData);
      console.log("Categories:", categoriesData);

      if (!newsData || !newsData.id) {
        throw new Error("News not found");
      }

      setNews(newsData);
      setAllNews(Array.isArray(allNewsData) ? allNewsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Error fetching news detail:", err);
      setError("Gagal mengambil detail berita. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetail();
  }, [slug]);

  // Fungsi untuk mendapatkan nama kategori
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.kategori_berita : "Uncategorized";
  };

  // Fungsi untuk mendapatkan berita populer (selain berita ini)
  const getPopularNews = (): News[] => {
    if (!news) return [];
    return allNews.filter((item) => item.id !== news.id).slice(0, 5);
  };

  // Fungsi untuk handle perubahan kategori (redirect ke halaman news dengan filter)
  const handleCategoryChange = (categoryName: string) => {
    window.location.href = `/news?category=${encodeURIComponent(categoryName)}`;
  };

  // Loading state
  if (loading) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat detail berita...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 text-lg mb-4">
              {error || "Berita tidak ditemukan"}
            </p>
            <button
              onClick={fetchNewsDetail}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
            <Link to="/news" className="mt-4 text-[#F97316] hover:underline">
              Kembali ke Berita
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const popularNews = getPopularNews();
  const categoryName = getCategoryName(news.id_kategori_berita);

  return (
    <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* KOLOM KIRI & TENGAH: Konten Utama (2/3 lebar) */}
          <div className="lg:col-span-2">
            <NewsContent news={news} categoryName={categoryName} />
          </div>

          {/* KOLOM KANAN: Sidebar (1/3 lebar) */}
          <div className="lg:col-span-1">
            <NewsSidebar
              popularNews={popularNews}
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* Tombol Kembali ke Semua Berita */}
        <div className="mt-12 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[#0F172A] hover:text-[#F97316] transition-colors font-medium"
          >
            <FaArrowRight className="rotate-180" />
            Kembali ke Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailPage;
