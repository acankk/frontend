export const normalizeImages = (image_url) => {
  if (Array.isArray(image_url)) return image_url;
  if (typeof image_url === "string")
    return image_url.split(",").map((i) => i.trim()).filter(Boolean);
  return [];
};

export const getMainImage = (image_url) => {
  const images = normalizeImages(image_url);
  return images[0] || "/no-image.png";
};

export const getDetailImages = (image_url) => {
  const images = normalizeImages(image_url);
  return images.length > 1 ? images.slice(1) : images;
};
