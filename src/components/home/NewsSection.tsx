import React from "react";
import { motion } from "framer-motion";
import { useNews } from "../../hooks/useNews";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const NewsSection: React.FC = () => {
  const { data: news, isLoading } = useNews();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading news...</div>
        </div>
      </section>
    );
  }

  const displayedNews = news?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Berita Terbaru"
          subtitle="Update dan Informasi Terkini"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.thumbnail || "/placeholder.jpg"}
                    alt={item.judul}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {item.is_featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>
                      {format(new Date(item.created_at), "dd MMMM yyyy", {
                        locale: id,
                      })}
                    </span>
                    {item.kategori_berita && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-blue-600">
                          {item.kategori_berita.kategori_berita}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {item.judul}
                  </h3>
                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.konten }}
                  />
                  <Button variant="ghost" size="sm">
                    Baca Selengkapnya →
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat Semua Berita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
