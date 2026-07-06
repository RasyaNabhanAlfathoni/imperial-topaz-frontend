import React from "react";
import { motion } from "framer-motion";
import { useServices } from "../../hooks/useServices";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  BuildingOfficeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

const ServicesSection: React.FC = () => {
  const { data: services, isLoading } = useServices();

  const iconMap: Record<number, any> = {
    1: BuildingOfficeIcon,
    2: HomeIcon,
    3: WrenchScrewdriverIcon,
    4: DocumentIcon,
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading services...</div>
        </div>
      </section>
    );
  }

  const displayedServices = services?.slice(0, 6) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Layanan Kami"
          subtitle="Solusi Konstruksi Terbaik"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => {
            const Icon = iconMap[(index % 4) + 1] || WrenchScrewdriverIcon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full p-6">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.nama_services}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.deskripsi}</p>
                  <Button variant="ghost" size="sm">
                    Selengkapnya →
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat Semua Layanan
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
