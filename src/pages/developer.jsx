import { Github, Instagram, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const devs = [
  {
    id: 1,
    name: "Miskron Aljahidin",
    role: "Fullstack Developer",
    desc: "Building modern web apps with React, FastAPI, and Supabase.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=dev1",
  },
  {
    id: 2,
    name: "Miskron Aljahidin",
    role: "UI / UX Designer",
    desc: "Designing clean, user-friendly and modern digital interfaces.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=dev2",
  },
  {
    id: 3,
    name: "Miskron Aljahidin",
    role: "Backend Engineer",
    desc: "Handling API, database, and system architecture.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=dev3",
  },
  {
    id: 4,
    name: "Miskron Aljahidin",
    role: "Project Manager",
    desc: "Ensuring project runs smoothly and on schedule.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=dev4",
  },
];

export default function Developer() {
  return (
    <div className="w-full bg-black text-white py-24 px-6 md:px-16">

      {/* TITLE */}
      <div className="text-center mb-28">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
          DEVELOPER
        </h1>
        <p className="text-white/50 mt-3">
          Meet the people behind INOVARE
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
        {devs.map((d) => (
          <div key={d.id} className="relative flex justify-center">

            {/* AVATAR */}
            <div
              className="absolute -top-14 w-28 h-28 rounded-full overflow-hidden 
              bg-neutral-900 border border-white/15 shadow-2xl z-10 
              ring-2 ring-violet-500/40"
            >
              <img
                src={d.avatar}
                alt={d.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CARD */}
            <Card
              className="w-full mt-20 
              bg-neutral-900/90
              border border-white/10 rounded-3xl
              shadow-2xl backdrop-blur-xl
              transition-all duration-300
              hover:scale-[1.04] hover:border-violet-500/40"
            >
              <CardContent className="pt-32 pb-14 px-6 text-center">

                <h3 className="text-xl font-semibold tracking-wide text-violet-400">
                  {d.name}
                </h3>

                <p className="text-violet-400 text-sm mb-3">{d.role}</p>

                <p className="text-white/70 text-sm mb-8 leading-relaxed">
                  {d.desc}
                </p>

                <div className="flex justify-center gap-4">
                  <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-violet-500/20 transition">
                    <Github size={18} />
                  </a>
                  <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-violet-500/20 transition">
                    <Instagram size={18} />
                  </a>
                  <a className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-violet-500/20 transition">
                    <Linkedin size={18} />
                  </a>
                </div>

              </CardContent>
            </Card>

          </div>
        ))}
      </div>
    </div>
  );
}
