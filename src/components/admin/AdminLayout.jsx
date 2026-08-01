import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  active,
  children,
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">

      <AdminSidebar active={active} />

      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}