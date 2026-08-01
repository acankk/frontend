import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

// Public
export const getTeams = async () => {
  const { data } = await api.get(
    ENDPOINTS.TEAM
  );

  return data;
};

export const getTeamDetail = async (id) => {
  const { data } = await api.get(
    ENDPOINTS.TEAM_DETAIL(id)
  );

  return data;
};

// Admin
export const getAdminTeams = async () => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_TEAM
  );

  return data;
};

export const getAdminTeam = async (id) => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_TEAM_DETAIL(id)
  );

  return data;
};

export const createTeam = async (
  formData
) => {
  const { data } = await api.post(
    ENDPOINTS.ADMIN_TEAM,
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

export const updateTeam = async (
  id,
  formData
) => {
  const { data } = await api.patch(
    ENDPOINTS.ADMIN_TEAM_DETAIL(id),
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

export const deleteTeam = async (id) => {
  await api.delete(
    ENDPOINTS.ADMIN_TEAM_DETAIL(id)
  );
};