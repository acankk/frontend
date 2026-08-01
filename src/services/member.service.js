import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

// Public
export const getMembers = async (teamId) => {
  const { data } = await api.get(
    ENDPOINTS.MEMBERS(teamId)
  );

  return data;
};

// Admin
export const getAdminMembers = async (
  teamId
) => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_MEMBERS_BY_TEAM(teamId)
  );

  return data;
};

export const getAdminMember = async (
  id
) => {
  const { data } = await api.get(
    ENDPOINTS.ADMIN_MEMBER(id)
  );

  return data;
};

export const createMember = async (
  formData
) => {
  const { data } = await api.post(
    ENDPOINTS.ADMIN_MEMBERS,
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

export const updateMember = async (
  id,
  formData
) => {
  const { data } = await api.patch(
    ENDPOINTS.ADMIN_MEMBER(id),
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

export const deleteMember = async (
  id
) => {
  await api.delete(
    ENDPOINTS.ADMIN_MEMBER(id)
  );
};