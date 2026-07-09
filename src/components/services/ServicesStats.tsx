import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBuilding, FaUserTie, FaAward, FaHandshake } from "react-icons/fa6";

// Import API
import { projectAPI } from "../../api/project";
import { employeeAPI } from "../../api/employee";
import { partnerAPI } from "../../api/partner";
import { serviceAPI } from "../../api/service";

// Komponen Counter dengan animasi
const Counter = ({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && target > 0) {
      let start = 0;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

interface StatData {
  yearsExperience: string;
  projectsCount: number;
  employeesCount: number;
  servicesCount: number;
}

const ServicesStats = () => {
  const [stats, setStats] = useState<StatData>({
    yearsExperience: "10+",
    projectsCount: 0,
    employeesCount: 0,
    servicesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [projects, employees, services] = await Promise.all([
        projectAPI.getAll(),
        employeeAPI.getAll(),
        serviceAPI.getAll(),
      ]);

      const projectsCount = Array.isArray(projects) ? projects.length : 0;
      const employeesCount = Array.isArray(employees) ? employees.length : 0;
      const servicesCount = Array.isArray(services) ? services.length : 0;

      setStats({
        yearsExperience: "10+",
        projectsCount,
        employeesCount,
        servicesCount,
      });
    } catch (err) {
      console.error("Error fetching stats data:", err);
      setError("Gagal mengambil data statistik.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-center items-center min-h-[100px]">
            <div className="w-10 h-10 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center min-h-[100px]">
            <p className="text-red-500 text-sm mb-3">{error}</p>
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

  const statItems = [
    {
      icon: <FaBuilding />,
      value: stats.projectsCount,
      label: "Projects Completed",
      isCounter: true,
    },
    {
      icon: <FaUserTie />,
      value: stats.employeesCount,
      label: "Professional Team",
      isCounter: true,
    },
    {
      icon: <FaAward />,
      value: stats.yearsExperience,
      label: "Years Experience",
      isCounter: false,
    },
    {
      icon: <FaHandshake />,
      value: stats.servicesCount,
      label: "Services Offered",
      isCounter: true,
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center md:flex-row md:items-center justify-center gap-4 text-center md:text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F97316] text-2xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
                  {stat.isCounter ? (
                    <Counter target={stat.value as number} suffix="+" />
                  ) : (
                    stat.value
                  )}
                </h4>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStats;
