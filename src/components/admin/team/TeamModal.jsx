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

import TeamLogoUpload from "./TeamLogoUpload";

import {
  createTeam,
  updateTeam,
} from "@/services/team.service";

const initialState = {
  nama: "",
  deskripsi: "",
  starting_price: "",
  is_active: true,
  logo: null,
};

export default function TeamModal({
  open,
  team,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!team) {
      setForm(initialState);
      setPreview(null);
      return;
    }

    setForm({
      nama: team.nama,
      deskripsi: team.deskripsi,
      starting_price: team.starting_price,
      is_active: team.is_active,
      logo: null,
    });

    setPreview(team.logo);

  }, [team]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogo = (file) => {
    setForm((prev) => ({
      ...prev,
      logo: file,
    }));

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleRemoveLogo = () => {
    setPreview(null);

    setForm((prev) => ({
      ...prev,
      logo: null,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("nama", form.nama);
      formData.append("deskripsi", form.deskripsi);
      formData.append(
        "starting_price",
        form.starting_price
      );
      formData.append(
        "is_active",
        form.is_active
      );

      if (form.logo) {
        formData.append(
          "logo",
          form.logo
        );
      }

      if (team) {
        await updateTeam(
          team.id,
          formData
        );
      } else {
        await createTeam(
          formData
        );
      }

      onSuccess();
      onClose();

    } catch (error) {

      console.error(error);

      alert(
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {team
              ? "Edit Team"
              : "Tambah Team"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">
            <Label>Nama Team</Label>

            <Input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Development Team"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Starting Price
            </Label>

            <Input
              type="number"
              name="starting_price"
              value={form.starting_price}
              onChange={handleChange}
              placeholder="5000000"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Deskripsi
            </Label>

            <Textarea
              rows={5}
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
            />
          </div>

          <TeamLogoUpload
            value={team?.logo}
            preview={preview}
            onChange={handleLogo}
            onRemove={handleRemoveLogo}
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
              : team
              ? "Update Team"
              : "Tambah Team"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}