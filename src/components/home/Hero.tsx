import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    title: "Building Tomorrow, Together",
    subtitle:
      "We deliver high-quality construction solutions with innovation, integrity, and excellence.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
    title: "Sustainable Infrastructure",
    subtitle:
      "Creating eco-friendly and durable structures for a better future.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px] w-full overflow-hidden mt-[60px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-[#0F172A]/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ms-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  x: index === currentSlide ? 0 : -50,
                }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-6"
              >
                <span className="inline-block bg-[#F97316]/20 text-[#F97316] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Building Better Futures
                </span>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/solutions"
                    className="bg-[#F97316] hover:bg-[#ea580c] text-white px-8 py-3.5 rounded-md font-semibold flex items-center gap-2 transition-all hover:shadow-lg"
                  >
                    Explore Solutions <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/projects"
                    className="border border-white/30 hover:border-white bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-md font-semibold transition-all"
                  >
                    View Projects
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <FaChevronRight />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 mb-11">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-[#F97316]" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
