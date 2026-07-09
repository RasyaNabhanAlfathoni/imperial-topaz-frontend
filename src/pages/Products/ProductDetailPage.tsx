import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { Navigation, Thumbs, Autoplay, Pagination } from "swiper/modules";

// Import Icons
import {
  FaArrowRight,
  FaShareNodes,
  FaPrint,
  FaTag,
  FaClock,
  FaRotate,
  FaWhatsapp,
} from "react-icons/fa6";

// Import API dan types
import { productAPI } from "../../api/product";
import type { Product, Category } from "../../types/product";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// Interface untuk produk terkait
interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
}

// --- KOMPONEN BREADCRUMB ---
const Breadcrumb = ({ productName }: { productName: string }) => (
  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
    <Link to="/" className="hover:text-[#F97316]">
      Home
    </Link>
    <span>›</span>
    <Link to="/solutions" className="hover:text-[#F97316]">
      Solutions
    </Link>
    <span>›</span>
    <Link to="/products" className="hover:text-[#F97316]">
      Our Products
    </Link>
    <span>›</span>
    <span className="text-[#0F172A] font-medium">{productName}</span>
  </div>
);

// --- KOMPONEN GALLERY SLIDER ---
interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  // Filter gambar yang valid (tidak kosong)
  const validImages = images.filter((img) => img && img.trim() !== "");

  // Jika tidak ada gambar, gunakan placeholder
  const galleryImages =
    validImages.length > 0 ? validImages : [PLACEHOLDER_IMAGE];

  return (
    <div className="space-y-4">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Navigation, Thumbs, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="rounded-2xl overflow-hidden shadow-sm h-[350px] md:h-[450px]"
      >
        {galleryImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.startsWith("http") ? img : getImageUrl(img)}
              alt={`Product ${index}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {galleryImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={Math.min(4, galleryImages.length)}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="thumb-slider h-24"
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={index}>
              <button className="w-full h-full rounded-lg overflow-hidden border-2 border-transparent hover:border-[#F97316] transition-all">
                <img
                  src={img.startsWith("http") ? img : getImageUrl(img)}
                  alt={`Thumb ${index}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                  }}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

// --- KOMPONEN INFO PRODUK ---
interface ProductInfoProps {
  product: Product;
  categoryName: string;
}

