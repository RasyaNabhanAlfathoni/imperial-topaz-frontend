import { motion } from "framer-motion";

// Ganti URL ini dengan logo asli Anda di folder assets, dan tambahkan url website partner
const partners = [
  {
    name: "Adhi Karya",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Adhi_Karya_logo.svg/2560px-Adhi_Karya_logo.svg.png",
    url: "https://www.adhi.co.id/", // Ganti dengan URL asli
  },
  {
    name: "PP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/PP_Logo.svg/2560px-PP_Logo.svg.png",
    url: "https://www.pp.co.id/",
  },
  {
    name: "Jasa Marga",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Jasa_Marga_logo.svg/2560px-Jasa_Marga_logo.svg.png",
    url: "https://www.jasamarga.com/",
  },
  {
    name: "Total",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/TotalEnergies_logo.svg/2560px-TotalEnergies_logo.svg.png",
    url: "https://totalenergies.com/",
  },
  {
    name: "Mind ID",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/MIND_ID_logo.svg/2560px-MIND_ID_logo.svg.png",
    url: "https://www.mind.id/",
  },
];

const PartnersSection = () => {
  // Kita duplikasi array partners agar slider terlihat tidak terputus (infinite loop effect)
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
          Our Partners
        </p>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-10">
          Trusted By Leading Companies
        </h3>

        {/* Slider Wrapper */}
        <div className="relative w-full flex overflow-hidden mask-gradient">
          {/* Sliding Track */}
          <motion.div
            className="flex items-center gap-8 md:gap-16 whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30, // Atur kecepatan slide (semakin kecil angkanya, semakin cepat)
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.05 }}
                className="h-12 md:h-16 w-auto inline-block grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto object-contain"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Inline CSS untuk mask gradient agar logo di ujung kiri/kanan memudar */}
      <style>{`
        .mask-gradient {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
