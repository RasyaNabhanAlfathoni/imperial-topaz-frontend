import React from "react";
import Hero from "../../components/home/Hero";
import AboutSection from "../../components/home/AboutSection";
import ServicesSection from "../../components/home/ServicesSection";
import ProductsSection from "../../components/home/ProductsSection";
import ProjectsSection from "../../components/home/ProjectsSection";
import PartnersSection from "../../components/home/PartnersSection";
import NewsSection from "../../components/home/NewsSection";
import CTASection from "../../components/home/CTASection";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <ProjectsSection />
      <PartnersSection />
      <NewsSection />
      <CTASection />
    </motion.div>
  );
};

export default HomePage;
