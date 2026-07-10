import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { getImageUrl } from "../../api/axios";

// Placeholder logo
const PLACEHOLDER_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Crect width='200' height='100' fill='%23f3f4f6'/%3E%3Ctext x='100' y='50' font-family='system-ui' font-size='14' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Logo%3C/text%3E%3C/svg%3E";

interface ProjectsPartnersProps {
  partners: {
    id: number;
    nama_perusahaan: string;
    deskripsi: string;
    logo_perusahaan: string;
    website: string;
  }[];
}

const ProjectsPartners = ({ partners }: ProjectsPartnersProps) => {
  // Jika tidak ada partner, jangan render
  if (!partners || partners.length === 0) {
    return null;
  }

  // Duplikasi array agar slider tidak terputus
  const duplicatedPartners = [...partners, ...partners, ...partners];

  // Fungsi untuk mendapatkan URL logo
  const getPartnerLogo = (logo: string): string => {
    if (!logo) return PLACEHOLDER_LOGO;
    // Jika logo sudah berupa URL (http), gunakan langsung
    if (logo.startsWith("http")) return logo;
    // Jika tidak, gunakan getImageUrl untuk mengubah path
    return getImageUrl(logo);
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100 mt-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
          Our Partners
        </p>
        <h3 className="text-3xl font-bold text-[#0F172A] mb-4">
          Trusted By Leading Companies
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          We collaborate with industry leaders and trusted partners to deliver
          outstanding results on every project.
        </p>

        {/* SLIDER WRAPPER */}
        <div className="relative w-full flex overflow-hidden mask-gradient">
          {/* Sliding Track */}
          <motion.div
            className="flex items-center gap-6 whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                whileHover={{ y: -5 }}
                className="w-[240px] sm:w-[280px] shrink-0 group"
              >
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center h-full">
                  <div className="h-16 w-full flex items-center justify-center mb-3 grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src={getPartnerLogo(partner.logo_perusahaan)}
                      alt={partner.nama_perusahaan}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        // Jika gambar gagal dimuat, gunakan placeholder
                        (e.target as HTMLImageElement).src = PLACEHOLDER_LOGO;
                      }}
                    />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-sm text-center mb-1 line-clamp-2">
                    {partner.nama_perusahaan}
                  </h4>
                  <a
                    href={partner.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1 transition-all mt-5"
                  >
                    Visit Website <FaArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Jumlah partner */}
        <div className="mt-8 text-sm text-gray-400">
          {partners.length} Mitra Terpercaya
        </div>
      </div>

      {/* Inline CSS untuk mask gradient */}
      <style>{`
        .mask-gradient {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};

export default ProjectsPartners;
