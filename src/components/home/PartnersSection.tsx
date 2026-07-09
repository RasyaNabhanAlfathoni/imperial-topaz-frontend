import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import API dan types
import { partnerAPI } from "../../api/partner";
import type { Partner } from "../../types/partner";
import { getImageUrl } from "../../api/axios";

// Placeholder logo
const PLACEHOLDER_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Crect width='200' height='100' fill='%23f3f4f6'/%3E%3Ctext x='100' y='50' font-family='system-ui' font-size='14' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3ENo Logo%3C/text%3E%3C/svg%3E";

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await partnerAPI.getAll();
      setPartners(data);
      setFailedImages(new Set());
    } catch (err) {
      console.error("Error fetching partners:", err);
      setError("Gagal mengambil data mitra. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const getLogo = (partner: Partner): string => {
    if (!partner.logo_perusahaan || failedImages.has(partner.id)) {
      return PLACEHOLDER_LOGO;
    }
    return getImageUrl(partner.logo_perusahaan);
  };

  const handleImageError = (partnerId: number) => {
    setFailedImages((prev) => new Set(prev).add(partnerId));
  };

  // Loading state...
  if (loading) {
    return (
      <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
            Our Partners
          </p>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-10">
            Trusted By Leading Companies
          </h3>
          <div className="flex justify-center items-center min-h-[100px]">
            <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state...
  if (error) {
    return (
      <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
            Our Partners
          </p>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
            Trusted By Leading Companies
          </h3>
          <div className="flex flex-col items-center justify-center min-h-[100px]">
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={fetchPartners}
              className="px-6 py-2 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors text-sm"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return (
      <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
            Our Partners
          </p>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-6">
            Trusted By Leading Companies
          </h3>
          <p className="text-gray-500 min-h-[100px] flex items-center justify-center">
            Belum ada data mitra.
          </p>
        </div>
      </section>
    );
  }

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

        <div className="relative w-full flex overflow-hidden mask-gradient">
          <motion.div
            className="flex items-center gap-8 md:gap-16 whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.a
                key={`${partner.id}-${index}`}
                href={partner.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.05 }}
                className="h-12 md:h-16 w-auto inline-block grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                title={partner.nama_perusahaan}
              >
                <img
                  src={getLogo(partner)}
                  alt={partner.nama_perusahaan}
                  className="h-full w-auto object-contain"
                  onError={() => handleImageError(partner.id)}
                  loading="lazy"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="mt-4 text-xs text-gray-400 hidden md:block">
          {partners.length} mitra terpercaya
        </div>
      </div>

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
