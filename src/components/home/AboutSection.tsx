import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCircleCheck, FaArrowRight, FaPlay } from "react-icons/fa6";

const AboutSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* KOLOM KIRI (Mobile: Judul + Teks Isi, Desktop: Judul + Teks Isi di kiri) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col order-1"
        >
          {/* 1. JUDUL (Paling atas di Mobile & Desktop) */}
          <div>
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              We Are A Trusted <br /> Construction Partner
            </h2>
          </div>

          {/* 2. GAMBAR (Muncul di sini khusus untuk Mobile, di Desktop tidak akan muncul di sini) */}
          <div className="lg:hidden mb-8 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
                alt="About BuildCore"
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] hover:scale-110 transition-all shadow-xl">
                  <FaPlay className="ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. TEKS ISI (Deskripsi & List - Paling bawah di Mobile) */}
          <div>
            <p className="text-gray-500 leading-relaxed mb-6">
              BuildCore is a construction company committed to delivering
              innovative, sustainable, and high-quality solutions across various
              industries.
            </p>

            <ul className="space-y-3 mb-8 text-[#1E293B] text-sm md:text-base">
              <li className="flex items-start gap-3">
                <FaCircleCheck className="text-[#F97316] mt-1 shrink-0" />
                <span>Experienced & Professional Team</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCircleCheck className="text-[#F97316] mt-1 shrink-0" />
                <span>Quality Work & Timely Delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCircleCheck className="text-[#F97316] mt-1 shrink-0" />
                <span>Safety, Integrity & Innovation</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCircleCheck className="text-[#F97316] mt-1 shrink-0" />
                <span>Customer-Centric Approach</span>
              </li>
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center bg-[#F97316] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-md font-semibold hover:bg-[#ea580c] transition-all shadow-lg hover:shadow-orange-200"
            >
              Learn More About Us <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* KOLOM KANAN (Desktop Only: Gambar + Floating Badge) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative hidden lg:block order-2"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
              alt="About BuildCore"
              className="w-full h-[500px] object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] hover:scale-110 transition-all shadow-xl">
                <FaPlay className="ml-1" />
              </button>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-[#0F172A] text-white p-6 rounded-xl shadow-xl min-w-[120px] min-h-[150px]">
            <h4 className="text-4xl font-bold text-[#F97316]">15+</h4>
            <hr className="border-white/20 w-6 my-2"></hr>
            <p className="text-xs text-gray-300 mt-1 font-medium leading-tight">
              Years of <br /> Experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
