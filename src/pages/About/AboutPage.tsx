import MainLayout from "../../layouts/MainLayout";
import AboutHero from "../../components/about/AboutHero";
import MissionVision from "../../components/about/MissionVision";
import StatBanner from "../../components/about/StatBanner";
import StorySection from "../../components/about/StorySection";
import TeamSection from "../../components/about/TeamSection";
import CertificationsSection from "../../components/about/CertificationsSection";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <StatBanner />
      <StorySection />
      <TeamSection />
      <CertificationsSection />
    </>
  );
};

export default AboutPage;
