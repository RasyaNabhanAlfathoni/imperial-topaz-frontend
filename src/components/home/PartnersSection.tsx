import React from "react";
import { motion } from "framer-motion";
import { usePartners } from "../../hooks/usePartners";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { LinkIcon } from "@heroicons/react/24/outline";

const PartnersSection: React.FC = () => {
  const { data: partners, isLoading } = usePartners();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading partners...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Mitra Kerja"
          subtitle="Bekerja Sama Dengan Perusahaan Terpercaya"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners?.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card hover className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-4">
                    <img
                      src={partner.logo_perusahaan || "/placeholder-logo.png"}
                      alt={partner.nama_perusahaan}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {partner.nama_perusahaan}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {partner.deskripsi}
                  </p>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
