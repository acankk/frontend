import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-teal-500 text-white flex flex-col items-center justify-center p-12">
          <h1 className="text-4xl font-bold mb-2">MarketPlace</h1>
          <p className="text-2xl font-semibold">Login</p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <label className="text-gray-700 font-semibold">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="mt-1 mb-4 w-full px-4 py-2 border rounded-xl focus:outline-teal-500"
          />

          <label className="text-gray-700 font-semibold">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="mt-1 mb-6 w-full px-4 py-2 border rounded-xl focus:outline-teal-500"
          />

          <button className="w-full bg-teal-500 text-white py-3 rounded-2xl font-semibold text-lg shadow-md hover:bg-teal-600 transition">
            login
          </button>

          {/* Social Login */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-6"
              />
              Google
            </button>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/448224/facebook.svg"
                alt="facebook"
                className="w-6"
              />
              Facebook
            </button>
          </div>

          <p className="text-center mt-6 text-gray-700">
            Don’t have an account?{" "}
            <span
              className="text-teal-600 font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}