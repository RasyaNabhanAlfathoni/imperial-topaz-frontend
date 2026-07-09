import { motion } from "framer-motion";

interface NewsFilterProps {
  categories: { id: number; kategori_berita: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const NewsFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: NewsFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-wrap gap-3"
    >
      <button
        onClick={() => onCategoryChange("Semua")}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          activeCategory === "Semua"
            ? "bg-[#F97316] text-white shadow-md shadow-orange-200"
            : "bg-gray-50 text-[#0F172A] hover:bg-gray-100"
        }`}
      >
        Semua
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.kategori_berita)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeCategory === cat.kategori_berita
              ? "bg-[#F97316] text-white shadow-md shadow-orange-200"
              : "bg-gray-50 text-[#0F172A] hover:bg-gray-100"
          }`}
        >
          {cat.kategori_berita}
        </button>
      ))}
    </motion.div>
  );
};

export default NewsFilter;
