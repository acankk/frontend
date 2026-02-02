import { useEffect, useState } from "react";
import api from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

export default function Service() {
  const [services, setServices] = useState([]); // ⬅️ array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(ENDPOINTS.JASA)
      .then((res) => {
        const jasa = res.data?.data;
        setServices(Array.isArray(jasa) ? jasa : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal ambil data service dari backend");
        setServices([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-32">
      <h1 className="text-center text-5xl font-extrabold tracking-widest">
        SERVICE
      </h1>

      {loading && (
        <p className="text-center mt-10 text-gray-400">
          Loading service...
        </p>
      )}

      {error && (
        <p className="text-center mt-10 text-red-400">{error}</p>
      )}

      {!loading && services.length === 0 && !error && (
        <p className="text-center mt-10 text-gray-400">
          Service belum tersedia
        </p>
      )}

      <div className="mt-16 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {services.map((item) => (
            <div
              key={item.id}
              className="w-[320px] h-[550px] rounded-3xl bg-[#3b3b3b] p-8 flex flex-col justify-end"
            >
              <h2 className="text-2xl font-bold capitalize">
                {item.tier}
              </h2>
              <p className="text-gray-300 mt-3 text-sm">
                {item.description}
              </p>
              <p className="mt-4 text-lg font-semibold text-purple-400">
                Rp {Number(item.price).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
