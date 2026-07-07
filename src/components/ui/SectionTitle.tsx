import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
  centered = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${centered ? "text-center" : ""} mb-12 ${className}`}
    >
      {subtitle && (
        <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider inline-block mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-600 mt-2 mb-4">
        {title}
      </h2>
      <div
        className={`w-20 h-1 bg-orange-500 rounded-full ${centered ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
};

export default SectionTitle;
