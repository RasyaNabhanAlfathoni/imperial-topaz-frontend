import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../../hooks/useProjects";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  Cog8ToothIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { data: projects, isLoading } = useProjects();

  const filters = [
    "All",
    "Commercial",
    "Industrial",
    "Infrastructure",
    "Residential",
  ];

  const filterIcons: Record<string, any> = {
    Commercial: BuildingOffice2Icon,
    Industrial: Cog8ToothIcon,
    Infrastructure: BuildingStorefrontIcon,
    Residential: HomeModernIcon,
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects?.filter((p) => p.kategori === activeFilter);

  const displayedProjects = filteredProjects?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Projects"
          subtitle="Building Success Through Our Projects"
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => {
            const Icon = filterIcons[filter];
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeFilter === filter
                    ? "bg-navy-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{filter}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card hover className="h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        project.foto1 ||
                        "https://via.placeholder.com/400x300?text=Project"
                      }
                      alt={project.nama_proyek}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {project.tahun}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-navy-600 mb-2">
                      {project.nama_proyek}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="h-3 w-3 text-orange-500" />
                        <span>{project.lokasi}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-3 w-3 text-orange-500" />
                        <span>{project.client}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group w-full justify-center"
                      >
                        View Project
                        <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-12">
          <Button variant="orange" size="lg">
            View All Projects
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
