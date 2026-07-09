import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination"; // <--- Tambahkan ini
import { Navigation, Thumbs, Autoplay, Pagination } from "swiper/modules"; // <--- Tambahkan Pagination

// Import Icons
import {
  FaArrowRight,
  FaShareNodes,
  FaPrint,
  FaTag,
  FaClock,
  FaRotate,
} from "react-icons/fa6";

// ==========================================
// 1. DEFINISIKAN TYPE / INTERFACE
// ==========================================
interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
}

interface ProductData {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  img: string;
  gallery: string[];
  specs: Record<string, string>;
  advantages: string[];
  relatedProducts: RelatedProduct[];
}

// ==========================================
// 2. DATA DUMMY PRODUK DETAIL
// ==========================================
const productData: ProductData = {
  id: 2,
  name: "Steel Rebar",
  category: "Steel & Metal",
  price: 12500,
  desc: "Steel rebar (besi beton) adalah material penting untuk memperkuat struktur beton bertulang. Produk kami diproduksi dengan teknologi modern dan melewati proses quality control yang ketat untuk memastikan kekuatan tarik, keuletan, dan ketahanan terhadap korosi.",
  img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  ],
  specs: {
    "Nama Produk": "Steel Rebar",
    "Harga / Pcs": "Rp 12.500",
    Kategori: "Steel & Metal",
    Satuan: "Pcs",
    Standar: "SNI 2052:2017",
    Material: "Steel",
    Berat: "1,98 kg / pcs (Ø 10 mm)",
  },
  advantages: [
    "Kuat dan tahan lama",
    "Sesuai standar SNI",
    "Tersedia berbagai ukuran",
    "Tahan terhadap tekanan dan tarik",
    "Cocok untuk semua jenis konstruksi",
  ],
  relatedProducts: [
    {
      id: 1,
      name: "Cement",
      price: 78000,
      category: "Raw Materials",
      img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    },
    {
      id: 3,
      name: "Steel Wire",
      price: 9800,
      category: "Steel & Metal",
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    },
    {
      id: 4,
      name: "Hollow Block",
      price: 3200,
      category: "Concrete",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    },
    {
      id: 6,
      name: "Concrete Mix",
      price: 950000,
      category: "Concrete",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    },
  ],
};

// --- KOMPONEN BREADCRUMB ---
const Breadcrumb = () => (
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
    <span className="text-[#0F172A] font-medium">Steel Rebar</span>
  </div>
);

// --- KOMPONEN GALLERY SLIDER ---
interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

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
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Product ${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="thumb-slider h-24"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <button className="w-full h-full rounded-lg overflow-hidden border-2 border-transparent hover:border-[#F97316] transition-all">
              <img
                src={img}
                alt={`Thumb ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// --- KOMPONEN INFO PRODUK ---
interface ProductInfoProps {
  product: ProductData;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-start">
        <span className="bg-orange-50 text-[#F97316] px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">
          {product.category}
        </span>
        <div className="flex gap-3 text-gray-400">
          <button className="hover:text-[#F97316] transition-colors">
            <FaShareNodes />
          </button>
          <button className="hover:text-[#F97316] transition-colors">
            <FaPrint />
          </button>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
        {product.name}
      </h1>
      <p className="text-gray-500 leading-relaxed">{product.desc}</p>
      <div className="pt-4 pb-6 border-b border-gray-100">
        <h3 className="text-3xl md:text-4xl font-bold text-[#F97316]">
          Rp {product.price.toLocaleString("id-ID")}
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
            {product.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- KOMPONEN SPESIFIKASI & KELEBIHAN ---
interface SpecsAndAdvantagesProps {
  product: ProductData;
}

const SpecsAndAdvantages = ({ product }: SpecsAndAdvantagesProps) => {
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
          {Object.entries(product.specs).map(([key, value]) => (
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
          {product.advantages.map((adv, index) => (
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

// --- KOMPONEN PRODUK TERKAIT (SEKARANG MENJADI SLIDER) ---
interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
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
                <div className="h-40 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h4 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F97316] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[#F97316] font-bold text-sm mb-2">
                    Rp {product.price.toLocaleString("id-ID")}{" "}
                    <span className="font-normal text-gray-400 text-xs">
                      / pcs
                    </span>
                  </p>
                  <div className="mt-2 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
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
  return (
    <>
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <Breadcrumb />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductGallery images={productData.gallery} />
            </motion.div>
            <ProductInfo product={productData} />
          </div>
          <SpecsAndAdvantages product={productData} />
          <RelatedProducts products={productData.relatedProducts} />
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
