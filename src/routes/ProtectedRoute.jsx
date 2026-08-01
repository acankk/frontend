import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const access = localStorage.getItem("access");

      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get(ENDPOINTS.PROFILE);

        if (data.group === "Admin") {
          setIsAllowed(true);
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      } catch (error) {
        console.error(error);

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}