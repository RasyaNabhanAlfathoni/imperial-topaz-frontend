import React from "react";
import { motion } from "framer-motion";
import { usePartners } from "../../hooks/usePartners";
import SectionTitle from "../ui/SectionTitle";

const PartnersSection: React.FC = () => {
  const { data: partners, isLoading } = usePartners();

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-400">Loading partners...</div>
        </div>
      </section>
    );
  }

  // Duplicate partners for seamless scrolling
  const duplicatedPartners = partners
    ? [...partners, ...partners, ...partners]
    : [];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Trusted By Leading Companies"
          subtitle="Our Partners"
        />

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex space-x-12 items-center"
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0"
              >
                <div className="bg-white px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={
                      partner.logo_perusahaan ||
                      "https://via.placeholder.com/120x60?text=Logo"
                    }
                    alt={partner.nama_perusahaan}
                    className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
