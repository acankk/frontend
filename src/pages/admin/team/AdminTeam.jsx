import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";

import TeamTable from "@/components/admin/team/TeamTable";
import TeamModal from "@/components/admin/team/TeamModal";

import {
  getAdminTeams,
  deleteTeam,
} from "@/services/team.service";

export default function AdminTeam() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const loadTeams = async () => {
    try {
      setLoading(true);

      const data = await getAdminTeams();
      setTeams(data);

    } catch (error) {

      console.error(error);
      alert("Gagal mengambil data team.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCreate = () => {
    setSelectedTeam(null);
    setOpen(true);
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTeam(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus team?")) return;

    try {

      await deleteTeam(id);
      loadTeams();

    } catch (error) {

      console.error(error);
      alert("Gagal menghapus team.");

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
    <AdminLayout active="Team">

      <AdminHeader
        title="Team Management"
        buttonText="Add Team"
        onClick={handleCreate}
      />

      <TeamTable
        teams={teams}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TeamModal
        open={open}
        team={selectedTeam}
        onClose={handleClose}
        onSuccess={loadTeams}
      />

    </AdminLayout>
  );
}