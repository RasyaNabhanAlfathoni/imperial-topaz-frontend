import React, { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "../../components/home/Hero";
import AboutSection from "../../components/home/AboutSection";
import ServicesSection from "../../components/home/ServicesSection";
import ProductsSection from "../../components/home/ProductsSection";
import ProjectsSection from "../../components/home/ProjectsSection";
import PartnersSection from "../../components/home/PartnersSection";
import NewsSection from "../../components/home/NewsSection";
import CTASection from "../../components/home/CTASection";

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <ProductsSection />
        <ServicesSection />
        <ProjectsSection />
        <PartnersSection />
        <NewsSection />
        <CTASection />
      </motion.div>
    </>
  );
};

export default HomePage;
