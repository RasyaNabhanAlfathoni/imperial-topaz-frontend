import { Link } from "react-router-dom";
import { FaArrowRight, FaCube } from "react-icons/fa6";

const ServicesCtaBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-[#0F172A] text-white mt-12 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80"
          alt="Construction"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#F97316] rounded-xl flex items-center justify-center text-white text-3xl shrink-0 transform rotate-12">
            <FaCube />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Have a Project in Mind?
            </h3>
            <p className="text-gray-300 mt-1">
              Let's discuss how we can bring your vision to life with our
              professional services.
            </p>
          </div>
        </div>
        <Link
          to="/contact"
          className="bg-[#F97316] hover:bg-[#ea580c] text-white px-8 py-3.5 rounded-md font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/30 shrink-0"
        >
          Contact Us Now <FaArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesCtaBanner;
