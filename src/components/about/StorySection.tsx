import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa6";

const StorySection = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">
            Building Excellence <br />
            <span className="text-[#F97316]">Since 2009</span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            Founded in 2009, BuildCore started with a simple belief: every
            structure we build should stand the test of time and bring positive
            impact to the people who use it.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            From a small team of passionate professionals, we have grown into a
            trusted construction partner for government, commercial, and
            residential projects.
          </p>
          <p className="text-gray-500 leading-relaxed mb-8">
            Our journey is built on dedication, innovation, and the commitment
            to always deliver the best.
          </p>

          {/* Signature */}
          <div className="flex flex-col">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/John_Hancock_Signature.svg/1024px-John_Hancock_Signature.svg.png"
              alt="Signature"
              className="w-32 h-auto opacity-70 mb-2 grayscale"
            />
            <p className="font-bold text-[#0F172A]">Risky Pratama</p>
            <p className="text-sm text-gray-400">CEO & Founder</p>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
              alt="Our Story"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] hover:scale-110 transition-all shadow-xl">
                <FaPlay className="ml-1" />
              </button>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-[#0F172A] text-white p-6 rounded-xl shadow-2xl hidden md:flex flex-col items-start max-w-[180px]">
            <h4 className="text-4xl font-bold text-[#F97316]">10+</h4>
            <p className="text-sm text-gray-300 leading-tight mb-2">
              Years Of Experience
            </p>
            <p className="text-[10px] text-gray-400">
              Delivering exceptional construction solutions with integrity and
              professionalism.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
