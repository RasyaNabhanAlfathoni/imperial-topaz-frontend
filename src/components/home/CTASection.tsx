import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Membangun Masa Depan Bersama Kami?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran
            terbaik untuk proyek Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
            >
              Konsultasi Gratis
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900"
            >
              Hubungi Kami
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
