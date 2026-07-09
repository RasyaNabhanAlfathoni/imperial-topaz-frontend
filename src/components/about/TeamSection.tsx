import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
// Icons
import { FaLinkedinIn, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// Import API dan types
import { employeeAPI } from "../../api/employee";
import type { Employee, Position } from "../../types/employee";
import { getImageUrl } from "../../api/axios";

// Placeholder image
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e5e7eb'/%3E%3Ccircle cx='100' cy='80' r='40' fill='%239ca3af'/%3E%3Crect x='60' y='140' width='80' height='40' rx='20' fill='%239ca3af'/%3E%3C/svg%3E";

// Interface untuk data yang sudah digabung dengan jabatan
interface TeamMember {
  id: number;
  name: string;
  role: string;
  description?: string;
  image: string;
  email?: string;
  phone?: string;
  positionId: number;
}

const TeamSection = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Fungsi untuk mengambil data dari API
  const fetchTeamData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data karyawan dan jabatan secara paralel
      const [employees, positions] = await Promise.all([
        employeeAPI.getAll(),
        employeeAPI.getPositions(),
      ]);

      // Mapping data karyawan dengan jabatan
      const positionMap = new Map<number, string>();
      positions.forEach((pos: Position) => {
        positionMap.set(pos.id, pos.nama_jabatan);
      });

      // Transform data ke format yang dibutuhkan
      const teamMembers: TeamMember[] = employees.map((emp: Employee) => ({
        id: emp.id,
        name: emp.nama_lengkap,
        role: positionMap.get(emp.id_jabatan) || "Staff",
        description: emp.alamat || undefined,
        image: emp.foto || PLACEHOLDER_IMAGE,
        email: emp.email,
        phone: emp.no_telepon,
        positionId: emp.id_jabatan,
      }));

      setMembers(teamMembers);
      setFailedImages(new Set());
    } catch (err) {
      console.error("Error fetching team data:", err);
      setError("Gagal mengambil data tim. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali di-render
  useEffect(() => {
    fetchTeamData();
  }, []);

  // Fungsi untuk mendapatkan foto
  const getMemberImage = (member: TeamMember): string => {
    if (member.image === PLACEHOLDER_IMAGE || failedImages.has(member.id)) {
      return PLACEHOLDER_IMAGE;
    }
    return getImageUrl(member.image);
  };

  // Handle error gambar
  const handleImageError = (memberId: number) => {
    setFailedImages((prev) => new Set(prev).add(memberId));
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">
            Meet Our Professional Team
          </h2>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data tim...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">
            Meet Our Professional Team
          </h2>
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={fetchTeamData}
              className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Jika tidak ada data
  if (members.length === 0) {
    return (
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">
            Meet Our Professional Team
          </h2>
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">Belum ada data tim.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <span className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2 block">
          Our Team
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12">
          Meet Our Professional Team
        </h2>

        <div className="relative px-4 md:px-12">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".team-next",
              prevEl: ".team-prev",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-6"
          >
            {members.map((member) => (
              <SwiperSlide key={member.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 text-center group h-full flex flex-col"
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-50 group-hover:border-[#F97316] transition-colors bg-gray-100">
                    <img
                      src={getMemberImage(member)}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(member.id)}
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-bold text-[#0F172A] text-lg">
                    {member.name}
                  </h4>
                  <p className="text-[#F97316] text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  {member.description && (
                    <p className="text-xs text-gray-400 leading-relaxed flex-grow">
                      {member.description}
                    </p>
                  )}
                  <div className="mt-4 flex justify-center gap-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#F97316] hover:text-white transition-all"
                        title={member.email}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#F97316] hover:text-white transition-all"
                        title={member.phone}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </a>
                    )}
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#F97316] hover:text-white transition-all">
                      <FaLinkedinIn className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav Buttons - hanya tampil jika lebih dari 1 slide */}
          {members.length > 1 && (
            <>
              <button className="team-prev absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] transition-all z-10 border border-gray-100 hover:border-[#F97316]">
                <FaChevronLeft />
              </button>
              <button className="team-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0F172A] hover:text-[#F97316] transition-all z-10 border border-gray-100 hover:border-[#F97316]">
                <FaChevronRight />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
