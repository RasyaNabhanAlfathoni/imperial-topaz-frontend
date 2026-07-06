import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProducts, useProductCategories } from "../../hooks/useProducts";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Button from "../ui/Button";

const ProductsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const { data: categories, isLoading: isLoadingCategories } =
    useProductCategories();

  if (isLoadingProducts || isLoadingCategories) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">Loading products...</div>
        </div>
      </section>
    );
  }

  const filteredProducts = selectedCategory
    ? products?.filter((p) => p.id_kategori_produk === selectedCategory)
    : products;

  const displayedProducts = filteredProducts?.slice(0, 6) || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Produk Unggulan"
          subtitle="Produk Berkualitas Tinggi"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Semua
          </button>
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.kategori_produk}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover>
                <img
                  src={product.foto1 || "/placeholder.jpg"}
                  alt={product.nama_produk}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.nama_produk}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.deskripsi}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      Rp {product.harga_per_pcs.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm text-gray-500">/ pcs</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="primary" size="lg">
            Lihat Semua Produk
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
