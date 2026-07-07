import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/home/Hero";
import ServicesSection from "../../components/home/ServicesSection";
import ProjectsSection from "../../components/home/ProjectsSection";
import AboutSection from "../../components/home/AboutSection";
import PartnersSection from "../../components/home/PartnersSection";
import NewsSection from "../../components/home/NewsSection";
import CTASection from "../../components/home/CTASection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <PartnersSection />
      <NewsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
