import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-navy-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-orange-400 text-sm font-semibold uppercase tracking-wider mb-4">
            Ready to Build
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help you turn your vision into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="orange" size="lg">
              Contact Us Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <PhoneIcon className="mr-2 h-5 w-5" />
              +62 812 3456 7890
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
