import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export const getGallery = async (productId) => {
  const { data } = await api.get(
    `${ENDPOINTS.ADMIN_GALLERY}?product=${productId}`
  );

  return data;
};

export const uploadGallery = async (productId, files) => {
  const formData = new FormData();

  formData.append("product", productId);

  files.forEach((file) => {
    formData.append("images", file);
  });

  const { data } = await api.post(
    ENDPOINTS.ADMIN_GALLERY,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteGallery = async (id) => {
  await api.delete(
    ENDPOINTS.ADMIN_GALLERY_DETAIL(id)
  );
};