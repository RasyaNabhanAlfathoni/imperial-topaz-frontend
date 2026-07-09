import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { getImageUrl } from "../../api/axios";
import type { Service } from "../../types/service";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  // Fungsi untuk mendapatkan gambar pertama yang tersedia
  const getServiceImage = (): string => {
    const foto =
      service.foto1 ||
      service.foto2 ||
      service.foto3 ||
      service.foto4 ||
      service.foto5;
    return foto ? getImageUrl(foto) : PLACEHOLDER_IMAGE;
  };

  // Fungsi untuk truncate deskripsi
  const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
          src={getServiceImage()}
          alt={service.nama_services}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {service.nama_services}
        </h3>
        {service.judul_deskripsi && (
          <p className="text-sm font-medium text-[#F97316] mb-2">
            {service.judul_deskripsi}
          </p>
        )}
        <p className="text-gray-500 text-sm mb-5 leading-relaxed flex-grow line-clamp-3">
          {truncateText(service.deskripsi || service.konten || "", 120)}
        </p>
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:gap-2 transition-all group-hover:gap-2 mt-auto"
        >
          Learn More{" "}
          <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
