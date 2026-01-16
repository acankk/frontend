import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Heart } from "lucide-react";

export default function Templates() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ambil wishlist dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("GET PRODUCTS ERROR:", err);
      }
    };

    fetchProducts();
  }, []);

  // cek produk ada di wishlist
  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // toggle wishlist
  const toggleWishlist = (product) => {
    let updated;

    if (isWishlisted(product.id)) {
      updated = wishlist.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen w-full bg-black text-white px-10 py-16">
      <h1 className="text-4xl font-bold text-center mb-14 tracking-widest">
        TEMPLATES
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="relative h-56 w-full rounded-2xl bg-neutral-800 shadow-xl overflow-hidden group"
          >
            {/* IMAGE */}
            <img
              src={item.photo || "/no-image.png"}
              alt={item.name}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
            />

            {/* INFO */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur px-3 py-2">
              <p className="text-sm font-semibold truncate">
                {item.name}
              </p>
              <p className="text-xs text-gray-300">
                Rp {Number(item.price).toLocaleString("id-ID")}
              </p>
            </div>

            {/* HEART */}
            <button
              onClick={() => toggleWishlist(item)}
              className="absolute bottom-3 right-3 z-10"
            >
              <Heart
                className={`w-6 h-6 transition ${
                  isWishlisted(item.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-white hover:scale-110"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
