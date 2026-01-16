import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <Navbar />

      <div className="min-h-screen px-6 md:px-20 pt-32 flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-8 max-w-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest">
              ABOUT
            </h1>

            <p className="text-white text-lg leading-relaxed">
              At Inovare, we provide modern and customizable design templates to help you
              create professional visuals with ease. From branding materials to social media
              graphics, our templates are crafted to support various creative needs.
            </p>

            <p className="text-white text-lg leading-relaxed">
              With a user-friendly editing experience, you can personalize every detail to match
              your style and goals. Inovare is here to save your time, elevate your design quality,
              and bring your ideas to life effortlessly.
            </p>
          </div>

          {/* RIGHT IMAGES - ZIG ZAG */}
          <div className="grid grid-cols-2 gap-4 max-w-md ml-auto">

            {/* kiri atas - kecil */}
            <Card className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition">
              <CardContent className="p-0">
                <img
                  src="/no-image.png"
                  alt="about"
                  className="w-full h-36 object-cover"
                />
              </CardContent>
            </Card>

            {/* kanan atas - tinggi */}
            <Card className="row-span-2 bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition">
              <CardContent className="p-0 h-full">
                <img
                  src="/no-image.png"
                  alt="about"
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>

            {/* kiri bawah - tinggi */}
            <Card className="row-span-2 bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition">
              <CardContent className="p-0 h-full">
                <img
                  src="/no-image.png"
                  alt="about"
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>

            {/* kanan bawah - kecil */}
            <Card className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition">
              <CardContent className="p-0">
                <img
                  src="/no-image.png"
                  alt="about"
                  className="w-full h-36 object-cover"
                />
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
