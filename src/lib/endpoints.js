export const ENDPOINTS = {
  PRODUCTS: "/api/products/",
  PRODUCT_DETAIL: (id) => `/api/products/${id}`,

  // AUTH
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ME: "/auth/me",
  JASA: "/api/jasa/",

  // WISHLIST
  WISHLIST: "/wishlist/",
  TOGGLE_WISHLIST: "/wishlist/toggle",

  // ADMIN PRODUCTS
  ADMIN_UPDATE_PRODUCT: (id) => `/api/products/update/${id}`,
  ADMIN_DELETE_PRODUCT: (id) => `/api/products/delete/${id}`,
};
