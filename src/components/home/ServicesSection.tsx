import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaHelmetSafety,
  FaGears,
  FaDiagramProject,
} from "react-icons/fa6";

const services = [
  {
    icon: <FaHelmetSafety />,
    title: "Our Products",
    desc: "High quality construction materials and equipment to support your projects.",
    link: "/products",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    icon: <FaGears />,
    title: "Our Services",
    desc: "Professional construction services you can rely on, start to finish.",
    link: "/services",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    icon: <FaDiagramProject />,
    title: "Our Projects",
    desc: "See how we build your vision into real-world successes.",
    link: "/projects",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-5">
        {/* FLOATING STATS CARD - Pindah ke sini */}
        <div className="relative -mt-32 mb-16 z-10">
          {" "}
          {/* -mt-20 biar naik ke atas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-2xl p-6 md:p-10 flex flex-wrap justify-around gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#0F172A]">15+</h4>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#0F172A]">250+</h4>
                <p className="text-sm text-gray-500">Projects Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#0F172A]">98%</h4>
                <p className="text-sm text-gray-500">Client Satisfaction</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xl">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#0F172A]">
                  Professional
                </h4>
                <p className="text-sm text-gray-500">& Certified Team</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
            Our Solutions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Comprehensive Solutions <br /> For Every Construction Need
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center text-white text-2xl shadow-lg">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {service.desc}
                </p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:gap-2 transition-all"
                >
                  Explore {service.title.split(" ")[1]}{" "}
                  <FaArrowRight className="ml-2 w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
