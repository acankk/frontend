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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PortfolioImageUpload from "./PortfolioImageUpload";

import {
  createPortfolio,
  updatePortfolio,
} from "@/services/portfolio.service";


import { getAdminTeams } from "@/services/team.service";
import { getAdminMembers } from "@/services/member.service";

const initialState = {
  team: "",
  member: "none",
  judul: "",
  deskripsi: "",
  demo_url: "",
  github_url: "",
  gambar: null,
};

export default function PortfolioModal({
  open,
  portfolio,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState(initialState);


  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

 

  useEffect(() => {
    if (!portfolio) {
      setForm(initialState);
      setPreview(null);
      setMembers([]);
      return;
    }

    setForm({
      
      team: String(portfolio.team),
      member: portfolio.member
        ? String(portfolio.member)
        : "none",
      judul: portfolio.judul,
      deskripsi: portfolio.deskripsi,
      demo_url: portfolio.demo_url || "",
      github_url: portfolio.github_url || "",
      gambar: null,
    });

    setPreview(portfolio.gambar);
    loadMembers(portfolio.team);
  }, [portfolio]);

 
  const loadTeams = async () => {
    try {
      setTeams(await getAdminTeams());
    } catch (error) {
      console.error(error);
    }
  };

  const loadMembers = async (teamId) => {
    if (!teamId) {
      setMembers([]);
      return;
    }

    try {
      setMembers(await getAdminMembers(teamId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (name, value) => {
    if (name === "team") {
      setForm((prev) => ({
        ...prev,
        team: value,
        member: "none",
      }));

      loadMembers(value);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInput = (e) => {
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

      
      formData.append("team", form.team);
      formData.append("judul", form.judul);
      formData.append("deskripsi", form.deskripsi);
      formData.append("demo_url", form.demo_url);
      formData.append("github_url", form.github_url);

      if (form.member !== "none") {
        formData.append("member", form.member);
      }

      if (form.gambar) {
        formData.append("gambar", form.gambar);
      }

      if (portfolio) {
        await updatePortfolio(portfolio.id, formData);
      } else {
        await createPortfolio(formData);
      }

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      console.log(error.response?.status);
      console.log(error.response?.data);

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            {portfolio
              ? "Edit Portfolio"
              : "Tambah Portfolio"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">

          

          <div className="space-y-2">
            <Label>Team</Label>

            <Select
              value={form.team}
              onValueChange={(value) =>
                handleChange("team", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Team" />
              </SelectTrigger>

              <SelectContent>
                {teams.map((team) => (
                  <SelectItem
                    key={team.id}
                    value={String(team.id)}
                  >
                    {team.nama}
                  </SelectItem>
                ))}
              </SelectContent>

            </Select>
          </div>

          <div className="space-y-2">
            <Label>Member</Label>

            <Select
              value={form.member}
              onValueChange={(value) =>
                handleChange("member", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Member" />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="none">
                  Tanpa Member
                </SelectItem>

                {members.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={String(member.id)}
                  >
                    {member.nama}
                  </SelectItem>
                ))}

              </SelectContent>

            </Select>
          </div>

          <div className="space-y-2">
            <Label>Judul</Label>

            <Input
              name="judul"
              value={form.judul}
              onChange={handleInput}
              placeholder="Judul Portfolio"
            />
          </div>

          <div className="space-y-2">
            <Label>Demo URL</Label>

            <Input
              name="demo_url"
              value={form.demo_url}
              onChange={handleInput}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label>Github URL</Label>

            <Input
              name="github_url"
              value={form.github_url}
              onChange={handleInput}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label>Deskripsi</Label>

            <Textarea
              rows={5}
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleInput}
            />
          </div>

          <PortfolioImageUpload
            value={portfolio?.gambar}
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
              : portfolio
              ? "Update Portfolio"
              : "Tambah Portfolio"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}