import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api.get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-10 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-4xl font-bold">
            {user.username?.[0]?.toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-400 text-sm">{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-8 w-full py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-10">
          <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              disabled
              value={user.username}
              className="bg-white/10 rounded-xl px-4 py-3 outline-none"
            />
            <input
              disabled
              value={user.email}
              className="bg-white/10 rounded-xl px-4 py-3 outline-none"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
