import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// Import Icons
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaLocationDot,
  FaClock,
  FaHeadset,
  FaCircleCheck,
  FaMapLocationDot,
  FaArrowRight,
} from "react-icons/fa6";

// Import API dan types
import { employeeAPI } from "../../api/employee";
import { partnerAPI } from "../../api/partner";
import type { Employee, Position } from "../../types/employee";

// ==========================================
// 1. DATA KONTAK STATIS
// ==========================================
const contactData = {
  alamat:
    "Jl. Raya Konstruksi No. 88, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190, Indonesia",
  telepon_kantor: "+62 812 3456 7890",
  google_maps_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.038512153049!2d106.789123!3d-6.234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d1b2c3d4e5%3A0x1234567890abcdef!2sJl.%20Raya%20Konstruksi%20No.%2088%2C%20Kebayoran%20Baru%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  jam_operasional: "Senin - Jumat, 08:00 - 17:00 WIB",
};

// ==========================================
// 2. INTERFACE UNTUK MARKETING
// ==========================================
interface MarketingContact {
  id: number;
  nama_lengkap: string;
  email: string;
  no_telepon: string;
  jabatan: string;
}

// ==========================================
// 3. HALAMAN UTAMA CONTACT
// ==========================================
const ContactPage = () => {
  const [marketing, setMarketing] = useState<MarketingContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data marketing
  const fetchMarketingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data karyawan dan jabatan
      const [employees, positions] = await Promise.all([
        employeeAPI.getAll(),
        employeeAPI.getPositions(),
      ]);

      console.log("Employees:", employees);
      console.log("Positions:", positions);

      // Buat map jabatan untuk memudahkan pencarian
      const positionMap = new Map<number, string>();
      positions.forEach((pos: Position) => {
        positionMap.set(pos.id, pos.nama_jabatan);
      });

      // Filter karyawan dengan jabatan marketing
      // Cari kata "marketing" di nama jabatan (case insensitive)
      const marketingEmployees = employees.filter((emp: Employee) => {
        const jabatan = positionMap.get(emp.id_jabatan) || "";
        return jabatan.toLowerCase().includes("marketing");
      });

      console.log("Marketing Employees:", marketingEmployees);

      // Pilih salah satu marketing (pilih yang pertama)
      if (marketingEmployees.length > 0) {
        const selected = marketingEmployees[0];
        setMarketing({
          id: selected.id,
          nama_lengkap: selected.nama_lengkap,
          email: selected.email,
          no_telepon: selected.no_telepon,
          jabatan: positionMap.get(selected.id_jabatan) || "Marketing",
        });
      } else {
        // Jika tidak ada marketing, gunakan data default
        setMarketing({
          id: 0,
          nama_lengkap: "Tim Marketing BuildCore",
          email: "marketing@buildcore.co.id",
          no_telepon: "+62 812 3456 7890",
          jabatan: "Marketing",
        });
      }
    } catch (err) {
      console.error("Error fetching marketing data:", err);
      setError("Gagal mengambil data marketing. Menggunakan data default.");
      // Set data default jika error
      setMarketing({
        id: 0,
        nama_lengkap: "Tim Marketing BuildCore",
        email: "marketing@buildcore.co.id",
        no_telepon: "+62 812 3456 7890",
        jabatan: "Marketing",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketingData();
  }, []);

  // Jika masih loading, tampilkan skeleton
  if (loading) {
    return (
      <>
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
              alt="Contact Background"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/70"></div>
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-white font-medium">Contact Us</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                <span className="text-[#F97316]">Contact</span> Us
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                Kami siap membantu Anda. Hubungi tim marketing kami untuk
                informasi, konsultasi, atau penawaran terbaik.
              </p>
              <div className="w-12 h-1 bg-[#F97316] mt-6 rounded-full"></div>
            </motion.div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data kontak...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/70"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-white font-medium">Contact Us</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              <span className="text-[#F97316]">Contact</span> Us
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              Kami siap membantu Anda. Hubungi tim marketing kami untuk
              informasi, konsultasi, atau penawaran terbaik.
            </p>
            <div className="w-12 h-1 bg-[#F97316] mt-6 rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ===== KOLOM KIRI: Informasi Kontak ===== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
                  Hubungi Tim Marketing Kami
                </h2>
                <p className="text-gray-500">
                  Untuk pertanyaan, konsultasi proyek, atau permintaan
                  penawaran, tim kami siap membantu Anda dengan cepat dan
                  profesional.
                </p>
              </div>

              {/* Kartu Telepon & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telepon */}
                <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xl shrink-0">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Telepon / WhatsApp
                      </p>
                      <a
                        href={`tel:${marketing?.no_telepon || contactData.telepon_kantor}`}
                        className="text-lg font-bold text-[#0F172A] hover:text-[#F97316] transition-colors block"
                      >
                        {marketing?.no_telepon || contactData.telepon_kantor}
                      </a>
                      <p className="text-xs text-gray-400 mt-1">
                        {marketing?.jabatan || "Marketing Office"}
                      </p>
                      {marketing?.nama_lengkap && (
                        <p className="text-xs text-[#F97316] mt-0.5">
                          {marketing.nama_lengkap}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 pt-3 border-t border-gray-200">
                    <FaClock className="w-3 h-3" />
                    <span>{contactData.jam_operasional}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-xl shrink-0">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Email Marketing
                      </p>
                      <a
                        href={`mailto:${marketing?.email || "marketing@buildcore.co.id"}`}
                        className="text-lg font-bold text-[#0F172A] hover:text-[#F97316] transition-colors block break-all"
                      >
                        {marketing?.email || "marketing@buildcore.co.id"}
                      </a>
                      <p className="text-xs text-gray-400 mt-1">
                        Respons dalam 24 jam
                      </p>
                      {marketing?.nama_lengkap && (
                        <p className="text-xs text-[#F97316] mt-0.5">
                          {marketing.nama_lengkap}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 pt-3 border-t border-gray-200">
                    <FaClock className="w-3 h-3" />
                    <span>{contactData.jam_operasional}</span>
                  </div>
                </div>
              </div>

              {/* Tombol CTA (WhatsApp & Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${(marketing?.no_telepon || contactData.telepon_kantor).replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20b859] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>Hubungi via WhatsApp</span>
                </a>
                <a
                  href={`mailto:${marketing?.email || "marketing@buildcore.co.id"}?subject=Konsultasi%20Proyek%20Konstruksi`}
                  target="_blank"
                  className="bg-[#F97316] hover:bg-[#ea580c] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-orange-200"
                >
                  <FaEnvelope className="text-xl" />
                  <span>Kirim Email</span>
                </a>
              </div>

              {/* Bantuan Cepat */}
              <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#F97316] text-xl">
                    <FaHeadset />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">
                      Butuh Bantuan Cepat?
                    </p>
                    <p className="text-sm text-gray-500">
                      Tim kami siap membantu Anda menemukan solusi terbaik untuk
                      kebutuhan proyek konstruksi Anda.
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${marketing?.no_telepon || contactData.telepon_kantor}`}
                  className="bg-white border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all whitespace-nowrap"
                >
                  Hubungi Kami Sekarang <FaArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* ===== KOLOM KANAN: Alamat & Google Maps ===== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Header Alamat */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
                  Alamat Kantor
                </h2>
                <div className="flex items-start gap-3 mt-2">
                  <FaLocationDot className="text-[#F97316] text-xl mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0F172A]">
                      PT BuildCore Konstruksi
                    </p>
                    <p className="text-gray-500 text-sm">
                      {contactData.alamat}
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[450px] md:h-[500px] relative">
                <iframe
                  src={contactData.google_maps_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Alamat Kantor BuildCore"
                  className="w-full h-full"
                ></iframe>

                {/* Map Marker Info Overlay */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-4 max-w-[300px] w-full border border-gray-100">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80"
                      alt="Kantor BuildCore"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm">
                      PT BuildCore Konstruksi
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {contactData.alamat}
                    </p>
                    <a
                      href={contactData.google_maps_url.replace(
                        "embed",
                        "maps",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F97316] text-xs font-semibold mt-1 inline-block hover:underline"
                    >
                      Lihat di Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===== 4 VALUE BANNER DI BAWAH ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-gray-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl mb-3">
                <FaClock />
              </div>
              <h4 className="font-bold text-[#0F172A] text-sm">Respon Cepat</h4>
              <p className="text-xs text-gray-500 mt-1">
                Kami berkomitmen merespon setiap pertanyaan Anda dengan cepat.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl mb-3">
                <FaUserTieCustom />
              </div>
              <h4 className="font-bold text-[#0F172A] text-sm">
                Tim Profesional
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Tim marketing kami berpengalaman dan siap memberikan solusi
                terbaik.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl mb-3">
                <FaCircleCheck />
              </div>
              <h4 className="font-bold text-[#0F172A] text-sm">Data Aman</h4>
              <p className="text-xs text-gray-500 mt-1">
                Informasi Anda aman dan hanya digunakan untuk keperluan bisnis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl mb-3">
                <FaHandshakeCustom />
              </div>
              <h4 className="font-bold text-[#0F172A] text-sm">
                Solusi Terbaik
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Kami membantu Anda menemukan solusi konstruksi yang tepat dan
                efisien.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// 4. KOMPONEN ICON CUSTOM
// ==========================================
const FaUserTieCustom = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
    <path d="M12 12.75c-2.63 0-4.917 1.274-6.406 3.268a8.25 8.25 0 0112.812 0C14.917 14.024 12.63 12.75 12 12.75z" />
  </svg>
);

const FaHandshakeCustom = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path d="M18.18 6.89a1.5 1.5 0 00-2.1-2.14L12.5 9.5 12 10l-.5-.5-3.58-4.75a1.5 1.5 0 00-2.1 2.14L9.5 11l-6.38 3.12A1.5 1.5 0 003 16.06V20a2 2 0 002 2h14a2 2 0 002-2v-3.94a1.5 1.5 0 00-.12-2.94L14.5 11l3.68-4.11z" />
    <path d="M21 18h-2v-4.56l-6.52-3.26-6.52 3.26V18H2v-2h2v-3.44l7.48-3.74 7.48 3.74V16h2v2z" />
  </svg>
);

export default ContactPage;
