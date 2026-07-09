import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaCalendar,
  FaArrowRight,
  FaUser,
} from "react-icons/fa6";

interface ProjectCardProps {
  project: {
    id: number;
    nama_proyek: string;
    lokasi: string;
    tahun: string;
    client: string; // <--- Tambahkan client di sini
    foto1: string;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      <div className="h-56 overflow-hidden relative">
        <img
          src={project.foto1}
          alt={project.nama_proyek}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#F97316] transition-colors">
          {project.nama_proyek}
        </h3>

        <div className="space-y-2 mb-4 flex-grow">
          {/* Client */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaUser className="w-3 h-3 text-gray-400" />
            <span className="font-medium text-gray-700">{project.client}</span>
          </div>
          {/* Lokasi */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaLocationDot className="w-3 h-3 text-gray-400" />
            <span>{project.lokasi}</span>
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
