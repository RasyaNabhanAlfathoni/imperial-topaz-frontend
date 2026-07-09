import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MainLayout from "../../layouts/MainLayout";

// Import Components
import NewsHero from "../../components/news/NewsHero";
import NewsFilter from "../../components/news/NewsFilter";
import NewsCard from "../../components/news/NewsCard";
import NewsSidebar from "../../components/news/NewsSidebar";

// Import API dan types
import { newsAPI } from "../../api/news";
import type { News, NewsCategory } from "../../types/news";
import { getImageUrl } from "../../api/axios";

// ==========================================
// HALAMAN UTAMA NEWS
// ==========================================
const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  // Fungsi untuk mengambil data
  const fetchNewsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data berita dan kategori secara paralel
      const [newsData, categoriesData] = await Promise.all([
        newsAPI.getAll(),
        newsAPI.getCategories(),
      ]);

      const newsList = Array.isArray(newsData) ? newsData : [];
      const categoriesList = Array.isArray(categoriesData)
        ? categoriesData
        : [];

      // Urutkan berita berdasarkan tanggal terbaru
      const sortedNews = newsList.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      setNews(sortedNews);
      setCategories(categoriesList);
    } catch (err) {
      console.error("Error fetching news data:", err);
      setError("Gagal mengambil data berita. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  // Filter berita berdasarkan kategori
  const filteredNews =
    activeCategory === "Semua"
      ? news
      : news.filter((item) => {
          const category = categories.find(
            (c) => c.id === item.id_kategori_berita,
          );
          return category?.kategori_berita === activeCategory;
        });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Hitung jumlah berita per kategori (untuk sidebar)
  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count: news.filter((n) => n.id_kategori_berita === cat.id).length,
  }));

  // Fungsi untuk mendapatkan nama kategori
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.kategori_berita : "Uncategorized";
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <NewsHero />
        <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat berita...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <NewsHero />
        <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchNewsData}
                className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <NewsHero />

      <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
        <div className="container mx-auto px-4 md:px-8">
          {/* GRID UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* SIDEBAR */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <NewsSidebar
                categories={categoryCounts}
                popularNews={news.slice(0, 5).map((item) => ({
                  id: item.id,
                  judul: item.judul,
                  slug: item.slug,
                  thumbnail: item.thumbnail,
                  date: new Date(item.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                }))}
                onCategoryChange={handleCategoryChange}
                activeCategory={activeCategory}
              />
            </div>

            {/* KONTEN UTAMA */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Filter Kategori */}
              <NewsFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Grid Berita */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.length > 0 ? (
                  currentNews.map((item, index) => (
                    <NewsCard
                      key={item.id}
                      news={{
                        ...item,
                        kategori_berita: getCategoryName(
                          item.id_kategori_berita,
                        ),
                      }}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    Tidak ada berita dalam kategori ini.
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#F97316] hover:text-[#F97316] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? "bg-[#F97316] text-white shadow-md shadow-orange-200"
                            : "border border-gray-200 text-[#0F172A] hover:border-[#F97316] hover:text-[#F97316]"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#F97316] hover:text-[#F97316] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
