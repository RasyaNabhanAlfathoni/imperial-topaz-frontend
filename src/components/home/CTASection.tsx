import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHelmetSafety } from "react-icons/fa6";

const CTASection = () => {
  return (
    <section className="py-16 bg-[#0F172A] text-white relative overflow-hidden mx-14 mb-5 rounded-xl">
      {/* Background Pattern/Overlay (Opsional) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E293B] opacity-90"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#F97316] rounded-full flex items-center justify-center text-4xl shadow-2xl">
            <FaHelmetSafety />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Ready to Build Your <br /> Dream Project?
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-gray-300 text-sm max-w-xs md:text-right">
            Let's discuss how we can help you turn your vision into reality.
          </p>
          <Link
            to="/contact"
            className="bg-[#F97316] hover:bg-[#ea580c] text-white px-8 py-4 rounded-md font-semibold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
          >
            Contact Us Now <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
