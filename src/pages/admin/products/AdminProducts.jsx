import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductModal from "@/components/admin/products/ProductModal";

import {
  getAdminProducts,
  deleteProduct,
} from "@/services/product.service";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAdminProducts();
      setProducts(data);

    } catch (error) {

      console.error(error);
      alert("Gagal mengambil data product.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus product?")) return;

    try {

      await deleteProduct(id);

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("Gagal menghapus product.");

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
    <AdminLayout active="Products">

      <AdminHeader
        title="Product Management"
        buttonText="Add Product"
        onClick={handleCreate}
      />

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        open={open}
        product={selectedProduct}
        onClose={handleClose}
        onSuccess={loadProducts}
      />

    </AdminLayout>
  );
}