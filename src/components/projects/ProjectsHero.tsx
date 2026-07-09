import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectsHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
          alt="Projects Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/70"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>›</span>
          <span className="text-white font-medium">Projects</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Our <span className="text-[#F97316]">Projects</span> <br />
            Building Success <br />
            Across Industries
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            Explore our portfolio of completed projects that reflect our
            commitment to quality, innovation, and client satisfaction.
          </p>
          <div className="w-12 h-1 bg-[#F97316] mt-6 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsHero;
