import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { getImageUrl } from "@/utils/image";

export default function TeamLogoUpload({
  value,
  preview,
  onChange,
  onRemove,
}) {
  return (
    <div className="space-y-3">
      <Label htmlFor="logo">
        Logo Team
      </Label>

      <Input
        id="logo"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onChange(file);
          }
        }}
      />

      {(preview || value) && (
        <div className="relative w-fit">
          <img
            src={preview || getImageUrl(value)}
            alt="Logo Team"
            className="w-40 h-40 rounded-xl object-cover border border-white/10"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 rounded-full bg-red-500 text-white p-1 hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}