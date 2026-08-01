import Navbar from "@/components/navbar";
import aboutImage from "@/assets/about.jpg";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <Navbar />

      <section className="min-h-screen px-6 md:px-20 pt-32">
        <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] grid md:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
          {/* LEFT */}
          <div className="max-w-xl space-y-8 -translate-y-18">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest">
              ABOUT
            </h1>

            <p className="text-lg leading-9 text-gray-300">
              At Inovare, we provide modern and customizable design templates
              to help you create professional visuals with ease. From branding
              materials to social media graphics, our templates are crafted to
              support various creative needs.
            </p>

            <p className="text-lg leading-9 text-gray-300">
              With a user-friendly editing experience, you can personalize every
              detail to match your style and goals. Inovare is here to save your
              time, elevate your design quality, and bring your ideas to life
              effortlessly.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-center -translate-x-1">
            <img
              src={aboutImage}
              alt="About"
              className="
                w-full
                max-w-lg
                h-[650px]
                object-cover
                rounded-3xl
                -translate-y-17
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            />
          </div>

        </div>
      </section>
    </div>
  );
}