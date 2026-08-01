export const ENDPOINTS = {
  // Auth
  LOGIN: "/login/",
  REGISTER: "/register/",
  PROFILE: "/profile/",

  // Products
  PRODUCTS: "/products/",
  PRODUCT_DETAIL: (id) => `/products/${id}/`,

  ADMIN_PRODUCTS: "/products/admin/",
  ADMIN_PRODUCT: (id) => `/products/admin/${id}/`,

  // Services
  JASA: "/jasa/",
  JASA_DETAIL: (id) => `/jasa/${id}/`,

  ADMIN_JASA: "/jasa/admin/",
  ADMIN_JASA_DETAIL: (id) => `/jasa/admin/${id}/`,

  ADMIN_GALLERY: "/gallery/admin/",
  ADMIN_GALLERY_DETAIL: (id) => `/gallery/admin/${id}/`,

  // Team
  TEAM: "/team/",
  TEAM_DETAIL: (id) => `/team/${id}/`,

  ADMIN_TEAM: "/team/admin/",
  ADMIN_TEAM_DETAIL: (id) => `/team/admin/${id}/`,

  // Team Member (Public)
  MEMBERS: (teamId) => `/team/${teamId}/members/`,
  MEMBER_DETAIL: (id) => `/member/${id}/`,

  // Team Member (Admin)
  ADMIN_MEMBERS: "/team/member/admin/",
  ADMIN_MEMBERS_BY_TEAM: (teamId) =>
    `/team/member/admin/?team=${teamId}`,

  ADMIN_MEMBER: (id) =>
    `/team/member/admin/${id}/`,

  // Portfolio
  PORTFOLIO: "/portfolio/",
  PORTFOLIO_DETAIL: (id) =>
    `/portfolio/${id}/`,

  ADMIN_PORTFOLIO: "/portfolio/admin/",
  ADMIN_PORTFOLIO_DETAIL: (id) =>
    `/portfolio/admin/${id}/`,

  // Wishlist
  WISHLIST: "/wishlist/",
  TOGGLE_WISHLIST: "/wishlist/toggle/",
};