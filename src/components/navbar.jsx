import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "signup", path: "/signup" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2
        bg-neutral-800 px-10 py-3 rounded-full
        flex gap-8 text-gray-300 shadow-xl backdrop-blur-md
        items-center z-50">

      {menu.map((item) => {
        const active = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`text-lg transition ${
              active
                ? "text-white font-semibold"
                : "hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
