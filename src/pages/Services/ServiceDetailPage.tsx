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
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

// Import Icons
import { FaArrowRight } from "react-icons/fa6";

// ==========================================
// 1. DEFINISIKAN TYPE / INTERFACE
// ==========================================
interface RelatedService {
  id: number;
  nama_services: string;
  deskripsi: string;
  foto1: string;
}

interface ServiceData {
  id: number;
  nama_services: string;
  judul_deskripsi: string;
  deskripsi: string;
  konten: string;
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
  foto5: string;
  related_services?: RelatedService[];
}

// ==========================================
// 2. DATA DUMMY SERVICE DETAIL
// ==========================================
const serviceData: ServiceData = {
  id: 1,
  nama_services: "Pre-Construction Planning",
  judul_deskripsi: "Planning for Success. Building for the Future.",
  deskripsi:
    "Comprehensive planning and feasibility studies to lay a strong foundation for your construction project.",
  konten: `
    <p>Kami melakukan studi kelayakan, analisis lokasi, estimasi biaya, penyusunan jadwal, identifikasi risiko, hingga pengurusan izin yang diperlukan.</p>
    <p>Dengan perencanaan yang tepat, kami memastikan proyek Anda berjalan lebih efisien, tepat waktu, dan sesuai anggaran.</p>
  `,
  foto1: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  foto2:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  foto3:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  foto4:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  foto5:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  related_services: [
    {
      id: 2,
      nama_services: "Design & Build",
      deskripsi: "Solusi terintegrasi dari konsep hingga konstruksi.",
      foto1:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    },
    {
      id: 3,
      nama_services: "Project Management",
      deskripsi: "Manajemen proyek profesional dan terstruktur.",
      foto1:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    },
    {
      id: 4,
      nama_services: "General Construction",
      deskripsi: "Pembangunan umum berkualitas tinggi.",
      foto1:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    },
    {
      id: 5,
      nama_services: "Consulting",
      deskripsi: "Konsultasi ahli untuk solusi konstruksi terbaik.",
      foto1:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    },
  ],
};

// ==========================================
// 3. KOMPONEN - KOMPONEN
// ==========================================

// --- KOMPONEN BREADCRUMB ---
const Breadcrumb = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
    <Link to="/" className="hover:text-[#F97316] transition-colors">
      Home
    </Link>
    <span>›</span>
    <Link to="/solutions" className="hover:text-[#F97316] transition-colors">
      Solutions
    </Link>
    <span>›</span>
    <Link to="/services" className="hover:text-[#F97316] transition-colors">
      Our Services
    </Link>
    <span>›</span>
    <span className="text-[#0F172A] font-medium">{title}</span>
  </div>
);

// --- KOMPONEN GALLERY SLIDER ---
interface ServiceGalleryProps {
  images: string[];
}

const ServiceGallery = ({ images }: ServiceGalleryProps) => {
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
              alt={`Gallery ${index}`}
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
        className="thumb-slider h-20 md:h-24"
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

// --- KOMPONEN INFO LAYANAN (Kanan) ---
interface ServiceInfoProps {
  service: ServiceData;
}

const ServiceInfo = ({ service }: ServiceInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <p className="text-[#F97316] font-semibold text-sm">
        {service.judul_deskripsi}
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
        {service.nama_services}
      </h1>

      <p className="text-gray-500 leading-relaxed max-w-lg">
        {service.deskripsi}
      </p>
    </motion.div>
  );
};

// --- KOMPONEN LAYANAN TERKAIT ---
interface RelatedServicesProps {
  services: RelatedService[];
}

const RelatedServices = ({ services }: RelatedServicesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-6">
        Layanan Terkait
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={service.foto1}
                alt={service.nama_services}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F97316] transition-colors">
                {service.nama_services}
              </h4>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                {service.deskripsi}
              </p>
              <div className="flex justify-end items-center mt-2 pt-3 border-t border-gray-50">
                <Link
                  to={`/services/${service.id}`}
                  className="text-[#F97316] text-sm font-medium hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  Lihat Detail <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. HALAMAN UTAMA SERVICE DETAIL
// ==========================================
const ServiceDetailPage = () => {
  const galleryImages = [
    serviceData.foto1,
    serviceData.foto2,
    serviceData.foto3,
    serviceData.foto4,
    serviceData.foto5,
  ].filter(Boolean);

  return (
    <>
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <Breadcrumb title={serviceData.nama_services} />

          {/* Bagian Atas: Gallery & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ServiceGallery images={galleryImages} />
            </motion.div>

            <ServiceInfo service={serviceData} />
          </div>

          {/* Bagian Tengah: Project Planning & Feasibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-sm h-[350px] md:h-[450px]">
                <img
                  src={serviceData.foto1}
                  alt="Project Planning"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
                {serviceData.nama_services}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">
                {serviceData.judul_deskripsi}
              </h2>
              <div
                className="text-gray-500 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: serviceData.konten }}
              />
            </motion.div>
          </div>

          {/* Bagian Layanan Terkait */}
          {serviceData.related_services &&
            serviceData.related_services.length > 0 && (
              <RelatedServices services={serviceData.related_services} />
            )}
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
