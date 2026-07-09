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
  FaLocationDot,
  FaCalendar,
  FaUser,
  FaTag,
  FaCircleCheck,
} from "react-icons/fa6";

// Import API dan types
import { projectAPI } from "../../api/project";
import type { Project } from "../../types/project";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

// Interface untuk proyek terkait
interface RelatedProject {
  id: number;
  nama_proyek: string;
  lokasi: string;
  tahun: string;
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
    <Link to="/projects" className="hover:text-[#F97316] transition-colors">
      Projects
    </Link>
    <span>›</span>
    <span className="text-[#0F172A] font-medium">{title}</span>
  </div>
);

// --- KOMPONEN GALLERY SLIDER ---
interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  // Filter gambar yang valid
  const validImages = images.filter((img) => img && img.trim() !== "");
  const galleryImages =
    validImages.length > 0 ? validImages : [PLACEHOLDER_IMAGE];

  return (
    <div className="space-y-4">
      {/* Main Image Slider */}
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

      {/* Thumbnail Slider */}
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

// --- KOMPONEN ABOUT PROJECT (Bagian Kiri Atas) ---
interface AboutProjectProps {
  project: Project;
}

const AboutProject = ({ project }: AboutProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
        About The Project
      </h3>
      <div className="text-gray-500 leading-relaxed whitespace-pre-line mb-6">
        {project.deskripsi}
      </div>
    </motion.div>
  );
};

// --- KOMPONEN INFO PROYEK (Kanan) ---
interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Share & Print Buttons */}
      <div className="flex justify-end items-start">
        <div className="flex gap-3 text-gray-400">
          <button
            className="hover:text-[#F97316] transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: project.nama_proyek,
                  text: project.deskripsi,
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

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
        {project.nama_proyek}
      </h1>

      {/* Lokasi & Tahun (Horizontal) */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaLocationDot className="w-4 h-4" />
          <span>{project.lokasi}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-2">
          <FaCalendar className="w-4 h-4" />
          <span>{project.tahun}</span>
        </div>
      </div>

      {/* Quick Specs */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-[#0F172A]">
            <FaTag />
          </div>
          <span className="text-gray-500 w-24 shrink-0">Project Name</span>
          <span className="font-medium text-[#0F172A] ml-auto">
            : {project.nama_proyek}
          </span>
        </div>
        {project.client && (
          <div className="flex items-center gap-4 text-sm">
            <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-[#0F172A]">
              <FaUser />
            </div>
            <span className="text-gray-500 w-24 shrink-0">Client</span>
            <span className="font-medium text-[#0F172A] ml-auto">
              : {project.client}
            </span>
          </div>
        )}
        <div className="flex items-center gap-4 text-sm">
          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-[#0F172A]">
            <FaCalendar />
          </div>
          <span className="text-gray-500 w-24 shrink-0">Year</span>
          <span className="font-medium text-[#0F172A] ml-auto">
            : {project.tahun}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-[#0F172A]">
            <FaCircleCheck />
          </div>
          <span className="text-gray-500 w-24 shrink-0">Status</span>
          <span className="font-medium text-[#0F172A] ml-auto">
            : Completed
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- KOMPONEN PROYEK TERKAIT (SLIDER) ---
interface RelatedProjectsProps {
  projects: RelatedProject[];
}

const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  if (!projects || projects.length === 0) {
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
      <h3 className="text-2xl font-bold text-[#0F172A] mb-6">Proyek Terkait</h3>

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
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pb-12 md:pb-0"
        >
          {projects.map((project) => {
            const imageUrl = project.foto1
              ? project.foto1.startsWith("http")
                ? project.foto1
                : getImageUrl(project.foto1)
              : PLACEHOLDER_IMAGE;

            return (
              <SwiperSlide key={project.id}>
                <motion.div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={project.nama_proyek}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h4 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F97316] transition-colors line-clamp-2">
                      {project.nama_proyek}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <FaLocationDot className="w-3 h-3" />
                      <span className="line-clamp-1">{project.lokasi}</span>
                    </div>
                    <span className="text-xs text-gray-400 mb-3">
                      {project.tahun}
                    </span>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:gap-2 transition-all group-hover:gap-2 mt-auto"
                    >
                      View Project{" "}
                      <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
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

// --- KOMPONEN CTA BANNER ---
const ProjectCtaBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-[#0F172A] text-white mt-16 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80"
          alt="Construction"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white text-3xl shrink-0">
            <FaCircleCheck />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Have a Similar Project in Mind?
            </h3>
            <p className="text-gray-300 mt-1">
              Let's discuss how we can bring your vision to life with our
              professional construction solutions.
            </p>
          </div>
        </div>
        <Link
          to="/contact"
          className="bg-[#F97316] hover:bg-[#ea580c] text-white px-8 py-3.5 rounded-md font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/30 shrink-0"
        >
          Contact Us Now <FaArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

// ==========================================
// HALAMAN UTAMA PROJECT DETAIL
// ==========================================
const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data project detail
  const fetchProjectDetail = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Ambil data project detail
      const projectData = await projectAPI.getById(parseInt(id));
      console.log("Project Data:", projectData);

      if (!projectData || !projectData.id) {
        throw new Error("Project data is empty or invalid");
      }

      setProject(projectData);

      // Ambil semua project untuk project terkait
      try {
        const allProjects = await projectAPI.getAll();
        console.log("All Projects:", allProjects);

        if (
          allProjects &&
          Array.isArray(allProjects) &&
          allProjects.length > 0
        ) {
          // Filter project terkait (project lain yang bukan project ini)
          const related = allProjects
            .filter((p: Project) => p.id !== projectData.id)
            .slice(0, 4)
            .map((p: Project) => ({
              id: p.id,
              nama_proyek: p.nama_proyek,
              lokasi: p.lokasi,
              tahun: p.tahun,
              foto1: p.foto1 || p.foto2 || p.foto3 || p.foto4 || p.foto5 || "",
            }));

          setRelatedProjects(related);
        }
      } catch (relatedErr) {
        console.warn("Failed to fetch related projects:", relatedErr);
      }
    } catch (err) {
      console.error("Error fetching project detail:", err);
      setError("Gagal mengambil detail proyek. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  // Fungsi untuk mendapatkan daftar gambar
  const getGalleryImages = (project: Project): string[] => {
    const images = [
      project.foto1,
      project.foto2,
      project.foto3,
      project.foto4,
      project.foto5,
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
              <p className="text-gray-600">Memuat detail proyek...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-500 text-lg mb-4">
              {error || "Proyek tidak ditemukan"}
            </p>
            <button
              onClick={fetchProjectDetail}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
            <Link
              to="/projects"
              className="mt-4 text-[#F97316] hover:underline"
            >
              Kembali ke Proyek
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const galleryImages = getGalleryImages(project);

  return (
    <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Breadcrumb title={project.nama_proyek} />

        {/* Bagian Atas: Gallery & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Kiri: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectGallery images={galleryImages} />
          </motion.div>

          {/* Kanan: Info Proyek */}
          <ProjectInfo project={project} />
        </div>

        {/* Bagian About The Project */}
        <div className="mt-12">
          <AboutProject project={project} />
        </div>

        {/* Bagian Proyek Terkait */}
        <RelatedProjects projects={relatedProjects} />

        {/* CTA Banner */}
        <ProjectCtaBanner />
      </div>
    </section>
  );
};

export default ProjectDetailPage;
