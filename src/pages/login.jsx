import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginMacOS() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      
      {/* macOS style window */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-4xl p-10 flex flex-col md:flex-row gap-10 transition-all">
        
        {/* Window Header (macOS dots) */}
        <div className="absolute flex gap-2 top-4 left-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* LEFT SIDE */}
        <div className="flex-1 flex flex-col justify-center mt-10 md:mt-0">
          <h2 className="text-sm uppercase tracking-widest text-gray-300">
            Welcome to
          </h2>

          <h1 className="text-5xl font-bold mt-1">INOVARE</h1>

          <p className="mt-5 text-gray-300 leading-relaxed text-lg">
            Where creativity meets simplicity —  
            beautifully crafted professional designs that bring your ideas to life.
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">Masuk</h2>

          <div className="space-y-5">

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

            <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-xl py-6 text-base shadow">
              Login
            </Button>

            {/* Social login */}
            <div className="flex items-center justify-center gap-4 pt-3">
              <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl shadow-md">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
                Google
              </button>

              <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl shadow-md">
                <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-5" />
                Facebook
              </button>
            </div>

            <p className="text-center text-sm text-gray-300">
              Don’t have an account? <span className="underline cursor-pointer">Create</span>
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
