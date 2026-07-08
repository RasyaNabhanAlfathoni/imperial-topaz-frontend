import { motion } from "framer-motion";

const certifications = [
  {
    name: "ISO 9001:2015",
    desc: "Quality Management",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/ISO_Logo.svg/1024px-ISO_Logo.svg.png",
  },
  {
    name: "ISO 14001:2015",
    desc: "Environmental",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/ISO_Logo.svg/1024px-ISO_Logo.svg.png",
  },
  {
    name: "ISO 45001:2018",
    desc: "Occupational Health & Safety",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/ISO_Logo.svg/1024px-ISO_Logo.svg.png",
  },
  {
    name: "SMK3",
    desc: "Keselamatan Kerja",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indonesia_Government_Seal.svg/1024px-Indonesia_Government_Seal.svg.png",
  },
  {
    name: "LEED",
    desc: "Green Building",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/LEED_logo.svg/1024px-LEED_logo.svg.png",
  },
  {
    name: "LPJK",
    desc: "Indonesia",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indonesia_Government_Seal.svg/1024px-Indonesia_Government_Seal.svg.png",
  },
];

const CertificationsSection = () => {
  // Duplikasi array 3x agar slider terlihat tidak terputus (infinite loop effect)
  const duplicatedCertifications = [
    ...certifications,
    ...certifications,
    ...certifications,
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
          Certifications & Partners
        </span>
        <h3 className="text-3xl font-bold text-[#0F172A] mb-10">
          Certified. Trusted. Reliable.
        </h3>

        {/* Slider Wrapper */}
        <div className="relative w-full flex overflow-hidden mask-gradient py-4">
          {/* Sliding Track */}
          <motion.div
            className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40, // Atur kecepatan slide (semakin kecil angkanya, semakin cepat)
            }}
          >
            {duplicatedCertifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center group cursor-pointer w-[100px] md:w-[120px] shrink-0"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-50 rounded-full p-3 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 group-hover:shadow-lg">
                  <img
                    src={cert.img}
                    alt={cert.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs font-bold text-[#0F172A] mt-3 text-center">
                  {cert.name}
                </p>
                <p className="text-[10px] text-gray-400 text-center">
                  {cert.desc}
                </p>
              </motion.div>
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

export default CertificationsSection;
