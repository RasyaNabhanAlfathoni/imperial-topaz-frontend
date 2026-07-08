import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";

// Import Components
import ProductsHero from "../../components/products/ProductsHero";
import CategoryFilter from "../../components/products/CategoryFilter";
import ProductCard from "../../components/products/ProductCard";
import ProductsCtaBanner from "../../components/products/ProductsCtaBanner";
import ProductsFeatures from "../../components/products/ProductsFeatures";

// --- DATA DUMMY PRODUK ---
// Di proyek nyata, data ini akan diambil dari API `useProducts()`
const categories = [
  "All Products",
  "Raw Materials",
  "Steel & Metal",
  "Concrete",
  "Finishing Materials",
  "Equipment",
];

const productsData = [
  {
    id: 1,
    name: "Cement",
    desc: "High quality cement for all types of construction.",
    category: "Raw Materials",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 2,
    name: "Steel Rebar",
    desc: "Strong and durable steel for reinforced concrete.",
    category: "Steel & Metal",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: 3,
    name: "Concrete Mix",
    desc: "Ready-mix concrete with consistent quality.",
    category: "Concrete",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 4,
    name: "Hollow Block",
    desc: "Lightweight and durable for wall construction.",
    category: "Finishing Materials",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    id: 5,
    name: "Bricks",
    desc: "High strength bricks for masonry work.",
    category: "Raw Materials",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 6,
    name: "Sand",
    desc: "Clean and graded sand for construction.",
    category: "Raw Materials",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: 7,
    name: "Crushed Stone",
    desc: "Various sizes of crushed stone for concrete.",
    category: "Concrete",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
  },
  {
    id: 8,
    name: "Heavy Equipment",
    desc: "Reliable equipment to get the job done.",
    category: "Equipment",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");

  // Filter produk berdasarkan kategori
  const filteredProducts =
    activeCategory === "All Products"
      ? productsData
      : productsData.filter((product) => product.category === activeCategory);

  return (
    <>
      <ProductsHero />

      <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter Kategori */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Grid Produk */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No products found in this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA Banner */}
          <ProductsCtaBanner />
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
