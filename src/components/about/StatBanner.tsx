import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaAward, FaBuilding, FaUserTie, FaHandshake } from "react-icons/fa6";

// Import API
import { projectAPI } from "../../api/project";
import { employeeAPI } from "../../api/employee";
import { partnerAPI } from "../../api/partner";

// Interface untuk stat
interface StatData {
  yearsExperience: string;
  projectsCount: number;
  employeesCount: number;
  partnersCount: number;
}

const StatBanner = () => {
  const [stats, setStats] = useState<StatData>({
    yearsExperience: "10+",
    projectsCount: 0,
    employeesCount: 0,
    partnersCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil semua data
  const fetchStatsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data dari 3 API sekaligus
      const [projects, employees, partners] = await Promise.all([
        projectAPI.getAll(),
        employeeAPI.getAll(),
        partnerAPI.getAll(),
      ]);

      // Pastikan data adalah array
      const projectsCount = Array.isArray(projects) ? projects.length : 0;
      const employeesCount = Array.isArray(employees) ? employees.length : 0;
      const partnersCount = Array.isArray(partners) ? partners.length : 0;

      setStats({
        yearsExperience: "10+", // Tetap dummy
        projectsCount,
        employeesCount,
        partnersCount,
      });
    } catch (err) {
      console.error("Error fetching stats data:", err);
      setError("Gagal mengambil data statistik.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali di-render
  useEffect(() => {
    fetchStatsData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-10 bg-[#0F172A]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-center items-center min-h-[100px]">
            <div className="w-10 h-10 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-10 bg-[#0F172A]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center min-h-[100px]">
            <p className="text-red-400 text-sm mb-3">{error}</p>
            <button
              onClick={fetchStatsData}
              className="px-4 py-2 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors text-sm"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Data statistik yang sudah digabung dengan icon
  const statItems = [
    {
      icon: <FaAward />,
      value: stats.yearsExperience,
      label: "Years Experience",
    },
    {
      icon: <FaBuilding />,
      value: `${stats.projectsCount}+`,
      label: "Projects Completed",
    },
    {
      icon: <FaUserTie />,
      value: `${stats.employeesCount}+`,
      label: "Professional Team",
    },
    {
      icon: <FaHandshake />,
      value: `${stats.partnersCount}+`,
      label: "Partners",
    },
  ];

  return (
    <section className="py-10 bg-[#0F172A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center md:flex-row md:items-center justify-center gap-4 text-center md:text-left text-white border-r last:border-r-0 border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-2xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold">{stat.value}</h4>
                <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBanner;
