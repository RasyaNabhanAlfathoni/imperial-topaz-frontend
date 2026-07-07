import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const newsData = [
  {
    date: "May 15, 2025",
    title: "BuildCore Completes New Office Building Project",
    desc: "We are proud to announce the successful completion of our latest office building...",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
  {
    date: "May 12, 2025",
    title: "Construction Safety: Our Top Priority",
    desc: "Ensuring the safety of our team and the public is our number one priority...",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    date: "May 05, 2025",
    title: "Sustainable Construction for A Better Future",
    desc: "Our commitment to sustainable building practices continues to grow with new initiatives...",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
];

const NewsSection = () => {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <p className="text-[#F97316] font-bold uppercase tracking-wider text-sm mb-2">
              Latest News
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Latest News & Insights
            </h2>
          </div>
          <Link
            to="/news"
            className="mt-4 md:mt-0 inline-flex items-center bg-white border border-gray-200 shadow-sm hover:shadow-md text-[#0F172A] px-6 py-3 rounded-md font-bold transition-all"
          >
            View All News <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsData.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 font-medium">{news.date}</p>
                <h4 className="font-bold text-[#0F172A] text-lg my-2 group-hover:text-[#F97316] transition-colors">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {news.desc}
                </p>
                <Link
                  to={`/news/${index}`}
                  className="text-sm font-semibold text-[#0F172A] group-hover:gap-2 flex items-center transition-all"
                >
                  Read More <FaArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
