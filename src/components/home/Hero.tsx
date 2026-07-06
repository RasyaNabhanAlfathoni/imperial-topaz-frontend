import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Membangun Masa Depan <br />
              <span className="text-yellow-400">Dengan Kualitas</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Kami adalah perusahaan konstruksi terpercaya yang berkomitmen
              menghadirkan infrastruktur berkualitas tinggi untuk Indonesia yang
              lebih baik.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              >
                Lihat Proyek
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Construction"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
