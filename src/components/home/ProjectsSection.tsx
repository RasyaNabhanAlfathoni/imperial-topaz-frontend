import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Dummy Data
const projects = [
  {
    title: "Office Building Jakarta",
    location: "Jakarta",
    year: "2025",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
  {
    title: "Warehouse Surabaya",
    location: "Surabaya",
    year: "2025",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    title: "Bridge Construction Bandung",
    location: "Bandung",
    year: "2024",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
  },
  {
    title: "Housing Complex Semarang",
    location: "Semarang",
    year: "2024",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    title: "Highway Project Medan", // Saya tambahin 1 data biar slider lebih kelihatan interaktif
    location: "Medan",
    year: "2024",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
];

const ProjectsSection = () => {
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

        {/* 
          SWIPER SLIDER WRAPPER 
          - slidesPerView: 1 (Mobile), 2 (Tablet), 4 (Desktop)
          - spaceBetween: Jarak antar card
        */}
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
                // Tablet
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                // Desktop
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="pb-14 md:pb-0 min-h-[400px]" // Padding bottom untuk pagination dots di mobile
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                {/* Motion div dibungkus di dalam SwiperSlide */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group/card h-full"
                >
                  <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white h-full flex flex-col">
                    <div className="h-56 overflow-hidden shrink-0">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">
                        {project.title}
                      </h4>
                      <p className="text-gray-500 text-xs font-medium">
                        {project.location}
                      </p>
                      <span className="inline-block mt-auto pt-3 text-xs text-gray-400 border-t border-gray-100 w-full">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons (Hanya muncul di Desktop) */}
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
