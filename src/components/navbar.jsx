import { useLocation, useNavigate } from "react-router-dom";
import { Heart, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isWishlist = location.pathname === "/wishlist";

  const handleScrollMenu = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/?scroll=${id}`);
    }
  };

  /* AUTO HIDE NAVBAR */
  useEffect(() => {
    const container = document.getElementById("home-scroll") || window;

    const getScroll = () =>
      container === window ? window.scrollY : container.scrollTop;

    const handleScroll = () => {
      const currentScrollY = getScroll();

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, location.pathname]);

  /* SCROLL SPY HOME */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const container = document.getElementById("home-scroll");
    if (!container) return;

    const sections = ["home", "about", "service", "template", "developer", "contact"];

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
      {/* ================= NAVBAR ATAS ================= */}
      <div
        className={`fixed top-0 inset-x-0 h-16 px-10 flex items-center justify-between 
        bg-neutral-900/60 backdrop-blur-xl text-white z-[9999]
        shadow-[0_10px_30px_rgba(0,0,0,0.4)]
        transition-all duration-300 ease-out
        ${showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <h1
          onClick={() => {
            if (location.pathname === "/") {
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" });
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
              ${
                location.pathname === "/profile"
                  ? "bg-violet-500"
                  : "bg-white/10 hover:bg-white/20"
              }`}
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/*  NAVBAR BAWAH */}
      {location.pathname === "/" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-800/80 backdrop-blur-xl px-3 py-2 rounded-full flex gap-2 text-gray-300 shadow-xl items-center z-[9999]">
          {["about", "service", "template", "developer", "contact"].map((item) => (
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
