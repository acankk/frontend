import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(ENDPOINTS.LOGIN, {
        username,
        password,
      });

      const token = res.data.access_token || res.data.token;
      if (!token) return alert("Token tidak ditemukan");

      localStorage.setItem("token", token);

      const meRes = await api.get(ENDPOINTS.ME);
      const role = meRes.data.role;
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/admin/products");
      else navigate("/");

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-6">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-4xl min-h-[470px] p-10 flex flex-col md:flex-row gap-10">
        {/* macOS dots */}
        <div className="absolute flex gap-2 top-4 left-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-center mt-10 md:mt-0">
          <h2 className="text-sm uppercase tracking-widest text-gray-300">
            Welcome to
          </h2>
          <h1 className="text-5xl font-bold mt-1">INOVARE</h1>
          <p className="mt-5 text-gray-300 leading-relaxed text-lg">
            Where creativity meets simplicity - beautifully crafted professional
            designs that bring your ideas to life.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Masuk</h2>

          <div className="space-y-5">
            {/* USERNAME */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                placeholder="Type your username"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Password</label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400 pr-10"
                  placeholder="********"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white/20 hover:bg-violet-500 backdrop-blur text-white rounded-xl py-6 text-base shadow"
            >
              {loading ? "Loading..." : "Login"}
            </Button>

            <p className="text-center text-sm text-gray-300">
              Don’t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
