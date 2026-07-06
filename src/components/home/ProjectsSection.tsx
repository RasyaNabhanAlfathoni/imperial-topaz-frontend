import React from "react";
import { motion } from "framer-motion";
import { useProjects } from "../../hooks/useProjects";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  MapPinIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const ProjectsSection: React.FC = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </section>
    );
  }

  const displayedProjects = projects?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Proyek Terbaru" subtitle="Portofolio Kami" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.foto1 || "/placeholder.jpg"}
                    alt={project.nama_proyek}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.tahun}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {project.nama_proyek}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-4 w-4 text-blue-600" />
                      <span>{project.lokasi}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-blue-600" />
                      <span>Klien: {project.client}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                      <span>Tahun: {project.tahun}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm">
                      Lihat Detail →
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat Semua Proyek
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
