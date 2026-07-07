import React from "react";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/useProducts";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { ArrowRightIcon, CubeIcon } from "@heroicons/react/24/outline";

const ProductsSection: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-400">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Error loading products</p>
        </div>
      </section>
    );
  }

  const displayedProducts = products?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Products" subtitle="High Quality Materials" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card hover className="h-full group">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.foto1 ||
                      "https://via.placeholder.com/400x300?text=Product"
                    }
                    alt={product.nama_produk}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    New
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy-600 mb-2">
                    {product.nama_produk}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.deskripsi || "High quality construction materials"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">
                      Rp {product.harga_per_pcs?.toLocaleString("id-ID") || "0"}
                    </span>
                    <Button variant="ghost" size="sm" className="group">
                      Detail
                      <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="orange" size="lg">
            Explore Products
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
