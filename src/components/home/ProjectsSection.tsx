import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";

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
];

const ProjectsSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex + 4 < projects.length) setStartIndex(startIndex + 1);
  };
  const prevSlide = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  // Logic untuk menampilkan 4 item atau sisa item jika di mobile
  const visibleProjects = projects.slice(startIndex, startIndex + 4);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              Our Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Building Success <br /> Through Our Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="mt-4 md:mt-0 inline-flex items-center border border-gray-300 hover:border-[#F97316] text-[#0F172A] hover:text-[#F97316] px-6 py-3 rounded-md font-bold transition-all"
          >
            View All Projects <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group/card"
              >
                <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-[#0F172A] text-lg mb-1">
                      {project.title}
                    </h4>
                    <p className="text-gray-500 text-xs font-medium">
                      {project.location}
                    </p>
                    <span className="inline-block mt-3 text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons (Absolute) */}
          <button
            onClick={prevSlide}
            disabled={startIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            disabled={startIndex + 4 >= projects.length}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
