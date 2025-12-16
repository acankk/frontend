import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-4xl p-10 flex flex-col md:flex-row gap-10">

        {/* macOS dots */}
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
            Create your account and start building
            beautifully crafted professional designs.
          </p>
        </div>

        {/* RIGHT (FORM) */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Daftar</h2>

          <div className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Nama</label>
              <Input
                className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <Input
                type="email"
                className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                placeholder="Type your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Password</label>
              <Input
                type="password"
                className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Confirm Password</label>
              <Input
                type="password"
                className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-xl py-6 text-base shadow">
              Register
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

          </div>
        </div>

      </div>
    </div>
  );
}
