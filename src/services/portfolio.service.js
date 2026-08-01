import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

// Public
export const getPortfolios = async () => {
  const { data } = await api.get(
    ENDPOINTS.PORTFOLIO
  );

  return data;
};

export const getPortfolioDetail = async (id) => {
  const { data } = await api.get(
    ENDPOINTS.PORTFOLIO_DETAIL(id)
  );

  return data;
};

// Admin
export const getAdminPortfolios = async () => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_PORTFOLIO
  );

  return data;
};

export const getAdminPortfolio = async (id) => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_PORTFOLIO_DETAIL(id)
  );

  return data;
};

export const createPortfolio = async (
  formData
) => {
  const { data } = await api.post(
    ENDPOINTS.ADMIN_PORTFOLIO,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

export const updatePortfolio = async (
  id,
  formData
) => {
  const { data } = await api.patch(
    ENDPOINTS.ADMIN_PORTFOLIO_DETAIL(id),
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

export const deletePortfolio = async (
  id
) => {
  await api.delete(
    ENDPOINTS.ADMIN_PORTFOLIO_DETAIL(id)
  );
};