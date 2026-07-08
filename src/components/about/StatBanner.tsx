import { motion } from "framer-motion";
import { FaAward, FaBuilding, FaUserTie, FaFaceSmile } from "react-icons/fa6";

const stats = [
  { icon: <FaAward />, value: "15+", label: "Years Experience" },
  { icon: <FaBuilding />, value: "250+", label: "Projects Completed" },
  { icon: <FaUserTie />, value: "120+", label: "Professional Team" },
  { icon: <FaFaceSmile />, value: "98%", label: "Client Satisfaction" },
];

const StatBanner = () => {
  return (
    <section className="py-10 bg-[#0F172A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center md:flex-row md:items-center justify-center gap-4 text-center md:text-left text-white border-r last:border-r-0 border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-2xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold">{stat.value}</h4>
                <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBanner;
