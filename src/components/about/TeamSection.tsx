import { motion } from "framer-motion";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
// Icons
import { FaLinkedinIn, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const teamData = [
  {
    name: "Risky Pratama",
    role: "CEO & Founder",
    desc: "Visionary leader with 15+ years in construction industry.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Dewi Lestari",
    role: "COO",
    desc: "Expert in operations management and project delivery.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Andi Wijaya",
    role: "CTO",
    desc: "Driving innovation through technology and engineering.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Budi Santoso",
    role: "CFO",
    desc: "Ensuring sustainable growth and financial excellence.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
          Our Team
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">
          Meet Our Leadership Team
        </h2>

        <div className="relative px-4 md:px-12">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".team-next",
              prevEl: ".team-prev",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-6"
          >
            {teamData.map((member, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 text-center group"
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-50 group-hover:border-[#F97316] transition-colors">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-lg">
                    {member.name}
                  </h4>
                  <p className="text-[#F97316] text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {member.desc}
                  </p>
                  <div className="mt-4 flex justify-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#F97316] hover:text-white transition-all">
                      <FaLinkedinIn className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav Buttons */}
          <button className="team-prev absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] transition-all z-10 border border-gray-100">
            <FaChevronLeft />
          </button>
          <button className="team-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] transition-all z-10 border border-gray-100">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
