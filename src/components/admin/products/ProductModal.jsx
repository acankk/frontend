import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ImageUpload from "./ImageUpload";
import GalleryUpload from "./GalleryUpload";

import { createProduct, updateProduct } from "@/services/product.service";
import { getGallery, uploadGallery, deleteGallery } from "@/services/gallery.service";

const initialState = {
  nama: "",
  deskripsi: "",
  tech: "",
  harga: "",
  demo_url: "",
  github_url: "",
  thumbnail: null,
};

export default function ProductModal({ open, product, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState(initialState);

  const [gallery, setGallery] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  useEffect(() => {
    if (!product) {
      setForm(initialState);
      setPreview(null);
      setGallery([]);
      setGalleryPreview([]);
      setExistingGallery([]);
      return;
    }

    setForm({
      nama: product.nama,
      deskripsi: product.deskripsi,
      tech: product.tech,
      harga: product.harga,
      demo_url: product.demo_url || "",
      github_url: product.github_url || "",
      thumbnail: null,
    });

    setPreview(product.thumbnail);
    loadGallery(product.id);
  }, [product]);

  const loadGallery = async (productId) => {
    try {
      setExistingGallery(await getGallery(productId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (file) => {
    setForm((prev) => ({ ...prev, thumbnail: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setForm((prev) => ({ ...prev, thumbnail: null }));
  };

  const handleGallery = (files) => {
    setGallery((prev) => [...prev, ...files]);

    setGalleryPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemovePreview = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Yakin ingin menghapus gambar?")) return;

    try {
      await deleteGallery(id);
      loadGallery(product.id);
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus gambar.");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("deskripsi", form.deskripsi);
      formData.append("tech", form.tech);
      formData.append("harga", form.harga);
      formData.append("demo_url", form.demo_url);
      formData.append("github_url", form.github_url);

      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      const savedProduct = product
        ? await updateProduct(product.id, formData)
        : await createProduct(formData);

      if (gallery.length > 0) {
        await uploadGallery(savedProduct.id, gallery);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      console.log(error.response?.status);
      console.log(error.response?.data);
      alert(JSON.stringify(error.response?.data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Tambah Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">
            <Label>Nama</Label>

            <Input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama Product"
            />
          </div>

          <div className="space-y-2">
            <Label>Harga</Label>

            <Input
              type="number"
              name="harga"
              value={form.harga}
              onChange={handleChange}
              placeholder="Harga"
            />
          </div>

          <div className="space-y-2">
            <Label>Tech</Label>

            <Input
              name="tech"
              value={form.tech}
              onChange={handleChange}
              placeholder="React, Laravel, Django..."
            />
          </div>

          <div className="space-y-2">
            <Label>Demo URL</Label>

            <Input
              name="demo_url"
              value={form.demo_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label>Github URL</Label>

            <Input
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label>Deskripsi</Label>

            <Textarea
              rows={5}
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
            />
          </div>

          <ImageUpload
            value={product?.thumbnail}
            preview={preview}
            onChange={handleImage}
            onRemove={handleRemoveImage}
          />
          <GalleryUpload
            previews={galleryPreview}
            existingImages={existingGallery}
            onChange={handleGallery}
            onDelete={handleDeleteGallery}
            onRemovePreview={handleRemovePreview}
          />

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Menyimpan..."
              : product
              ? "Update Product"
              : "Tambah Product"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}