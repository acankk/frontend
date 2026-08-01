import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";

import MemberTable from "@/components/admin/member/MemberTable";
import MemberModal from "@/components/admin/member/MemberModal";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus } from "lucide-react";

import { getAdminTeams } from "@/services/team.service";

import {
  getAdminMembers,
  deleteMember,
} from "@/services/member.service";

export default function AdminMembers() {
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState(null);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (teamId) {
      loadMembers();
    }
  }, [teamId]);

  const loadTeams = async () => {
    try {
      const data = await getAdminTeams();

      setTeams(data);

      if (data.length > 0) {
        setTeamId(data[0].id);
      }

    } catch (error) {

      console.error(error);

      alert("Gagal mengambil data team.");

    }
  };

  const loadMembers = async () => {
    try {
      setLoading(true);

      const data = await getAdminMembers(teamId);

      setMembers(data);

    } catch (error) {

      console.error(error);

      alert("Gagal mengambil data member.");

    } finally {

      setLoading(false);

    }
  };

  const handleCreate = () => {
    setSelectedMember(null);
    setOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedMember(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus member?")) return;

    try {

      await deleteMember(id);

      loadMembers();

    } catch (error) {

      console.error(error);

      alert("Gagal menghapus member.");

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <AdminLayout active="Members">

      <AdminHeader
        title="Member Management"
      />

      <div className="mb-6 flex items-end justify-between">

        <div className="space-y-2">

          <p className="text-sm font-medium">
            Team
          </p>

          <Select
            value={teamId?.toString()}
            onValueChange={(value) =>
              setTeamId(Number(value))
            }
          >

            <SelectTrigger className="w-80">
              <SelectValue placeholder="Pilih Team" />
            </SelectTrigger>

            <SelectContent>

              {teams.map((team) => (

                <SelectItem
                  key={team.id}
                  value={team.id.toString()}
                >
                  {team.nama}
                </SelectItem>

              ))}

            </SelectContent>

          </Select>

        </div>

        <Button
          onClick={handleCreate}
          className="gap-2 bg-white/10 hover:bg-violet-500"
        >
          <Plus size={18} />
          Add Member
        </Button>

      </div>

      <MemberTable
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MemberModal
        open={open}
        member={selectedMember}
        teamId={teamId}
        onClose={handleClose}
        onSuccess={loadMembers}
      />

    </AdminLayout>
  );
}