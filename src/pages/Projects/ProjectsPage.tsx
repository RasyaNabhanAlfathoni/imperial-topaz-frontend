import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import MainLayout from "../../layouts/MainLayout";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// Import Components
import ProjectsHero from "../../components/projects/ProjectsHero";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectsPartners from "../../components/projects/ProjectsPartners";

// Import API dan types
import { projectAPI } from "../../api/project";
import { partnerAPI } from "../../api/partner";
import type { Project } from "../../types/project";
import type { Partner } from "../../types/partner";

// ==========================================
// HALAMAN UTAMA PROJECTS
// ==========================================
const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Fungsi untuk mengambil data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data proyek dan partner secara paralel
      const [projectsData, partnersData] = await Promise.all([
        projectAPI.getAll(),
        partnerAPI.getAll(),
      ]);

      const projectsList = Array.isArray(projectsData) ? projectsData : [];
      const partnersList = Array.isArray(partnersData) ? partnersData : [];

      setProjects(projectsList);
      setPartners(partnersList);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, projects.length));
  };

  // Loading state
  if (loading) {
    return (
      <>
        <ProjectsHero />
        <section className="py-16 bg-[#F8FAFC] pt-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data proyek...</p>
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
        <ProjectsHero />
        <section className="py-16 bg-[#F8FAFC] pt-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchData}
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
      <ProjectsHero />

      <section className="py-16 bg-[#F8FAFC] pt-10">
        <div className="container mx-auto px-4 md:px-8">
          {/* 1. GRID PROYEK (Desktop) + SLIDER (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Belum ada data proyek.
              </div>
            ) : (
              <>
                {/* Tampilan Desktop: Grid 3 Kolom */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>

                {/* Tampilan Mobile: Swiper Slider */}
                <div className="block md:hidden pb-8">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="projects-slider-mobile"
                  >
                    {visibleProjects.map((project, index) => (
                      <SwiperSlide key={project.id}>
                        <ProjectCard project={project} index={index} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
            )}
          </motion.div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-10"
            >
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white rounded-full font-semibold transition-all duration-300"
              >
                Load More Projects <FaArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Bagian Partners (Slider Animation) */}
          <ProjectsPartners partners={partners} />
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
