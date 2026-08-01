import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import { ArrowLeft } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !username || !password ) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await api.post(ENDPOINTS.REGISTER, {
        email,
        username,
        password,
      });

      alert("Register berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.detail || "Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-6">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-4xl min-h-[420px] p-10 flex flex-col md:flex-row gap-10">


        {/* dots */}
        <div className="absolute flex gap-2 top-4 left-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* LEFT */}
        <div className="flex-1 flex flex-col justify-center mt-10 md:mt-0">
          <h2 className="text-sm uppercase tracking-widest text-gray-300">
            Join
          </h2>
          <h1 className="text-5xl font-bold mt-1">INOVARE</h1>
          <p className="mt-5 text-gray-300 leading-relaxed text-lg">
            Create your account and start building beautifully crafted professional designs.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Daftar</h2>

          <div className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/20 border-white/30 text-white"
                placeholder="Your username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white"
                placeholder="Type your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 border-white/30 text-white"
                placeholder="********"
              />
            </div>


            <Button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-white/20 hover:bg-violet-500 backdrop-blur text-white rounded-xl py-6 text-base shadow"
            >
              {loading ? "Loading..." : "Register"}
            </Button>

            <p className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
            <button
              onClick={() => navigate("/")}
              className="mx-auto flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          

          </div>
        </div>

      </div>
    </div>
  );
}
