import { motion } from "framer-motion";
import { FaBuilding, FaUserTie, FaAward, FaFaceSmile } from "react-icons/fa6";

const ServicesStats = () => {
  const stats = [
    { icon: <FaBuilding />, value: "250+", label: "Projects Completed" },
    { icon: <FaUserTie />, value: "120+", label: "Professional Team" },
    { icon: <FaAward />, value: "15+", label: "Years Experience" },
    { icon: <FaFaceSmile />, value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center md:flex-row md:items-center justify-center gap-4 text-center md:text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
                  {stat.value}
                </h4>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStats;
