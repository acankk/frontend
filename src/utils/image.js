const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  if (path.startsWith("http")) {
    return path;
  }

  return `${BACKEND_URL}${path}`;
};