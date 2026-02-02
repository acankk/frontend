import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import TemplateCard from "@/components/template-card";

export default function Templates() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/api/products/");
    setProducts(res.data.data || []);
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist/");
      setWishlistIds((res.data || []).map((i) => i.product_details.id));
    } catch {}
  };

  useEffect(() => {
    fetchProducts();
    if (localStorage.getItem("token")) fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-16">
      <h1 className="text-4xl font-bold text-center mb-14 tracking-widest">
        TEMPLATES
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <TemplateCard
            key={item.id}
            item={item}
            isWishlisted={wishlistIds.includes(item.id)}
            onClick={() => navigate(`/product/${item.id}`)}
            onToggleWishlist={async (id) => {
              if (!localStorage.getItem("token"))
                return navigate("/login");
              await api.post("/wishlist/toggle", { product_id: id });
              fetchWishlist();
            }}
          />
        ))}
      </div>
    </div>
  );
}
