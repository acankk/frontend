import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 GET wishlist dari API
  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist/");
      setWishlist(res.data || []);
    } catch (err) {
      console.error("GET WISHLIST ERROR:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 🔹 toggle wishlist (hapus)
  const removeWishlist = async (productId) => {
    try {
      await api.post("/wishlist/toggle", {
        product_id: productId,
      });
      fetchWishlist();
    } catch (err) {
      console.error("TOGGLE WISHLIST ERROR:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-white mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white px-10 py-16">
      <h1 className="text-4xl font-bold text-center mb-14 tracking-widest">
        WISHLIST
      </h1>

      {wishlist.length === 0 && (
        <p className="text-center text-white/50">
          Wishlist kamu masih kosong
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const product = item.product_details;

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="relative h-56 w-full rounded-2xl bg-neutral-800 shadow-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={product.photo || "/no-image.png"}
                alt={product.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur px-3 py-2">
                <p className="text-sm font-semibold truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-300">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeWishlist(product.id);
                }}
                className="absolute bottom-3 right-3 z-10"
              >
                <Heart className="w-6 h-6 fill-red-500 text-red-500 hover:scale-110 transition" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
