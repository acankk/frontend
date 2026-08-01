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
import { Checkbox } from "@/components/ui/checkbox";

import MemberPhotoUpload from "./MemberPhotoUpload";

import {
  createMember,
  updateMember,
} from "@/services/member.service";

const initialState = {
  team: "",
  nama: "",
  jabatan: "",
  deskripsi: "",
  starting_price: "",
  github: "",
  linkedin: "",
  instagram: "",
  is_available: true,
  urutan: 1,
  foto: null,
};

export default function MemberModal({
  open,
  member,
  teamId,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!member) {
      setForm({
        ...initialState,
        team: teamId,
      });

      setPreview(null);
      return;
    }

    setForm({
      team: member.team,
      nama: member.nama,
      jabatan: member.jabatan,
      deskripsi: member.deskripsi,
      starting_price: member.starting_price,
      github: member.github || "",
      linkedin: member.linkedin || "",
      instagram: member.instagram || "",
      is_available: member.is_available,
      urutan: member.urutan,
      foto: null,
    });

    setPreview(member.foto);
  }, [member, teamId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleImage = (file) => {
    setForm((prev) => ({
      ...prev,
      foto: file,
    }));

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleRemoveImage = () => {
    setPreview(null);

    setForm((prev) => ({
      ...prev,
      foto: null,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("team", form.team);
      formData.append("nama", form.nama);
      formData.append("jabatan", form.jabatan);
      formData.append("deskripsi", form.deskripsi);
      formData.append("starting_price", form.starting_price);
      formData.append("github", form.github);
      formData.append("linkedin", form.linkedin);
      formData.append("instagram", form.instagram);
      formData.append("is_available", form.is_available);
      formData.append("urutan", form.urutan);

      if (form.foto) {
        formData.append("foto", form.foto);
      }

      if (member) {
        await updateMember(
          member.id,
          formData
        );
      } else {
        await createMember(formData);
      }

      onSuccess();
      onClose();

    } catch (error) {

      console.error(error);

      alert("Gagal menyimpan member.");

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
            {member
              ? "Edit Member"
              : "Tambah Member"}
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
            <Label>Role</Label>

            <Input
              name="jabatan"
              value={form.jabatan}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Harga</Label>

            <Input
              type="number"
              name="starting_price"
              value={form.starting_price}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Github</Label>

            <Input
              name="github"
              value={form.github}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>LinkedIn</Label>

            <Input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Instagram</Label>

            <Input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Urutan</Label>

            <Input
              type="number"
              name="urutan"
              value={form.urutan}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">

            <Checkbox
              id="is_available"
              checked={form.is_available}
              onCheckedChange={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  is_available: checked,
                }))
              }
            />

            <Label htmlFor="is_available">
              Available
            </Label>

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

          <MemberPhotoUpload
            value={member?.foto}
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
              : member
              ? "Update Member"
              : "Tambah Member"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}