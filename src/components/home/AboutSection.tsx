import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

const AboutSection: React.FC = () => {
  const features = [
    "Pengalaman lebih dari 10 tahun",
    "Tim profesional dan berpengalaman",
    "Komitmen terhadap kualitas",
    "Teknologi modern dan inovatif",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="About Us"
              className="rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              title="Tentang Kami"
              subtitle="Sekilas Perusahaan"
              className="text-left"
            />
            <p className="text-gray-600 text-lg mb-6">
              Kami adalah perusahaan konstruksi yang berdedikasi untuk
              memberikan solusi infrastruktur terbaik dengan mengutamakan
              kualitas, keamanan, dan kepuasan klien.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary">Selengkapnya</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
