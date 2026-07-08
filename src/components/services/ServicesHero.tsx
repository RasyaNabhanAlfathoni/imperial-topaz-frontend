import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserTie, FaShield, FaClock, FaBullseye } from "react-icons/fa6";

const ServicesHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop"
          alt="Construction Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/60"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>›</span>
          <Link to="/solutions" className="hover:text-white">
            Solutions
          </Link>
          <span>›</span>
          <span className="text-white font-medium">Our Services</span>
        </div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Our <span className="text-[#F97316]">Services</span> <br />
              Professional Solutions. <br />
              Delivered with Excellence.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              From planning to completion, we provide comprehensive construction
              services you can trust.
            </p>

            {/* Hero Stats (4 Kolom) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-white">
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl mb-1">
                  <FaUserTie />
                </div>
                <h4 className="font-bold text-sm">Experienced Team</h4>
                <p className="text-xs text-gray-400">
                  Certified professionals with years of expertise
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl mb-1">
                  <FaShield />
                </div>
                <h4 className="font-bold text-sm">Quality Work</h4>
                <p className="text-xs text-gray-400">
                  Committed to quality, safety, and precision.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl mb-1">
                  <FaClock />
                </div>
                <h4 className="font-bold text-sm">On-Time Delivery</h4>
                <p className="text-xs text-gray-400">
                  We deliver projects on schedule.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl mb-1">
                  <FaBullseye />
                </div>
                <h4 className="font-bold text-sm">Client Focused</h4>
                <p className="text-xs text-gray-400">
                  Your satisfaction is our top priority.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
