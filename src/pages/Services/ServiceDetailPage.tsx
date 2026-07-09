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
import { FaArrowRight } from "react-icons/fa6";

// Import API dan types
import { serviceAPI } from "../../api/service";
import type { Service } from "../../types/service";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// Interface untuk service terkait
interface RelatedService {
  id: number;
  nama_services: string;
  deskripsi: string;
  foto1?: string;
}

// ==========================================
// KOMPONEN - KOMPONEN
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

  // Filter gambar yang valid
  const validImages = images.filter((img) => img && img.trim() !== "");
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
              alt={`Gallery ${index}`}
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
          className="thumb-slider h-20 md:h-24"
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

// --- KOMPONEN INFO LAYANAN (Kanan) ---
interface ServiceInfoProps {
  service: Service;
}

const ServiceInfo = ({ service }: ServiceInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {service.judul_deskripsi && (
        <p className="text-[#F97316] font-semibold text-sm">
          {service.judul_deskripsi}
        </p>
      )}

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
  if (!services || services.length === 0) {
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
        Layanan Terkait
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
          {services.map((service) => {
            const imageUrl = service.foto1
              ? service.foto1.startsWith("http")
                ? service.foto1
                : getImageUrl(service.foto1)
              : PLACEHOLDER_IMAGE;

            return (
              <SwiperSlide key={service.id}>
                <motion.div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={service.nama_services}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h4 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F97316] transition-colors line-clamp-2">
                      {service.nama_services}
                    </h4>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2 flex-grow">
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.div>
  );
};

// ==========================================
// HALAMAN UTAMA SERVICE DETAIL
// ==========================================
const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<RelatedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data service detail
  const fetchServiceDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Ambil data service detail
      const serviceData = await serviceAPI.getById(parseInt(id));
      console.log("Service Data:", serviceData);

      if (!serviceData || !serviceData.id) {
        throw new Error("Service data is empty or invalid");
      }

      setService(serviceData);

      // Ambil semua service untuk service terkait
      try {
        const allServices = await serviceAPI.getAll();
        console.log("All Services:", allServices);

        if (
          allServices &&
          Array.isArray(allServices) &&
          allServices.length > 0
        ) {
          // Filter service terkait (service lain yang bukan service ini)
          const related = allServices
            .filter((s: Service) => s.id !== serviceData.id)
            .slice(0, 4)
            .map((s: Service) => ({
              id: s.id,
              nama_services: s.nama_services,
              deskripsi: s.deskripsi || s.judul_deskripsi || "",
              foto1: s.foto1 || s.foto2 || s.foto3 || s.foto4 || s.foto5 || "",
            }));

          setRelatedServices(related);
        }
      } catch (relatedErr) {
        console.warn("Failed to fetch related services:", relatedErr);
      }
    } catch (err) {
      console.error("Error fetching service detail:", err);
      setError("Gagal mengambil detail layanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceDetail();
  }, [id]);

  // Fungsi untuk mendapatkan daftar gambar
  const getGalleryImages = (service: Service): string[] => {
    const images = [
      service.foto1,
      service.foto2,
      service.foto3,
      service.foto4,
      service.foto5,
    ].filter(
      (img): img is string =>
        img !== undefined && img !== null && img.trim() !== "",
    );

    return images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  };

  // Fungsi untuk mendapatkan gambar utama
  const getMainImage = (service: Service): string => {
    const foto =
      service.foto1 ||
      service.foto2 ||
      service.foto3 ||
      service.foto4 ||
      service.foto5;
    return foto
      ? foto.startsWith("http")
        ? foto
        : getImageUrl(foto)
      : PLACEHOLDER_IMAGE;
  };

  // Loading state
  if (loading) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat detail layanan...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !service) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 text-lg mb-4">
              {error || "Layanan tidak ditemukan"}
            </p>
            <button
              onClick={fetchServiceDetail}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
            <Link
              to="/services"
              className="mt-4 text-[#F97316] hover:underline"
            >
              Kembali ke Layanan
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const galleryImages = getGalleryImages(service);

  return (
    <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Breadcrumb title={service.nama_services} />

        {/* Bagian Atas: Gallery & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ServiceGallery images={galleryImages} />
          </motion.div>

          <ServiceInfo service={service} />
        </div>

        {/* Bagian Tengah: Detail Konten */}
        {service.konten && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-sm h-[350px] md:h-[450px] bg-gray-100">
                <img
                  src={getMainImage(service)}
                  alt={service.nama_services}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {service.judul_deskripsi && (
                <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
                  {service.nama_services}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">
                {service.judul_deskripsi || service.nama_services}
              </h2>
              <div
                className="text-gray-500 leading-relaxed prose prose-sm max-w-none prose-headings:text-[#0F172A] prose-a:text-[#F97316]"
                dangerouslySetInnerHTML={{ __html: service.konten }}
              />
            </motion.div>
          </div>
        )}

        {/* Bagian Layanan Terkait */}
        {relatedServices.length > 0 && (
          <RelatedServices services={relatedServices} />
        )}

        {/* Tombol Kembali */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[#0F172A] hover:text-[#F97316] transition-colors font-medium"
          >
            <FaArrowRight className="rotate-180" />
            Kembali ke Semua Layanan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailPage;
