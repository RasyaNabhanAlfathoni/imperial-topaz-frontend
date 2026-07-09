import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";

// Import Components
import ServicesHero from "../../components/services/ServicesHero";
import ServiceCard from "../../components/services/ServiceCard";
import ServicesCtaBanner from "../../components/services/ServicesCtaBanner";
import ServicesStats from "../../components/services/ServicesStats";

// Import API dan types
import { serviceAPI } from "../../api/service";
import type { Service } from "../../types/service";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari API
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await serviceAPI.getAll();

      // Pastikan data adalah array
      const servicesList = Array.isArray(data) ? data : [];
      setServices(servicesList);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Gagal mengambil data layanan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali di-render
  useEffect(() => {
    fetchServices();
  }, []);

  // Loading state
  if (loading) {
    return (
      <>
        <ServicesHero />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data layanan...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <ServicesHero />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchServices}
                className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ServicesHero />

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left mb-10"
          >
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Our Core Services
            </h2>
            <div className="w-12 h-1 bg-[#F97316] mt-3 rounded-full"></div>
          </motion.div>

          {/* Grid Layanan */}
          {services.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Belum ada data layanan.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}

          {/* CTA Banner */}
          <ServicesCtaBanner />

          {/* Stats Section (di bawah CTA) */}
          <ServicesStats />
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
