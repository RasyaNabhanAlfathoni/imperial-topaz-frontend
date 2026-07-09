import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import API dan types
import { projectAPI } from "../../api/project";
import type { Project } from "../../types/project";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getAll();
      setProjects(data);
      setFailedImages(new Set());
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Gagal mengambil data proyek. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getProjectImage = (project: Project): string => {
    // Cari foto pertama yang tersedia
    const foto =
      project.foto1 ||
      project.foto2 ||
      project.foto3 ||
      project.foto4 ||
      project.foto5;
    if (!foto || failedImages.has(project.id)) {
      return PLACEHOLDER_IMAGE;
    }
    return getImageUrl(foto);
  };

  const handleImageError = (projectId: number) => {
    setFailedImages((prev) => new Set(prev).add(projectId));
  };

  // Loading state...
  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data proyek...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state...
  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="text-right md:text-left w-full md:w-auto">
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              Our Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Building Success <br /> Through Our Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="mt-6 md:mt-0 inline-flex self-start items-center border border-gray-300 hover:border-[#F97316] text-[#0F172A] hover:text-[#F97316] px-6 py-3 rounded-md font-bold transition-all"
          >
            View All Projects <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Swiper Slider */}
        <div className="relative px-4 md:px-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="pb-14 md:pb-0 min-h-[400px]"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group/card h-full"
                >
                  <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white h-full flex flex-col">
                    <div className="h-56 overflow-hidden shrink-0 bg-gray-100">
                      <img
                        src={getProjectImage(project)}
                        alt={project.nama_proyek}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(project.id)}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1 line-clamp-2">
                        {project.nama_proyek}
                      </h4>
                      <p className="text-gray-500 text-xs font-medium">
                        {project.lokasi}
                      </p>
                      {project.client && (
                        <p className="text-gray-400 text-xs mt-1">
                          Client: {project.client}
                        </p>
                      )}
                      <span className="inline-block mt-auto pt-3 text-xs text-gray-400 border-t border-gray-100 w-full">
                        {project.tahun}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] transition-all z-20 hidden md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] transition-all z-20 hidden md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
