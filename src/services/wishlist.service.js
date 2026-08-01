import api from "@/lib/api";

export const getWishlist = async () => {
  const { data } = await api.get(ENDPOINTS.WISHLIST);

  return data;
};

export const toggleWishlist = async (
  productId
) => {
  const { data } = await api.post(
    "/wishlist/toggle/",
    {
      product_id: productId,
    }
  );

  return data;
};