import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // load wishlist dari localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(saved);
    } catch {
      setWishlist([]);
      localStorage.removeItem("wishlist");
    }
  }, []);

  // hapus wishlist
  const removeWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

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

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="relative h-56 w-full rounded-2xl bg-neutral-800 shadow-xl overflow-hidden group"
          >
            {/* IMAGE + FALLBACK */}
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

            {/* HEART hapus */}
            <button
              onClick={() => removeWishlist(item.id)}
              className="absolute bottom-3 right-3 z-10"
            >
              <Heart className="w-6 h-6 fill-red-500 text-red-500 hover:scale-110 transition" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
