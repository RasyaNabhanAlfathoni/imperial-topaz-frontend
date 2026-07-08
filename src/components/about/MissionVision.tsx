import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaGem, FaUsers } from "react-icons/fa6";

const cards = [
  {
    icon: <FaBullseye />,
    title: "Our Mission",
    desc: "Deliver sustainable and innovative construction solutions that exceed expectations and create lasting value for our clients and communities.",
  },
  {
    icon: <FaEye />,
    title: "Our Vision",
    desc: "To be a leading construction company recognized for excellence, innovation, and integrity in the region and beyond.",
  },
  {
    icon: <FaGem />,
    title: "Our Values",
    desc: "Integrity, Quality, Safety, Innovation, Teamwork",
    isList: true,
  },
  {
    icon: <FaUsers />,
    title: "Our Commitment",
    desc: "We are committed to building a better future through responsible construction practices and long-term partnerships.",
  },
];

const MissionVision = () => {
  return (
    <section className="py-12 md:py-16 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                {card.title}
              </h3>

              {card.isList ? (
                <ul className="space-y-2 text-sm text-gray-500">
                  {card.desc.split(", ").map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
