import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaHelmetSafety,
  FaGears,
  FaDiagramProject,
} from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

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
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#F97316] font-semibold uppercase tracking-wider text-sm mb-2">
            Our Solutions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            Comprehensive Solutions <br /> For Every Construction Need
          </h2>
        </div>

        {/* 
          SWIPER SLIDER WRAPPER 
          - slidesPerView: 1 (Mobile), 2 (Tablet), 3 (Desktop)
          - spaceBetween: Jarak antar card
        */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-12" // Memberikan ruang untuk bullet pagination di bawah
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              {/* Motion div dibungkus di dalam SwiperSlide */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col"
              >
                <div className="h-48 overflow-hidden relative shrink-0">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center text-white text-2xl shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-grow">
                    {service.desc}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-[#F97316] font-semibold text-sm hover:gap-2 transition-all mt-auto"
                  >
                    Explore {service.title.split(" ")[1]}{" "}
                    <FaArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ServicesSection;
