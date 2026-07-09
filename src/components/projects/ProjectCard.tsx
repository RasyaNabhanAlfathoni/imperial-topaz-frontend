import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaCalendar,
  FaArrowRight,
  FaUser,
} from "react-icons/fa6";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23e5e7eb'/%3E%3Ctext x='300' y='200' font-family='system-ui' font-size='20' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

interface ProjectCardProps {
  project: {
    id: number;
    nama_proyek: string;
    lokasi: string;
    tahun: string;
    client: string;
    foto1?: string;
    foto2?: string;
    foto3?: string;
    foto4?: string;
    foto5?: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  // Fungsi untuk mendapatkan gambar pertama yang tersedia
  const getProjectImage = (): string => {
    const foto =
      project.foto1 ||
      project.foto2 ||
      project.foto3 ||
      project.foto4 ||
      project.foto5;
    return foto ? getImageUrl(foto) : PLACEHOLDER_IMAGE;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      <div className="h-56 overflow-hidden relative bg-gray-100">
        <img
          src={getProjectImage()}
          alt={project.nama_proyek}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
          loading="lazy"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {project.nama_proyek}
        </h3>

        <div className="space-y-2 mb-4 flex-grow">
          {/* Client */}
          {project.client && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaUser className="w-3 h-3 text-gray-400" />
              <span className="font-medium text-gray-700 line-clamp-1">
                {project.client}
              </span>
            </div>
          )}
          {/* Lokasi */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaLocationDot className="w-3 h-3 text-gray-400" />
            <span className="line-clamp-1">{project.lokasi}</span>
          </div>
          {/* Tahun */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCalendar className="w-3 h-3 text-gray-400" />
            <span>{project.tahun}</span>
          </div>
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:gap-2 transition-all group-hover:gap-2 mt-auto"
        >
          View Project{" "}
          <FaArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
