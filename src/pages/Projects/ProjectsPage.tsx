import { useState } from "react";
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

// ==========================================
// 1. DATA DUMMY PROYEK
// ==========================================
const projectsData = [
  {
    id: 1,
    nama_proyek: "Office Building Jakarta",
    lokasi: "Jakarta, Indonesia",
    tahun: "2024",
    deskripsi: "Modern office building with sustainable design.",
    client: "PT. Corporate Indonesia",
    kategori: "Commercial",
    foto1:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    foto2:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    foto3:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    foto4:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    foto5:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    id: 2,
    nama_proyek: "Green Villa Residence",
    lokasi: "Bandung, Indonesia",
    tahun: "2023",
    deskripsi: "Eco-friendly residential complex with green spaces.",
    client: "PT. Alam Lestari",
    kategori: "Residential",
    foto1:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    foto2:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    foto3:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    foto4:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    foto5:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: 3,
    nama_proyek: "Cikampek Toll Road Section 2",
    lokasi: "West Java, Indonesia",
    tahun: "2024",
    deskripsi: "Major infrastructure project connecting cities.",
    client: "PT. Jasa Marga",
    kategori: "Infrastructure",
    foto1:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
    foto2:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    foto3:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    foto4:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    foto5:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: 4,
    nama_proyek: "Logistics Warehouse",
    lokasi: "Surabaya, Indonesia",
    tahun: "2023",
    deskripsi: "Large-scale warehouse with modern facilities.",
    client: "PT. Logistik Nusantara",
    kategori: "Industrial",
    foto1:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    foto2:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    foto3:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    foto4:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    foto5:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: 5,
    nama_proyek: "University Building",
    lokasi: "Yogyakarta, Indonesia",
    tahun: "2022",
    deskripsi: "Educational facility with modern lecture halls.",
    client: "PT. Pendidikan Maju",
    kategori: "Institutional",
    foto1:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80",
    foto2:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    foto3:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    foto4:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    foto5:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: 6,
    nama_proyek: "River Bridge Project",
    lokasi: "Central Java, Indonesia",
    tahun: "2022",
    deskripsi: "Strategic bridge connecting two major regions.",
    client: "PT. Pembangunan Jaya",
    kategori: "Infrastructure",
    foto1:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    foto2:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    foto3:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    foto4:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    foto5:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
];

// ==========================================
// 2. DATA DUMMY MITRA
// ==========================================
const partnersData = [
  {
    id: 1,
    nama_perusahaan: "PT Waskita Karya",
    deskripsi: "Leading infrastructure and construction company in Indonesia.",
    logo_perusahaan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Adhi_Karya_logo.svg/2560px-Adhi_Karya_logo.svg.png",
    website: "https://www.waskita.co.id/",
  },
  {
    id: 2,
    nama_perusahaan: "PT PP (Persero) Tbk",
    deskripsi: "Construction & investment company with a strong track record.",
    logo_perusahaan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/PP_Logo.svg/2560px-PP_Logo.svg.png",
    website: "https://www.pp.co.id/",
  },
  {
    id: 3,
    nama_perusahaan: "PT Jaya Konstruksi",
    deskripsi:
      "Experienced in building various construction projects nationwide.",
    logo_perusahaan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Jasa_Marga_logo.svg/2560px-Jasa_Marga_logo.svg.png",
    website: "https://www.jayakonstruksi.co.id/",
  },
  {
    id: 4,
    nama_perusahaan: "PT Total Bangun Persada Tbk",
    deskripsi: "Building innovative solutions for a better future.",
    logo_perusahaan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/TotalEnergies_logo.svg/2560px-TotalEnergies_logo.svg.png",
    website: "https://www.totalbp.com/",
  },
  {
    id: 5,
    nama_perusahaan: "PT Nindya Karya",
    deskripsi: "Trusted partner in engineering and construction services.",
    logo_perusahaan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/MIND_ID_logo.svg/2560px-MIND_ID_logo.svg.png",
    website: "https://www.nindyakarya.co.id/",
  },
  {
    id: 6,
    nama_perusahaan: "PT Adhi Karya (Persero) Tbk",
    deskripsi: "Committed to delivering quality and sustainable construction.",
    logo_perusahaan:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Adhi_Karya_logo.svg/2560px-Adhi_Karya_logo.svg.png",
    website: "https://www.adhi.co.id/",
  },
];

// ==========================================
// 3. HALAMAN UTAMA PROJECTS
// ==========================================
const ProjectsPage = () => {
  const [visibleCount, setVisibleCount] = useState(6); // Tampilkan 6 proyek awal

  const visibleProjects = projectsData.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projectsData.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, projectsData.length));
  };

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
            {/* Tampilan Desktop: Grid 3 Kolom */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
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
          <ProjectsPartners partners={partnersData} />
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
