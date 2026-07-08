import { motion } from "framer-motion";
import { FaCircleCheck, FaIndustry, FaClock, FaShield } from "react-icons/fa6";

const ProductsFeatures = () => {
  const features = [
    {
      icon: <FaCircleCheck />,
      title: "Quality Guaranteed",
      desc: "All products meet industry standards.",
    },
    {
      icon: <FaIndustry />,
      title: "Competitive Pricing",
      desc: "Best value for your construction needs.",
    },
    {
      icon: <FaClock />,
      title: "Timely Delivery",
      desc: "On-time delivery to keep your project on track.",
    },
    {
      icon: <FaShield />,
      title: "Expert Support",
      desc: "Our team is ready to help you choose the best.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl mb-4">
                {feature.icon}
              </div>
              <h4 className="font-bold text-[#0F172A] mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsFeatures;
