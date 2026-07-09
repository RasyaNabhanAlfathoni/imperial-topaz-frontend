import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCube, FaShield, FaClock } from "react-icons/fa6";

// Import API
import { productAPI } from "../../api/product";

// Komponen Counter dengan animasi
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && target > 0) {
      let start = 0;
      const duration = 2000; // 2 detik
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

  // Format angka dengan separator ribuan
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  return <span ref={ref}>{formatNumber(count)}+</span>;
};

const ProductsHero = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await productAPI.getAll();
      const count = Array.isArray(products) ? products.length : 0;
      setTotalProducts(count);
    } catch (err) {
      console.error("Error fetching total products:", err);
      setError("Gagal mengambil data produk");
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0F172A] overflow-hidden">
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
          alt="Construction Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#0F172A]/50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span>›</span>
          <Link to="/solutions" className="hover:text-white">
            Solutions
          </Link>
          <span>›</span>
          <span className="text-white font-medium">Our Products</span>
        </div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Our <span className="text-[#F97316]">Products</span> <br />
              Built for Strength. <br />
              Built for the Future.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
              High quality construction materials and equipment to support every
              project with reliability and performance.
            </p>

            {/* Hero Stats */}
            <div className="flex flex-wrap gap-8 md:gap-12 text-white">
              {/* Product Variants - Dinamis dari API dengan animasi */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl">
                  <FaCube />
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    {loading ? (
                      <span className="inline-block w-16 h-6 bg-white/10 animate-pulse rounded"></span>
                    ) : error ? (
                      "—"
                    ) : (
                      <AnimatedCounter target={totalProducts} />
                    )}
                  </h4>
                  <p className="text-xs text-gray-400">Product Variants</p>
                </div>
              </div>

              {/* Trusted - Tetap statis */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl">
                  <FaShield />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Trusted</h4>
                  <p className="text-xs text-gray-400">Quality Materials</p>
                </div>
              </div>

              {/* On-Time - Tetap statis */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F97316] text-xl">
                  <FaClock />
                </div>
                <div>
                  <h4 className="font-bold text-lg">On-Time</h4>
                  <p className="text-xs text-gray-400">Delivery Guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
