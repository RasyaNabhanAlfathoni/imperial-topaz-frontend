import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

// ==========================================
// 1. DATA DUMMY BERITA DETAIL (Sesuai gambar)
// ==========================================
// Data ini akan diambil dari API berdasarkan slug/id
const newsDetailData = {
  id: 1,
  judul: "BuildCore Raih Penghargaan Kontraktor Terbaik 2024",
  slug: "buildcore-raih-penghargaan-kontraktor-terbaik-2024",
  konten: `
    <p>BuildCore dengan bangga mengumumkan bahwa kami telah meraih penghargaan <strong>"Kontraktor Terbaik 2024"</strong> dalam ajang Indonesia Construction Excellence Awards (ICEA) yang diselenggarakan oleh Asosiasi Konstruksi Indonesia.</p>

    <h3>Penghargaan atas Komitmen & Dedikasi</h3>
    <p>Penghargaan ini diberikan sebagai bentuk apresiasi atas dedikasi kami dalam menghadirkan proyek-proyek berkualitas tinggi, tepat waktu, dan mengutamakan keselamatan kerja serta keberlanjutan lingkungan.</p>

    <h3>Kriteria Penilaian</h3>
    <p>Beberapa kriteria yang menjadi bahan penilaian dalam penghargaan ini antara lain:</p>
    <ul>
      <li>Kualitas hasil pekerjaan</li>
      <li>Ketepatan waktu penyelesaian proyek</li>
      <li>Inovasi dan penerapan teknologi</li>
      <li>Keselamatan dan kesehatan kerja (K3)</li>
      <li>Dampak positif terhadap lingkungan</li>
    </ul>

    <h3>Terima Kasih kepada Tim & Klien</h3>
    <p>Penghargaan ini tidak lepas dari kerja keras seluruh tim BuildCore serta kepercayaan para klien dan mitra. Kami akan terus berkomitmen untuk memberikan yang terbaik dalam setiap proyek yang kami kerjakan.</p>
  `,
  id_kategori_berita: 1,
  kategori_berita: "Perusahaan",
  thumbnail:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  is_featured: true,
  created_at: "20 Mei 2025",
  read_time: "5 menit baca",
  // Data dummy tambahan untuk kelengkapan tampilan
  penulis: "Manajemen BuildCore",
  meta_deskripsi:
    "BuildCore meraih penghargaan Kontraktor Terbaik 2024 di ajang ICEA. Simak pencapaian dan komitmen kami dalam membangun masa depan.",
};

// ==========================================
// 2. DATA DUMMY BERITA POPULER (Untuk Sidebar)
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
    id: 4,
    judul: "5 Tips Memilih Material Konstruksi Berkualitas",
    slug: "5-tips-memilih-material-konstruksi-berkualitas",
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    date: "12 Mei 2025",
  },
];

// ==========================================
// 4. DATA DUMMY ARTIKEL TERKAIT
// ==========================================
const relatedNewsData = [
  {
    id: 5,
    judul: "BuildCore Gelar Safety Training untuk Seluruh Karyawan",
    slug: "buildcore-gelar-safety-training-untuk-seluruh-karyawan",
    thumbnail:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    date: "8 Mei 2025",
  },
];

// ==========================================
// 5. KOMPONEN - KOMPONEN
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
        // Tampilkan notifikasi sukses
        toast.success("Link berhasil disalin!", {
          duration: 3000,
          position: "bottom-right",
          style: {
            background: "#0F172A", // Navy
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
          icon: "🔗",
        });
      })
      .catch(() => {
        // Tampilkan notifikasi error jika gagal
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

// --- KOMPONEN BERITA POPULER (Sidebar) ---
const PopularNewsWidget = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h4 className="font-bold text-[#0F172A] text-lg mb-4">Berita Populer</h4>
      <div className="space-y-4">
        {popularNewsData.slice(0, 3).map((news) => (
          <Link
            key={news.id}
            to={`/news/${news.slug}`}
            className="flex gap-4 group"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={news.thumbnail}
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
  );
};

// --- KOMPONEN ARTIKEL TERKAIT (Sidebar) ---
const RelatedArticleWidget = () => {
  const article = relatedNewsData[0];
  if (!article) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h4 className="font-bold text-[#0F172A] text-lg mb-4">Artikel Terkait</h4>
      <div className="space-y-4">
        <Link to={`/news/${article.slug}`} className="group block">
          <div className="rounded-lg overflow-hidden mb-3">
            <img
              src={article.thumbnail}
              alt={article.judul}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h5 className="font-semibold text-[#0F172A] text-sm group-hover:text-[#F97316] transition-colors line-clamp-2">
            {article.judul}
          </h5>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <FaCalendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

// --- KOMPONEN KONTEN UTAMA BERITA ---
const NewsContent = ({ news }: { news: typeof newsDetailData }) => {
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
      <div>
        <span className="bg-[#F97316] text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-block">
          FEATURED
        </span>
      </div>

      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
        {news.judul}
      </h1>

      {/* Meta Info (Kategori, Tanggal, Waktu Baca, Simpan) */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaBuilding className="w-4 h-4 text-[#0F172A]" />
          <span className="text-[#0F172A] font-medium">
            {news.kategori_berita}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendar className="w-4 h-4 text-[#0F172A]" />
          <span>{news.created_at}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="w-4 h-4 text-[#0F172A]" />
          <span>{news.read_time}</span>
        </div>
      </div>

      {/* Gambar Utama */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <img
          src={news.thumbnail}
          alt={news.judul}
          className="w-full h-[300px] md:h-[450px] object-cover"
        />
      </div>

      {/* Konten Berita (HTML) */}
      <div
        className="prose prose-base md:prose-lg max-w-none text-gray-600 leading-relaxed prose-headings:text-[#0F172A] prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1"
        dangerouslySetInnerHTML={{ __html: news.konten }}
      />
    </motion.div>
  );
};

// --- KOMPONEN SIDEBAR ---
const NewsSidebar = () => {
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
      <PopularNewsWidget />

      {/* Artikel Terkait */}
      <RelatedArticleWidget />
    </motion.div>
  );
};

// ==========================================
// 6. HALAMAN UTAMA NEWS DETAIL
// ==========================================
const NewsDetailPage = () => {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* KOLOM KIRI & TENGAH: Konten Utama (2/3 lebar) */}
            <div className="lg:col-span-2">
              <NewsContent news={newsDetailData} />
            </div>

            {/* KOLOM KANAN: Sidebar (1/3 lebar) */}
            <div className="lg:col-span-1">
              <NewsSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsDetailPage;
