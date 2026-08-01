import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TeamCard({
  team,
  onView,
}) {
  return (
    <div className="relative flex justify-center">

      <Card
        className="
          w-full
          mt-20
          bg-neutral-900/90
          border border-white/10
          rounded-3xl
          shadow-2xl
          backdrop-blur-xl
          transition-all duration-300
          hover:scale-[1.04]
          hover:border-violet-500/40
        "
      >
        <CardContent className="pt-24 pb-10 px-6 h-[480px] flex flex-col justify-between text-center">

          <div>

            <h3 className="text-4xl font-bold tracking-wide text-white">
              {team.nama}
            </h3>

            <p className="text-white/60 text-base mt-3">
              {team.member_count} Members
            </p>

            <p className="text-white/70 text-base mt-10 leading-relaxed">
              {team.deskripsi}
            </p>

          </div>

          <Button
            onClick={() => onView(team.id)}
            className="
              w-full
              rounded-full
              bg-violet-600
              hover:bg-violet-500
              text-white
            "
          >
            View Team
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}