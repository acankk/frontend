import { Heart } from "lucide-react";

export default function TemplateCard({
  item,
  isWishlisted,
  onClick,
  onToggleWishlist,
}) {
  const image = item?.thumbnail || "/no-image.png";

  return (
    <div
      onClick={onClick}
      className="relative h-56 w-full rounded-2xl bg-neutral-800 shadow-xl overflow-hidden group cursor-pointer"
    >
      <img
        src={image}
        alt={item?.nama || "No title"}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
        onError={(e) => {
          e.currentTarget.src = "/no-image.png";
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur px-3 py-2">
        <p className="text-sm font-semibold truncate">
          {item?.nama}
        </p>

        <p className="text-xs text-gray-300">
          Rp {Number(item?.harga || 0).toLocaleString("id-ID")}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(item.id);
        }}
        className="absolute bottom-3 right-3 z-10"
      >
        <Heart
          className={`w-6 h-6 transition ${
            isWishlisted
              ? "fill-red-500 text-red-500 scale-110"
              : "text-white hover:scale-110"
          }`}
        />
      </button>
    </div>
  );
}