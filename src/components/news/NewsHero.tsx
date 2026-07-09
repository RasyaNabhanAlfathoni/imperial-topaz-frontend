import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NewsHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop"
          alt="News Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/70"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>›</span>
          <span className="text-white font-medium">News</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            <span className="text-[#F97316]">Berita</span> & Informasi
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            Dapatkan informasi terbaru, update perusahaan, dan insight seputar
            industri konstruksi.
          </p>
          <div className="w-12 h-1 bg-[#F97316] mt-6 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsHero;
