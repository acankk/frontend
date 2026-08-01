import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getImageUrl } from "@/utils/image";

import {
  getWishlist,
  toggleWishlist,
} from "@/services/wishlist.service";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data || []);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);

      loadWishlist();
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus wishlist.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16">

      <h1 className="text-4xl font-bold text-center mb-14">
        WISHLIST
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-white/60">
          Wishlist kamu masih kosong.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

          {wishlist.map((item) => {
            const product = item.product_details;

            return (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-zinc-900
                  cursor-pointer
                  group
                "
              >

                <img
                  src={getImageUrl(product.photo)}
                  alt={product.name}
                  className="
                    w-full
                    h-60
                    object-cover
                    group-hover:scale-105
                    transition
                  "
                />

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    bg-black/60
                    backdrop-blur-sm
                    p-4
                  "
                >
                  <h2 className="font-semibold truncate">
                    {product.name}
                  </h2>

                  <p className="text-sm text-white/70">
                    Rp{" "}
                    {Number(
                      product.price
                    ).toLocaleString("id-ID")}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    handleRemove(product.id);
                  }}
                  className="
                    absolute
                    top-3
                    right-3
                  "
                >
                  <Heart
                    className="
                      w-6
                      h-6
                      fill-red-500
                      text-red-500
                      hover:scale-110
                      transition
                    "
                  />
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}