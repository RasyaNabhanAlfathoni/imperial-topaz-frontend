import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";

// Import Components
import ServicesHero from "../../components/services/ServicesHero";
import ServiceCard from "../../components/services/ServiceCard";
import ServicesCtaBanner from "../../components/services/ServicesCtaBanner";
import ServicesStats from "../../components/services/ServicesStats";

// --- DATA DUMMY LAYANAN ---
// Di proyek nyata, data ini akan diambil dari API `useServices()`
// Gambar di sini saya ganti dengan foto konstruksi dari Unsplash sesuai permintaan Anda untuk menggantikan logo
const servicesData = [
  {
    id: 1,
    title: "Pre-Construction",
    desc: "Planning, budgeting, feasibility studies, and design support to set your project up for success.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 2,
    title: "General Construction",
    desc: "Full-service construction for commercial, industrial, and residential projects.",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: 3,
    title: "Project Management",
    desc: "End-to-end project management ensuring quality, budget, and timeline are met.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: 4,
    title: "Design & Build",
    desc: "Integrated solutions from concept to construction under one roof.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    id: 5,
    title: "Renovation",
    desc: "Transforming existing structures with quality renovation services.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
  {
    id: 6,
    title: "Structural Works",
    desc: "Strong and safe structures built with engineering excellence.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 7,
    title: "MEP Installation",
    desc: "Mechanical, electrical, and plumbing systems installed with precision.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: 8,
    title: "Consulting",
    desc: "Expert consultation to help you make informed decisions for your projects.",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
];

const ServicesPage = () => {
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

          {/* Grid Layanan (8 Kartu) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

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