const ProductInfo = ({ product, categoryName }: ProductInfoProps) => {
  // Format harga ke Rupiah
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-start">
        <span className="bg-orange-50 text-[#F97316] px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">
          {categoryName || "Uncategorized"}
        </span>
        <div className="flex gap-3 text-gray-400">
          <button
            className="hover:text-[#F97316] transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.nama_produk,
                  text: product.deskripsi,
                  url: window.location.href,
                });
              }
            }}
          >
            <FaShareNodes />
          </button>
          <button
            className="hover:text-[#F97316] transition-colors"
            onClick={() => window.print()}
          >
            <FaPrint />
          </button>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
        {product.nama_produk}
      </h1>
      <p className="text-gray-500 leading-relaxed">{product.deskripsi}</p>
      <div className="pt-4 pb-6 border-b border-gray-100">
        <h3 className="text-3xl md:text-4xl font-bold text-[#F97316]">
          {formatPrice(product.harga_per_pcs)}
        </h3>
        <p className="text-sm text-gray-400 mt-1">(Harga sudah termasuk PPN)</p>
      </div>
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-4 text-sm">
          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-[#0F172A]">
            <FaTag />
          </div>
          <span className="text-gray-500">Kategori</span>
          <span className="font-medium text-[#0F172A] ml-auto">
            {categoryName || "Uncategorized"}
          </span>
        </div>
      </div>

      {/* Tombol WhatsApp */}
      <div className="pt-4">
        <a
          href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.nama_produk)}%20dengan%20harga%20${formatPrice(product.harga_per_pcs)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#1DA851] transition-colors w-full justify-center"
        >
          <FaWhatsapp className="w-5 h-5" />
          Order via WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

// --- KOMPONEN SPESIFIKASI & KELEBIHAN ---
interface SpecsAndAdvantagesProps {
  product: Product;
  categoryName: string;
}

const SpecsAndAdvantages = ({
  product,
  categoryName,
}: SpecsAndAdvantagesProps) => {
  // Buat spesifikasi dari data produk
  const specs = {
    "Nama Produk": product.nama_produk,
    "Harga / Pcs": new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(product.harga_per_pcs),
    Kategori: categoryName || "Uncategorized",
    "Tanggal Ditambahkan": new Date(product.created_at).toLocaleDateString(
      "id-ID",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    ),
  };

  // Kelebihan produk (dari deskripsi atau bisa ditambahkan field tersendiri)
  const advantages = product.deskripsi
    ? product.deskripsi
        .split(".")
        .filter((s) => s.trim().length > 10)
        .slice(0, 4)
        .map((s) => s.trim())
    : [
        "Produk berkualitas tinggi",
        "Harga kompetitif",
        "Tersedia berbagai varian",
        "Pengiriman tepat waktu",
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-6">
          Spesifikasi & Informasi
        </h3>
        <div className="space-y-4">
          {Object.entries(specs).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-[#F97316] text-xs">›</span> {key}
              </div>
              <span className="font-medium text-[#0F172A] text-sm">
                {value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-6">
          Kelebihan Produk
        </h3>
        <ul className="space-y-3">
          {advantages.map((adv, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F97316] shrink-0"></span>
              <span className="text-gray-600 text-sm">{adv}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

// --- KOMPONEN PRODUK TERKAIT ---
interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-6">
        Produk Terkait
      </h3>

      <div className="relative px-4 md:px-0">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-12 md:pb-0"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={
                      product.img.startsWith("http")
                        ? product.img
                        : getImageUrl(product.img)
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h4 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F97316] transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-[#F97316] font-bold text-sm mb-2">
                    Rp {product.price.toLocaleString("id-ID")}{" "}
                    <span className="font-normal text-gray-400 text-xs">
                      / pcs
                    </span>
                  </p>
                  <div className="mt-2 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400 line-clamp-1">
                      {product.category}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-[#F97316] hover:translate-x-1 transition-transform"
                    >
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

// --- HALAMAN UTAMA ---
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data produk detail
  const fetchProductDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Ambil data produk detail
      const productData = await productAPI.getById(parseInt(id));

      // Set produk
      setProduct(productData);

      // Ambil semua produk untuk produk terkait
      const allProducts = await productAPI.getAll();

      // Buat daftar produk terkait (produk dengan kategori yang sama, kecuali produk ini)
      const related = allProducts
        .filter(
          (p: Product) =>
            p.id !== productData.id &&
            p.id_kategori_produk === productData.id_kategori_produk,
        )
        .slice(0, 4)
        .map((p: Product) => ({
          id: p.id,
          name: p.nama_produk,
          price: p.harga_per_pcs,
          category:
            p.kategori_produk ||
            p.kategori_produk?.kategori_produk ||
            "Uncategorized",
          img:
            p.foto1 ||
            p.foto2 ||
            p.foto3 ||
            p.foto4 ||
            p.foto5 ||
            PLACEHOLDER_IMAGE,
        }));

      setRelatedProducts(related);
    } catch (err) {
      console.error("Error fetching product detail:", err);
      setError("Gagal mengambil detail produk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  // Fungsi untuk mendapatkan daftar gambar
  const getGalleryImages = (product: Product): string[] => {
    const images = [
      product.foto1,
      product.foto2,
      product.foto3,
      product.foto4,
      product.foto5,
    ].filter(
      (img): img is string =>
        img !== undefined && img !== null && img.trim() !== "",
    );

    return images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  };

  // Loading state
  if (loading) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat detail produk...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 text-lg mb-4">
              {error || "Produk tidak ditemukan"}
            </p>
            <button
              onClick={fetchProductDetail}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
            <Link
              to="/products"
              className="mt-4 text-[#F97316] hover:underline"
            >
              Kembali ke Produk
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Ambil nama kategori dari produk (sudah ada di response)
  const categoryName =
    product.kategori_produk ||
    product.kategori_produk?.kategori_produk ||
    "Uncategorized";

  return (
    <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Breadcrumb productName={product.nama_produk} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductGallery images={getGalleryImages(product)} />
          </motion.div>
          <ProductInfo product={product} categoryName={categoryName} />
        </div>

        <SpecsAndAdvantages product={product} categoryName={categoryName} />

        <RelatedProducts products={relatedProducts} />
      </div>
    </section>
  );
};

export default ProductDetailPage;
