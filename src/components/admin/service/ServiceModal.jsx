import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ServiceImageUpload from "./ServiceImageUpload";

import {
  createJasa,
  updateJasa,
} from "@/services/jasa.service";

const initialState = {
  nama: "",
  deskripsi: "",
  gambar: null,
};

export default function ServiceModal({
  open,
  service,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!service) {
      setForm(initialState);
      setPreview(null);
      return;
    }

    setForm({
      nama: service.nama,
      deskripsi: service.deskripsi,
      gambar: null,
    });

    setPreview(service.gambar);
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (file) => {
    setForm((prev) => ({
      ...prev,
      gambar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreview(null);

    setForm((prev) => ({
      ...prev,
      gambar: null,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("nama", form.nama);
      formData.append("deskripsi", form.deskripsi);

      if (form.gambar) {
        formData.append("gambar", form.gambar);
      }

      if (service) {
        await updateJasa(service.id, formData);
      } else {
        await createJasa(formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Tambah Service"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">
            <Label>Nama</Label>

            <Input
              name="nama"
              value={form.nama}
              onChange={handleChange}
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

          <ServiceImageUpload
            value={service?.gambar}
            preview={preview}
            onChange={handleImage}
            onRemove={handleRemoveImage}
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
              : service
              ? "Update Service"
              : "Tambah Service"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}