import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { getImageUrl } from "@/utils/image";

export default function ImageUpload({
  value,
  preview,
  onChange,
  onRemove,
}) {
  return (
    <div className="space-y-3">
      <Label htmlFor="thumbnail">Thumbnail</Label>

      <Input
        id="thumbnail"
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
            alt="Thumbnail"
            className="w-48 h-32 object-cover rounded-lg border border-white/10"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 rounded-full bg-red-600 p-1 hover:bg-red-700 text-white shadow-lg border border-white/30"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}