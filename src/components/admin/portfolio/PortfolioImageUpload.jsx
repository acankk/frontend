import { Upload, X } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/utils/image";

export default function PortfolioImageUpload({
  value,
  preview,
  onChange,
  onRemove,
}) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Gambar Portfolio
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {(preview || value) ? (
        <div className="space-y-3">
          <img
            src={preview || getImageUrl(value)}
            alt="Preview"
            className="w-full h-56 rounded-xl object-cover border"
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
            >
              Ganti Gambar
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={onRemove}
            >
              <X className="mr-2 h-4 w-4" />
              Hapus
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-14"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Choose File
        </Button>
      )}
    </div>
  );
}