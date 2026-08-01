import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export const getProducts = async () => {
  const { data } = await api.get(ENDPOINTS.PRODUCTS);
  return data;
};

export const getProduct = async (id) => {
  const { data } = await api.get(ENDPOINTS.PRODUCT_DETAIL(id));
  return data;
};

export const getAdminProducts = async () => {
  const { data } = await api.get(ENDPOINTS.ADMIN_PRODUCTS);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await api.post(
    ENDPOINTS.ADMIN_PRODUCTS,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await api.patch(
    ENDPOINTS.ADMIN_PRODUCT(id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteProduct = async (id) => {
  await api.delete(ENDPOINTS.ADMIN_PRODUCT(id));
};
