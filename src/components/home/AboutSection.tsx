import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCircleCheck, FaArrowRight, FaPlay } from "react-icons/fa6";

const AboutSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            We Are A Trusted <br /> Construction Partner
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            BuildCore is a construction company committed to delivering
            innovative, sustainable, and high-quality solutions across various
            industries.
          </p>

          <ul className="space-y-3 mb-8 text-[#1E293B]">
            <li className="flex items-center gap-3">
              <FaCircleCheck className="text-[#F97316]" /> Experienced &
              Professional Team
            </li>
            <li className="flex items-center gap-3">
              <FaCircleCheck className="text-[#F97316]" /> Quality Work & Timely
              Delivery
            </li>
            <li className="flex items-center gap-3">
              <FaCircleCheck className="text-[#F97316]" /> Safety, Integrity &
              Innovation
            </li>
            <li className="flex items-center gap-3">
              <FaCircleCheck className="text-[#F97316]" /> Customer-Centric
              Approach
            </li>
          </ul>

          <Link
            to="/about"
            className="inline-flex items-center bg-[#F97316] text-white px-8 py-3.5 rounded-md font-semibold hover:bg-[#ea580c] transition-all shadow-lg hover:shadow-orange-200"
          >
            Learn More About Us <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
              alt="About BuildCore"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] hover:scale-110 transition-all shadow-xl">
                <FaPlay className="ml-1" />
              </button>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-[#0F172A] text-white p-6 rounded-xl shadow-xl min-w-[120px] min-h-[150px] hidden md:block">
            <h4 className="text-4xl font-bold text-white">15+</h4>
            <hr className="border-[#F97316] w-4 my-2"></hr>
            <p className="text-xs text-gray-300 mt-1">
              Years of <br /> Experience
            </p>
            <hr className="border-[#F97316] w-4 mt-2"></hr>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
