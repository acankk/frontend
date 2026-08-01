import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Github,
  Instagram,
  Linkedin,
  ArrowLeft,
} from "lucide-react";

import { getTeamDetail } from "@/services/team.service";
import { getMembers } from "@/services/member.service";
import { getImageUrl } from "@/utils/image";

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [teamData, memberData] = await Promise.all([
        getTeamDetail(id),
        getMembers(id),
      ]);

      setTeam(teamData);
      setMembers(memberData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Team tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-12 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <div className="text-center mb-20">

          {team.logo && (
            <img
              src={getImageUrl(team.logo)}
              alt={team.nama}
              className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-violet-500 shadow-xl"
            />
          )}

          <h1 className="text-5xl font-bold mt-8">
            {team.nama}
          </h1>

          <p className="text-white/50 mt-4 max-w-3xl mx-auto">
            {team.deskripsi}
          </p>

          <p className="mt-5 text-violet-400">
            {members.length} Members
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

          {members.length === 0 ? (

            <div className="col-span-full text-center text-white/50">
              Belum ada member.
            </div>

          ) : (

            members.map((member) => (

              <div
                key={member.id}
                className="relative flex justify-center"
              >

                <div
                  className="
                  absolute
                  -top-14
                  w-28
                  h-28
                  rounded-full
                  overflow-hidden
                  bg-neutral-900
                  border
                  border-white/15
                  shadow-2xl
                  z-10
                  ring-2
                  ring-violet-500/40
                "
                >
                  <img
                    src={getImageUrl(member.foto)}
                    alt={member.nama}
                    className="w-full h-full object-cover"
                  />
                </div>

                <Card
                  className="
                  w-full
                  mt-20
                  bg-neutral-900/90
                  border
                  border-white/10
                  rounded-3xl
                  shadow-2xl
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:scale-[1.04]
                  hover:border-violet-500/40
                "
                >
                  <CardContent className="pt-32 pb-14 px-6 text-center">

                    <h3 className="text-xl font-semibold text-violet-400">
                      {member.nama}
                    </h3>

                    <p className="text-violet-400 text-sm mb-3">
                      {member.role}
                    </p>

                    <p className="text-white/70 text-sm leading-relaxed mb-8">
                      {member.deskripsi}
                    </p>

                    <div className="flex justify-center gap-4">

                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-violet-500/20 transition"
                        >
                          <Github size={18} />
                        </a>
                      )}

                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-violet-500/20 transition"
                        >
                          <Instagram size={18} />
                        </a>
                      )}

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-violet-500/20 transition"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}

                    </div>

                  </CardContent>
                </Card>

              </div>

            ))

          )}

        </div>

      </div>
    </div>
  );
}