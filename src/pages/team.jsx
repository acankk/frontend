import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TeamCard from "@/components/team/TeamCard";

import { getTeams } from "@/services/team.service";

export default function team() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/team/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white px-6 md:px-16 py-20">

      {/* TITLE */}
      <div className="text-center mb-16">

        <h1 className="text-5xl md:text-6xl font-bold tracking-widest">
          OUR TEAM
        </h1>

        <p className="text-white/50 mt-4 text-lg">
          Meet the teams behind INOVARE
        </p>

      </div>

      {/* TEAM LIST */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 pb-32">

        {teams.length === 0 ? (
          <p className="text-white/50 text-lg">
            Belum ada team.
          </p>
        ) : (
          teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onView={handleView}
            />
          ))
        )}

      </div>

    </div>
  );
}