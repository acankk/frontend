import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const menus = [
  {
    title: "Products",
    path: "/admin/products",
  },
  {
    title: "Service",
    path: "/admin/service",
  },
  {
    title: "Team",
    path: "/admin/team",
  },
  {
    title: "Members",
    path: "/admin/members",
  },
  {
    title: "Portfolio",
    path: "/admin/portfolio",
  },
];

export default function AdminSidebar({
  active,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Yakin ingin logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };

  return (
    <aside className="w-64 bg-neutral-900 border-r border-white/10 p-6 flex flex-col">

      <div>

        <h2 className="text-2xl font-bold mb-10">
          ADMIN PANEL
        </h2>

        <div className="space-y-3">

          {menus.map((menu) => (

            <button
              key={menu.path}
              onClick={() => navigate(menu.path)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                active === menu.title
                  ? "bg-violet-500 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {menu.title}
            </button>

          ))}

        </div>

      </div>

      <Button
        variant="destructive"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2"
      >
        <LogOut size={18} />
        Logout
      </Button>

    </aside>
  );
}