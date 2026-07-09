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

// ==========================================
// 1. DEFINISIKAN TYPE / INTERFACE
// ==========================================
interface ProjectData {
  id: number;
  nama_proyek: string;
  lokasi: string;
  tahun: string;
  deskripsi: string;
  client: string;
  foto1: string;
  foto2: string;
  foto3: string;
  foto4: string;
  foto5: string;
  status?: string;
  gallery_extra?: string[];
}

interface RelatedProject {
  id: number;
  nama_proyek: string;
  lokasi: string;
  tahun: string;
  foto1: string;
}

// ==========================================
// 2. DATA DUMMY PROJECT DETAIL
// ==========================================
const projectData: ProjectData = {
  id: 1,
  nama_proyek: "Office Building Jakarta",
  lokasi: "Jakarta, Indonesia",
  tahun: "2024",
  deskripsi: `Office Building Jakarta merupakan gedung perkantoran modern bertaraf 12 lantai yang dirancang dengan konsep arsitektur kontemporer dan berfokus pada kenyamanan serta efisiensi energi.

Proyek ini mencakup pekerjaan struktur, arsitektur, mekanikal, elektrikal, plumbing, serta interior dengan standar kualitas tinggi. Kami menggunakan material terbaik dan teknologi terbaru untuk memastikan bangunan yang aman, efisien, dan ramah lingkungan.`,
  client: "PT. Global Mandiri",
  status: "Completed",
  foto1:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  foto2:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  foto3:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  foto4:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  foto5:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
};

// ==========================================
// 3. DATA DUMMY PROYEK TERKAIT
// ==========================================
const relatedProjectsData: RelatedProject[] = [
  {
    id: 2,
    nama_proyek: "Green Villa Residence",
    lokasi: "Bandung, Indonesia",
    tahun: "2023",
    foto1:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    id: 3,
    nama_proyek: "Cikampek Toll Road Section 2",
    lokasi: "West Java, Indonesia",
    tahun: "2024",
    foto1:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
  },
  {
    id: 4,
    nama_proyek: "Logistics Warehouse",
    lokasi: "Surabaya, Indonesia",
    tahun: "2023",
    foto1:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    id: 5,
    nama_proyek: "University Building",
    lokasi: "Yogyakarta, Indonesia",
    tahun: "2022",
    foto1:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
  },
];

// ==========================================
// 4. KOMPONEN - KOMPONEN
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

      {/* Thumbnail Slider */}
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

// --- KOMPONEN ABOUT PROJECT (Bagian Kiri Atas) ---
interface AboutProjectProps {
  project: ProjectData;
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
  project: ProjectData;
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Badge Kategori */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 text-gray-400">
          <button className="hover:text-[#F97316] transition-colors">
            <FaShareNodes />
          </button>
          <button className="hover:text-[#F97316] transition-colors">
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
        <div className="flex items-center gap-4 text-sm">
          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-[#0F172A]">
            <FaUser />
          </div>
          <span className="text-gray-500 w-24 shrink-0">Client</span>
          <span className="font-medium text-[#0F172A] ml-auto">
            : {project.client}
          </span>
        </div>
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
            : {project.status || "Completed"}
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
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <motion.div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="h-40 overflow-hidden">
                  <img
                    src={project.foto1}
                    alt={project.nama_proyek}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h4 className="font-bold text-[#0F172A] text-base mb-1 group-hover:text-[#F97316] transition-colors">
                    {project.nama_proyek}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <FaLocationDot className="w-3 h-3" />
                    <span>{project.lokasi}</span>
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
          ))}
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
// 5. HALAMAN UTAMA PROJECT DETAIL
// ==========================================
const ProjectDetailPage = () => {
  // Persiapan data gallery dari foto1 - foto5
  const galleryImages = [
    projectData.foto1,
    projectData.foto2,
    projectData.foto3,
    projectData.foto4,
    projectData.foto5,
  ].filter(Boolean);

  return (
    <>
      <section className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <Breadcrumb title={projectData.nama_proyek} />

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
            <ProjectInfo project={projectData} />
          </div>

          {/* Bagian About The Project (Letakkan di atas Quick Specs) */}
          <div className="mt-12">
            <AboutProject project={projectData} />
          </div>

          {/* Bagian Proyek Terkait (Menggantikan Project Gallery) */}
          <RelatedProjects projects={relatedProjectsData} />

          {/* CTA Banner */}
          <ProjectCtaBanner />
        </div>
      </section>
    </>
  );
};

export default ProjectDetailPage;
