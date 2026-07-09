import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRupiahSign } from "react-icons/fa6";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    desc: string;
    category: string;
    img: string;
    price?: number;
    rawProduct?: any; // Untuk data lengkap dari API
  };
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  // Fungsi untuk format harga ke Rupiah
  const formatPrice = (price?: number): string => {
    if (!price) return "Hubungi Kami";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fungsi untuk mendapatkan URL gambar
  const getImageSrc = (imgPath: string): string => {
    if (!imgPath) return PLACEHOLDER_IMAGE;
    return getImageUrl(imgPath);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group/card h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
    >
      <div className="relative h-48 overflow-hidden shrink-0 bg-gray-100">
        <img
          src={getImageSrc(product.img)}
          alt={product.name}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
          loading="lazy"
        />
        {product.price && (
          <div className="absolute bottom-2 right-2 bg-[#0F172A]/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {formatPrice(product.price)}
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <span className="text-xs font-medium text-[#F97316] bg-orange-50 px-2 py-1 rounded-full inline-block mb-2 self-start">
          {product.category}
        </span>
        <h4 className="font-bold text-[#0F172A] text-lg mb-1 group-hover/card:text-[#F97316] transition-colors line-clamp-1">
          {product.name}
        </h4>
        <p className="text-sm text-gray-500 line-clamp-2 flex-grow">
          {product.desc}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 text-sm font-semibold text-[#0F172A] group-hover/card:gap-2 flex items-center transition-all"
        >
          Detail Product <FaArrowRight className="ml-1 w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
