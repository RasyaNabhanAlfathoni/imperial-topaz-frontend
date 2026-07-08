// AboutHero.tsx
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 bg-[#F8FAFC] overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-10"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* MOBILE - Decorative Background Elements */}
      <div className="lg:hidden absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F97316]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#0F172A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl" />

        {/* Decorative Lines */}
        <div className="absolute top-10 right-10 w-16 h-16 border-2 border-[#F97316]/10 rounded-full" />
        <div className="absolute bottom-20 left-5 w-8 h-8 border-2 border-[#0F172A]/5 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-[#F97316]/10 rounded-full" />
      </div>

      {/* GAMBAR FULL DI SISI KANAN - Desktop Only */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-3/5 xl:w-2/3 hidden lg:block overflow-hidden">
        {/* Gradient Overlay dari kiri ke kanan */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to right, #F8FAFC 0%, #F8FAFC 15%, transparent 50%, transparent 100%)",
          }}
        />

        {/* Gradient Overlay tambahan dari bawah */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent 70%, #F8FAFC 100%)",
          }}
        />

        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"
          alt="About BuildCore"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-30">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#F97316]">
            Home
          </Link>
          <span>›</span>
          <span className="text-[#0F172A] font-medium">About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-40"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] leading-tight mb-6">
              We Build More <br />
              Than Structures, <br />
              <span className="text-[#F97316]">We Build Relationships.</span>
            </h1>

            {/* Mobile Decorative Line */}
            <div className="lg:hidden w-20 h-1 bg-[#F97316] rounded-full mb-6" />

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg backdrop-blur-sm bg-white/30 p-4 rounded-xl md:bg-transparent md:p-0 relative">
              {/* Mobile subtle gradient background */}
              <span className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#F97316]/5 to-transparent rounded-xl -z-10" />
              BuildCore is a construction company committed to delivering
              innovative, sustainable, and high-quality solutions across various
              industries.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#0F172A] text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-[#F97316] transition-all shadow-lg hover:shadow-orange-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center group-hover:bg-white group-hover:text-[#F97316] transition-colors">
                <FaPlay className="w-3 h-3 ml-0.5" />
              </div>
              <span>Watch Company Video</span>
              <span className="text-xs text-gray-400 group-hover:text-white/70 ml-1">
                2:15 min
              </span>
            </Link>
          </motion.div>

          {/* Kolom Kanan Kosong */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
