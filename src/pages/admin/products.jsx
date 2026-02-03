import { useEffect, useState } from "react";
import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Trash2, Pencil, X } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    tech: "",
    description: "",
    main_image: null,
    detail_images: [],
  });

  const [previewMain, setPreviewMain] = useState(null);

  // iamge details
  const [existingDetails, setExistingDetails] = useState([]); 
  const [previewDetails, setPreviewDetails] = useState([]);   

  /* FETCH  */
  const fetchProducts = async () => {
    const res = await api.get(ENDPOINTS.PRODUCTS);
    setProducts(res.data?.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /*  FORM  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((p) => ({ ...p, main_image: file }));
    setPreviewMain(URL.createObjectURL(file));
  };

  const handleDetailImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setForm((p) => ({
      ...p,
      detail_images: [...p.detail_images, ...files],
    }));

    setPreviewDetails((p) => [
      ...p,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeMainImage = () => {
    setForm((p) => ({ ...p, main_image: null }));
    setPreviewMain(null);
  };

  const removeNewDetailImage = (index) => {
    setForm((p) => ({
      ...p,
      detail_images: p.detail_images.filter((_, i) => i !== index),
    }));
    setPreviewDetails((p) => p.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      tech: "",
      description: "",
      main_image: null,
      detail_images: [],
    });
    setPreviewMain(null);
    setPreviewDetails([]);
    setExistingDetails([]);
    setEditId(null);
  };

  /* FORM DATA  */
  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", Number(form.price));
    fd.append("tech", form.tech);
    fd.append("description", form.description);

    // backend ALL images as "files"
    if (form.main_image) fd.append("files", form.main_image);
    form.detail_images.forEach((f) => fd.append("files", f));

    return fd;
  };

  /*  SAVE */
  const handleSave = async () => {
    setLoading(true);
    try {
      const url = editId
        ? ENDPOINTS.ADMIN_UPDATE_PRODUCT(editId)
        : ENDPOINTS.ADMIN_CREATE_PRODUCT;

      const method = editId ? api.patch : api.post;

      await method(url, buildFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProducts();
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan product");
    } finally {
      setLoading(false);
    }
  };

  /*  DELETE  */
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus product?")) return;
    await api.delete(ENDPOINTS.ADMIN_DELETE_PRODUCT(id));
    fetchProducts();
  };

  /* EDIT  */
  const openEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.name || "",
      price: p.price || "",
      tech: p.tech || "",
      description: p.description || "",
      main_image: null,
      detail_images: [],
    });

    setPreviewMain(p.image_url?.[0] || null);
    setExistingDetails(p.image_url?.slice(1) || []);
    setPreviewDetails([]);
    setOpen(true);
  };

  /*  UI  */
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-neutral-900 border-r border-white/10 p-6">
        <h2 className="text-xl font-bold mb-10">ADMIN PANEL</h2>
        <div className="space-y-3">
          <div className="px-4 py-2 rounded-lg bg-violet-500">Products</div>
          <div className="px-4 py-2 rounded-lg bg-white/10">Jasa</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Report</h1>
          <Button
            onClick={() => setOpen(true)}
            className="bg-white/10 hover:bg-violet-500 gap-2"
          >
            <Plus size={18} /> Add Product
          </Button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                {["ID", "Image", "Name", "Price", "Tech", "Desc", "Action"].map(
                  (h) => (
                    <TableHead key={h} className="text-white">{h}</TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} className="hover:bg-violet-500/60">
                  <TableCell>{p.id}</TableCell>
                  <TableCell>
                    <img
                      src={p.image_url?.[0] || "/no-image.png"}
                      className="w-14 h-10 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    Rp {Number(p.price).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{p.tech}</TableCell>
                  <TableCell className="max-w-sm truncate">
                    {p.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openEdit(p)}>
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(p.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-neutral-900 rounded-2xl border border-white/10 max-h-[90vh] flex flex-col">
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between">
              <h2 className="text-lg font-semibold">
                {editId ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => { setOpen(false); resetForm(); }}>
                <X />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-violet-500">
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
              <Input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
              <Input name="tech" value={form.tech} onChange={handleChange} placeholder="Tech" />

              {/* MAIN IMAGE */}
              <div>
                <label className="text-sm text-white/70">Main Image</label>
                <label className="block mt-2">
                  <input type="file" accept="image/*" onChange={handleMainImage} hidden />
                  <div className="inline-block px-4 py-2 bg-white/10 hover:bg-violet-500 rounded-lg cursor-pointer">
                    {previewMain ? "Ganti Gambar" : "Pilih Gambar"}
                  </div>
                </label>

                {previewMain && (
                  <div className="relative mt-3">
                    <img src={previewMain} className="h-32 w-full object-cover rounded-xl" />
                    <button
                      onClick={removeMainImage}
                      className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-violet-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* DETAIL IMAGES */}
              <div>
                <label className="text-sm text-white/70">Detail Images</label>
                <label className="block mt-2">
                  <input type="file" accept="image/*" multiple onChange={handleDetailImages} hidden />
                  <div className="inline-block px-4 py-2 bg-white/10 hover:bg-violet-500 rounded-lg cursor-pointer">
                    Pilih Beberapa Gambar
                  </div>
                </label>

                {/* IMAGE LAMA */}
                {existingDetails.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {existingDetails.map((img, i) => (
                      <img key={`old-${i}`} src={img} className="h-20 w-full object-cover rounded-lg" />
                    ))}
                  </div>
                )}

                {/* IMAGE BARU */}
                {previewDetails.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {previewDetails.map((img, i) => (
                      <div key={`new-${i}`} className="relative">
                        <img src={img} className="h-20 w-full object-cover rounded-lg" />
                        <button
                          onClick={() => removeNewDetailImage(i)}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full hover:bg-violet-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Description"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white"
              />
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-white/10">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="w-full bg-white/10 hover:bg-violet-500"
              >
                {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
