import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import About from "./about";
import Templates from "./product";
import Contact from "./contact";
import Developer from "./developer";
import Service from "./service";

export default function Home() {
  const [params] = useSearchParams();

  // auto scroll dari navbar (scroll=about, dll)
  useEffect(() => {
    const target = params.get("scroll");
    if (target) {
      requestAnimationFrame(() => {
        const el = document.getElementById(target);
        el?.scrollIntoView({ behavior: "auto" });
      });
    }
  }, [params]);

  return (
    <div
      id="home-scroll"
      className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white pb-32"
    >
      {/* HERO */}
      <section
        id="home"
        className="min-h-screen snap-start flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-6xl font-extrabold">INOVARE</h1>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          Where Creativity Meets Simplicity; Professional Designs Crafted to Bring
          Your Ideas to Life
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen snap-start">
        <About />
      </section>

      {/* SERVICE */}
      <section id="service" className="min-h-screen snap-start">
        <Service />
      </section>

      {/* TEMPLATE */}
      <section id="template" className="min-h-screen snap-start">
        <Templates />
      </section>

      {/* DEVELOPER */}
      <section id="developer" className="min-h-screen snap-start">
        <Developer />
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen snap-start">
        <Contact />
      </section>

    </div>
  );
}
