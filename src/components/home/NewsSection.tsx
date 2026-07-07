import React from "react";
import { motion } from "framer-motion";
import { useNews } from "../../hooks/useNews";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowRightIcon, CalendarIcon } from "@heroicons/react/24/outline";

const NewsSection: React.FC = () => {
  const { data: news, isLoading } = useNews();

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-400">Loading news...</div>
        </div>
      </section>
    );
  }

  const displayedNews = news?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle title="Latest News & Insights" subtitle="Stay Updated" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card hover className="h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      item.thumbnail ||
                      "https://via.placeholder.com/400x250?text=News"
                    }
                    alt={item.judul}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {item.is_featured && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarIcon className="h-4 w-4 mr-1 text-orange-500" />
                    <span>
                      {format(new Date(item.created_at), "MMM dd, yyyy", {
                        locale: id,
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-600 mb-2 line-clamp-2">
                    {item.judul}
                  </h3>
                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: item.konten.substring(0, 100) + "...",
                    }}
                  />
                  <Button variant="ghost" size="sm" className="group">
                    Read More
                    <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="orange" size="lg">
            View All News
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
