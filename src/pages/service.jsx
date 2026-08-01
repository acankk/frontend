import { useEffect, useState } from "react";
import { getAllJasa } from "@/services/jasa.service";


export default function Service() {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllJasa();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data service.");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const displayedServices = showAll
    ? services
    : services.slice(0, 3);

  const handleToggleServices = () => {
    if (showAll) {
      document.getElementById("service")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setShowAll((prev) => !prev);
  };

  return (
    <section
      id="service"
      className="min-h-screen bg-black pt-28 pb-32 text-white"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-widest">
          SERVICE
        </h1>

      </div>

      {loading && (
        <p className="mt-10 text-center text-gray-400">
          Loading service...
        </p>
      )}

      {error && (
        <p className="mt-10 text-center text-red-400">
          {error}
        </p>
      )}

      {!loading && displayedServices.length === 0 && !error && (
        <p className="mt-10 text-center text-gray-400">
          Service belum tersedia.
        </p>
      )}

      <div className="mt-20 flex justify-center">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((item) => (
            <div
              key={item.id}
              className="
                group
                w-[300px]
                overflow-hidden
                rounded-3xl
                bg-neutral-900/90
                border
                border-white/10
                shadow-2xl
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-violet-500/40
              "
            >
              <div className="overflow-hidden p-5 pb-0">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="h-44 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-6 pt-6 pb-7">
                <h2 className="text-2xl font-semibold text-white capitalize">
                  {item.nama}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/70">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!loading && services.length > 3 && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={handleToggleServices}
            className="rounded-full border border-violet-500 px-8 py-3 text-sm font-semibold text-violet-500 transition-all duration-300 hover:bg-violet-500 hover:text-white"
          >
            {showAll ? "Show Less" : "View All Services"}
          </button>
        </div>
      )}
    </section>
  );
}