import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { getImageUrl } from "@/utils/image";

export default function MemberPhotoUpload({
  value,
  preview,
  onChange,
  onRemove,
}) {
  return (
    <div className="space-y-3">

      <Label>Photo</Label>

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) onChange(file);
        }}
      />

      {(preview || value) && (
        <div className="relative w-fit">

          <img
            src={preview || getImageUrl(value)}
            alt=""
            className="w-40 h-40 rounded-xl object-cover border"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1"
          >
            <X size={16} />
          </button>

        </div>
      )}

    </div>
  );
}