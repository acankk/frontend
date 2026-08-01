import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";

export default function GalleryUpload({
  previews,
  existingImages,
  onChange,
  onDelete,
  onRemovePreview,
}) {
  return (
    <div className="space-y-3">
      <Label htmlFor="gallery">Gallery</Label>

      <Input
        id="gallery"
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) onChange(files);
        }}
      />

      {existingImages.length > 0 && (
        <>
          <Label className="text-sm text-muted-foreground">
            Gallery Saat Ini
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {existingImages.map((image) => (
              <div key={image.id} className="relative w-fit">
                <img
                  src={image.image_url}
                  alt="Gallery"
                  className="w-48 h-32 object-cover rounded-lg border border-white/10"
                />

                <button
                  type="button"
                  onClick={() => onDelete(image.id)}
                  className="absolute top-2 right-2 rounded-full bg-red-600 p-1 hover:bg-red-700 text-white shadow-lg border border-white/30"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {previews.length > 0 && (
        <>
          <Label className="text-sm text-muted-foreground">
            Preview Upload
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((image, index) => (
              <div key={index} className="relative w-fit">
                <img
                  src={image}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border border-white/10"
                />

                <button
                  type="button"
                  onClick={() => onRemovePreview(index)}
                  className="absolute top-2 right-2 rounded-full bg-black/70 p-1 hover:bg-red-500 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {!existingImages.length && !previews.length && (
        <div className="border border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-muted-foreground">
          <ImagePlus size={40} className="mb-3" />
          <p>Belum ada gallery.</p>
        </div>
      )}
    </div>
  );
}