import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import MainLayout from "../../layouts/MainLayout";

// Import Components
import NewsHero from "../../components/news/NewsHero";
import NewsFilter from "../../components/news/NewsFilter";
import NewsCard from "../../components/news/NewsCard";
import NewsSidebar from "../../components/news/NewsSidebar";

// ==========================================
// 1. DATA DUMMY KATEGORI BERITA (kategori_beritas)
// ==========================================
const categoriesData = [
  { id: 1, kategori_berita: "Perusahaan" },
  { id: 2, kategori_berita: "Proyek" },
  { id: 3, kategori_berita: "Industri" },
  { id: 4, kategori_berita: "Tips & Edukasi" },
  { id: 5, kategori_berita: "Event" },
];

// ==========================================
// 2. DATA DUMMY BERITA (beritas)
// ==========================================
const newsData = [
  {
    id: 1,
    judul: "BuildCore Raih Penghargaan Kontraktor Terbaik 2024",
    slug: "buildcore-raih-penghargaan-kontraktor-terbaik-2024",
    konten:
      "Penghargaan ini menjadi bukti komitmen kami dalam memberikan hasil terbaik bagi klien.",
    id_kategori_berita: 1,
    kategori_berita: "Perusahaan",
    thumbnail:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    is_featured: true,
    created_at: "20 Mei 2025",
  },
  {
    id: 2,
    judul: "Proyek Jembatan Cikampek Toll Road Section 2 Selesai",
    slug: "proyek-jembatan-cikampek-toll-road-section-2-selesai",
    konten:
      "Pembangunan jembatan sepanjang 1,2 km telah selesai dengan hasil sesuai standar.",
    id_kategori_berita: 2,
    kategori_berita: "Proyek",
    thumbnail:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
    is_featured: true,
    created_at: "18 Mei 2025",
  },
  {
    id: 3,
    judul: "Tren Konstruksi 2025: Inovasi & Keberlanjutan",
    slug: "tren-konstruksi-2025-inovasi-keberlanjutan",
    konten:
      "Industri konstruksi terus berkembang dengan teknologi baru dan pendekatan berkelanjutan.",
    id_kategori_berita: 3,
    kategori_berita: "Industri",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    is_featured: true,
    created_at: "16 Mei 2025",
  },
  {
    id: 4,
    judul: "5 Tips Memilih Material Konstruksi Berkualitas",
    slug: "5-tips-memilih-material-konstruksi-berkualitas",
    konten:
      "Panduan singkat untuk memilih material konstruksi yang tepat dan tahan lama.",
    id_kategori_berita: 4,
    kategori_berita: "Tips & Edukasi",
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    is_featured: false,
    created_at: "12 Mei 2025",
  },
  {
    id: 5,
    judul: "BuildCore Gelar Safety Training untuk Seluruh Karyawan",
    slug: "buildcore-gelar-safety-training-untuk-seluruh-karyawan",
    konten:
      "Pelatihan keselamatan kerja rutin untuk meningkatkan budaya kerja yang aman.",
    id_kategori_berita: 1,
    kategori_berita: "Perusahaan",
    thumbnail:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    is_featured: false,
    created_at: "8 Mei 2025",
  },
  {
    id: 6,
    judul: "BuildCore Hadiri Indonesia Construction Expo 2025",
    slug: "buildcore-hadiri-indonesia-construction-expo-2025",
    konten: "Partisipasi kami dalam pameran konstruksi terbesar di Indonesia.",
    id_kategori_berita: 5,
    kategori_berita: "Event",
    thumbnail:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
    is_featured: false,
    created_at: "5 Mei 2025",
  },
];

// ==========================================
// 3. DATA BERITA POPULER (Untuk Sidebar)
// ==========================================
const popularNewsData = [
  {
    id: 2,
    judul: "Proyek Jembatan Cikampek Toll Road Section 2 Selesai",
    slug: "proyek-jembatan-cikampek-toll-road-section-2-selesai",
    thumbnail:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
    date: "18 Mei 2025",
  },
  {
    id: 3,
    judul: "Tren Konstruksi 2025: Inovasi & Keberlanjutan",
    slug: "tren-konstruksi-2025-inovasi-keberlanjutan",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    date: "16 Mei 2025",
  },
  {
    id: 1,
    judul: "BuildCore Raih Penghargaan Kontraktor Terbaik 2024",
    slug: "buildcore-raih-penghargaan-kontraktor-terbaik-2024",
    thumbnail:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    date: "20 Mei 2025",
  },
];

// ==========================================
// 4. HALAMAN UTAMA NEWS
// ==========================================
const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter berita berdasarkan kategori
  const filteredNews =
    activeCategory === "Semua"
      ? newsData
      : newsData.filter((news) => news.kategori_berita === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Hitung jumlah berita per kategori (untuk sidebar)
  const categoryCounts = categoriesData.map((cat) => ({
    ...cat,
    count: newsData.filter((n) => n.kategori_berita === cat.kategori_berita)
      .length,
  }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fungsi untuk mengubah kategori (dipanggil dari Sidebar & Filter)
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset ke halaman 1 saat ganti filter
  };

  return (
    <>
      <NewsHero />

      <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
        <div className="container mx-auto px-4 md:px-8">
          {/* GRID UTAMA: Mobile (Sidebar di atas, Konten di bawah) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* 
              KOLOM SIDEBAR: 
              - Di Mobile: order-1 (Paling atas)
              - Di Desktop: lg:order-2 (Kanan)
            */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <NewsSidebar
                categories={categoryCounts}
                popularNews={popularNewsData}
                onCategoryChange={handleCategoryChange}
                activeCategory={activeCategory}
              />
            </div>

            {/* 
              KOLOM KONTEN UTAMA: 
              - Di Mobile: order-2 (Di bawah sidebar)
              - Di Desktop: lg:order-1 (Kiri)
            */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Filter Kategori (Tombol di atas konten) */}
              <NewsFilter
                categories={categoriesData}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Grid Berita */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.length > 0 ? (
                  currentNews.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
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
