import React from "react";

export default function SignUp() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-semibold tracking-wide mb-1">
            WELCOME TO
          </h2>
          <h1 className="text-6xl font-extrabold mb-6">INOVARE</h1>

          <p className="text-lg leading-relaxed text-gray-300">
            Where Creativity Meets Simplicity; Professional Designs 
            Crafted to Bring Your Ideas to Life
          </p>
        </div>

        {/* RIGHT FORM CARD */}
        <div className="w-full flex flex-col">
          <h1 className="text-3xl font-bold text-center mb-6">DAFTAR</h1>

          <div className="w-full space-y-4">
            {/* Input field */}
            <div>
              <label className="text-sm text-gray-300">Nama</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-full bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                className="w-full px-5 py-3 rounded-full bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">No Hp</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-full bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Password</label>
              <input
                type="password"
                className="w-full px-5 py-3 rounded-full bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white transition"
              />
            </div>

            {/* Register button */}
            <button className="w-full py-3 rounded-full bg-white text-black font-semibold text-lg hover:opacity-90 transition mt-4">
              Daftar
            </button>

            {/* Social login */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full shadow">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full shadow">
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Facebook
              </button>
            </div>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-400 mt-2">
              Already have account?{" "}
              <span className="text-white underline cursor-pointer">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
