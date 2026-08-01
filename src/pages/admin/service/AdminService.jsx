import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";

import ServiceTable from "@/components/admin/service/ServiceTable";
import ServiceModal from "@/components/admin/service/ServiceModal";
import {
  getAllJasa,
  getAdminJasa,
  deleteJasa,
} from "@/services/jasa.service";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const loadServices = async () => {
    try {
      setLoading(true);

      const data = await getAllJasa();
      setServices(data);

    } catch (error) {

      console.error(error);
      alert("Gagal mengambil data service.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = () => {
    setSelectedService(null);
    setOpen(true);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedService(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus service?")) return;

    try {

      await deleteJasa(id);

      loadServices();

    } catch (error) {

      console.error(error);
      alert("Gagal menghapus service.");

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
    <AdminLayout active="Service">

      <AdminHeader
        title="Service Management"
        buttonText="Add Service"
        onClick={handleCreate}
      />

      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ServiceModal
        open={open}
        service={selectedService}
        onClose={handleClose}
        onSuccess={loadServices}
      />

    </AdminLayout>
  );
}