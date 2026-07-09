import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";

// Import Components
import ProductsHero from "../../components/products/ProductsHero";
import CategoryFilter from "../../components/products/CategoryFilter";
import ProductCard from "../../components/products/ProductCard";
import ProductsCtaBanner from "../../components/products/ProductsCtaBanner";
import ProductsFeatures from "../../components/products/ProductsFeatures";

// Import API dan types
import { productAPI } from "../../api/product";
import type { Product, Category } from "../../types/product";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari API
  const fetchProductsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data produk dan kategori secara paralel
      const [productsData, categoriesData] = await Promise.all([
        productAPI.getAll(),
        productAPI.getCategories(),
      ]);

      // Pastikan data adalah array
      const productsList = Array.isArray(productsData) ? productsData : [];
      const categoriesList = Array.isArray(categoriesData)
        ? categoriesData
        : [];

      setProducts(productsList);
      setCategories(categoriesList);

      // Reset filter ke "All Products" saat data berubah
      setActiveCategory("All Products");
    } catch (err) {
      console.error("Error fetching products data:", err);
      setError("Gagal mengambil data produk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen pertama kali di-render
  useEffect(() => {
    fetchProductsData();
  }, []);

  // Buat daftar kategori untuk filter (termasuk "All Products")
  const categoryFilterList = [
    "All Products",
    ...categories.map((cat: Category) => cat.kategori_produk),
  ];

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((product: Product) => {
          // Cari kategori produk berdasarkan id_kategori_produk
          const category = categories.find(
            (cat: Category) => cat.id === product.id_kategori_produk,
          );
          return category?.kategori_produk === activeCategory;
        });

  // Fungsi untuk mendapatkan nama kategori dari ID
  const getCategoryName = (categoryId: number): string => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category ? category.kategori_produk : "Uncategorized";
  };

  // Loading state
  if (loading) {
    return (
      <>
        <ProductsHero />
        <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data produk...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <ProductsHero />
        <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={fetchProductsData}
                className="px-6 py-3 bg-[#F97316] text-white rounded-md hover:bg-[#E8650A] transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ProductsHero />

      <section className="py-16 bg-[#F8FAFC] relative -mt-8 z-20 rounded-t-3xl">
        <div className="container mx-auto px-4 md:px-8">
          {/* Filter Kategori */}
          <CategoryFilter
            categories={categoryFilterList}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Jumlah produk yang ditampilkan */}
          <div className="text-sm text-gray-400 mb-6 text-right">
            Showing {filteredProducts.length} of {products.length} products
          </div>

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
                filteredProducts.map((product: Product, index: number) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.nama_produk,
                      desc: product.deskripsi,
                      category: getCategoryName(product.id_kategori_produk),
                      img:
                        product.foto1 ||
                        product.foto2 ||
                        product.foto3 ||
                        product.foto4 ||
                        product.foto5 ||
                        "",
                      price: product.harga_per_pcs,
                      rawProduct: product, // Kirim data lengkap jika diperlukan
                    }}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Tidak ada produk ditemukan di kategori ini.
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
