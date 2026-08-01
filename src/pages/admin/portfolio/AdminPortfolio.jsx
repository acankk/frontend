import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";

import PortfolioTable from "@/components/admin/portfolio/PortfolioTable";
import PortfolioModal  from "@/components/admin/portfolio/PortfolioModal";
import {
  getAdminPortfolios,
  deletePortfolio,
} from "@/services/portfolio.service";

export default function AdminPortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState(null);

  const loadPortfolios = async () => {
    try {
      setLoading(true);

      const data =
        await getAdminPortfolios();

      setPortfolios(data);

    } catch (error) {

      console.error(error);

      alert(
        "Gagal mengambil data portfolio."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadPortfolios();
  }, []);

  const handleCreate = () => {
    setSelectedPortfolio(null);
    setOpen(true);
  };

  const handleEdit = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPortfolio(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Yakin ingin menghapus portfolio?"
      )
    )
      return;

    try {

      await deletePortfolio(id);

      loadPortfolios();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal menghapus portfolio."
      );

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
    <AdminLayout active="Portfolio">

      <AdminHeader
        title="Portfolio Management"
        buttonText="Add Portfolio"
        onClick={handleCreate}
      />

      <PortfolioTable
        portfolios={portfolios}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PortfolioModal
        open={open}
        portfolio={selectedPortfolio}
        onClose={handleClose}
        onSuccess={loadPortfolios}
      />

    </AdminLayout>
  );
}