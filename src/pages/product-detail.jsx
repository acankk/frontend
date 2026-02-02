import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductImageCarousel from "@/components/product-image-carousel";
import { getDetailImages } from "@/lib/product-images";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data.data[0]))
      .catch(console.error);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-24">
      <ProductImageCarousel images={getDetailImages(product.image_url)} />

      <h1 className="text-4xl font-bold mt-12">{product.name}</h1>
      <p className="text-white/70 mt-4">{product.description}</p>
    </div>
  );
}
