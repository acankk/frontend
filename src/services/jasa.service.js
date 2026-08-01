import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export const getAllJasa = async () => {
  const { data } = await api.get(
    ENDPOINTS.JASA
  );

  return data;
};

export const getJasaDetail = async (id) => {
  const { data } = await api.get(
    ENDPOINTS.JASA_DETAIL(id)
  );

  return data;
};

export const getAdminJasa = async () => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_JASA
  );

  return data;
};

export const createJasa = async (formData) => {
  const { data } = await api.post(
    ENDPOINTS.ADMIN_JASA,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const updateJasa = async (
  id,
  formData
) => {
  const { data } = await api.put(
    ENDPOINTS.ADMIN_JASA_DETAIL(id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteJasa = async (id) => {
  await api.delete(
    ENDPOINTS.ADMIN_JASA_DETAIL(id)
  );
};