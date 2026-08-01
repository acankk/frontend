import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImageCarousel from "@/components/product-image-carousel";

import { getProduct } from "../services/product.service";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleBuy = () => {
    const message = `Halo INOVARE 👋

Saya tertarik membeli source code berikut.

📦 Produk : ${product.nama}
💻 Tech Stack : ${product.tech}
💰 Harga : Rp${Number(product.harga).toLocaleString("id-ID")}

Mohon informasi mengenai pembayaran dan proses pengirimannya.

Terima kasih.`;

    const whatsapp = `https://wa.me/6282299167585?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsapp, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-24">

      <ProductImageCarousel
        images={[
          product.thumbnail,
          ...(product.images?.map((image) => image.image_url) || []),
        ]}
      />

      <h1 className="text-4xl font-bold mt-12">
        {product.nama}
      </h1>

      <p className="text-white/70 mt-4 leading-relaxed">
        {product.deskripsi}
      </p>

      <div className="mt-6">
        <span className="inline-block rounded-full bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 text-cyan-300">
          {product.tech}
        </span>
      </div>

      <h2 className="text-3xl font-bold mt-8">
        Rp {Number(product.harga).toLocaleString("id-ID")}
      </h2>

      <div className="flex gap-4 mt-10">
        {product.demo_url && (
          <a
            href={product.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Live Demo
          </a>
        )}

        <button
          onClick={handleBuy}
          className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
        >
          Buy via WhatsApp
        </button>
      </div>
    </div>
  );
}