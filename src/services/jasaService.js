import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export const getAllJasa = async () => {
  const response = await api.get(ENDPOINTS.JASA);
  return response.data;
};

export const getJasaDetail = async (id) => {
  const response = await api.get(`${ENDPOINTS.JASA}${id}/`);
  return response.data;
};



export const createJasa = async (formData) => {
  const response = await api.post(
    ENDPOINTS.ADMIN_JASA,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateJasa = async (id, formData) => {
  const response = await api.put(
    `${ENDPOINTS.ADMIN_JASA}${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteJasa = async (id) => {
  await api.delete(`${ENDPOINTS.ADMIN_JASA}${id}/`);
};

