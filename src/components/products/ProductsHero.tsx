import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCube, FaShield, FaClock } from "react-icons/fa6";

const ProductsHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
          alt="Construction Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/50"></div>
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
          <span className="text-white font-medium">Our Products</span>
        </div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Our <span className="text-[#F97316]">Products</span> <br />
              Built for Strength. <br />
              Built for the Future.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              High quality construction materials and equipment to support every
              project with reliability and performance.
            </p>

            {/* Hero Stats */}
            <div className="flex flex-wrap gap-8 md:gap-12 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl">
                  <FaCube />
                </div>
                <div>
                  <h4 className="font-bold text-lg">200+</h4>
                  <p className="text-xs text-gray-400">Product Variants</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl">
                  <FaShield />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Trusted</h4>
                  <p className="text-xs text-gray-400">Quality Materials</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl">
                  <FaClock />
                </div>
                <div>
                  <h4 className="font-bold text-lg">On-Time</h4>
                  <p className="text-xs text-gray-400">Delivery Guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
