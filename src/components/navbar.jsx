import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const isWishlist = location.pathname === "/wishlist";
  const isAuth =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleScrollMenu = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "auto" });
    } else {
      navigate(`/?scroll=${id}`);
    }
  };

  // scroll spy (khusus home container)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const container = document.getElementById("home-scroll");
    if (!container) return;

    const sections = ["home", "about", "template", "contact"];

    const onScroll = () => {
      const scrollPos = container.scrollTop + container.clientHeight / 2;

      for (let id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (
          scrollPos >= el.offsetTop &&
          scrollPos < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    container.addEventListener("scroll", onScroll);
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <>
      {/* NAVBAR ATAS */}
      <div className="fixed top-0 left-0 w-full h-16 px-10 flex items-center justify-between bg-neutral-900/90 backdrop-blur-md text-white z-[9999]">
        <h1
          onClick={() => {
            if (location.pathname === "/") {
              document.getElementById("home")?.scrollIntoView({ behavior: "auto" });
            } else {
              navigate("/");
            }
          }}
          className="text-xl font-bold text-cyan-400 cursor-pointer"
        >
          INOVARE
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/wishlist")}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition
              ${isWishlist ? "bg-violet-500" : "bg-white/10 hover:bg-white/20"}`}
          >
            <Heart size={20} />
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition
              ${location.pathname === "/profile"
                ? "bg-violet-500"
                : "border border-white/20 hover:bg-white/10"}`}
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* NAVBAR BAWAH */}
      {location.pathname === "/" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-800 px-3 py-2 rounded-full flex gap-2 text-gray-300 shadow-xl backdrop-blur-md items-center z-[9999]">
          {["about", "template", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => handleScrollMenu(item)}
              className={`px-5 py-2 rounded-full transition-all duration-300 capitalize
                ${
                  activeSection === item
                    ? "bg-violet-500 text-white shadow-lg scale-105"
                    : "hover:bg-white/10 hover:text-white"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
