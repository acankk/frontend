import { useState } from "react";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const to = "inovare@gmail.com";
    const subject = `Contact from ${name || "Visitor"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      <Navbar />

      <div className="h-[calc(100vh-80px)] px-6 md:px-20 flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-10">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest mb-6">
                CONTACT US
              </h1>
              <h2 className="text-3xl font-bold mb-3">Get in touch</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Ready to help provide the best solutions for your needs,
                contact us now!
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="grid grid-cols-2 gap-8 text-lg">
              <div>
                <p className="font-semibold mb-1">Office</p>
                <p className="text-gray-400">
                  Jl. ringroad barat <br /> UNU Yogyakarta
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">WhatsApp</p>
                <p className="text-gray-400">
                  08xxxxxxxxxx <br /> 08xxxxxxxxxx
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Follow Us</p>
                <div className="flex gap-5 mt-3">
                  <a
                    href="https://wa.me/6282299167585"
                    target="_blank"
                    className="p-2 rounded-full bg-neutral-800 hover:bg-green-600 transition"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </a>

                  <a
                    href="https://instagram.com/innovare.team"
                    target="_blank"
                    className="p-2 rounded-full bg-neutral-800 hover:bg-pink-600 transition"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>

                  <a
                    href="https://facebook.com/Miskron_AL"
                    target="_blank"
                    className="p-2 rounded-full bg-neutral-800 hover:bg-blue-600 transition"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-1">Email Address</p>
                <p className="text-gray-400">inovare@gmail.com</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <Card className="bg-neutral-900/80 border border-white/10 rounded-3xl shadow-2xl">
            <CardContent className="p-8 space-y-6">

              {/* CHAT */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="bg-violet-600/40 px-5 py-3 rounded-2xl max-w-sm text-white">
                  Halo customer, ada yang bisa kami bantu
                </div>
              </div>

              <div className="flex gap-3 items-start justify-end">
                <div className="bg-neutral-800 px-5 py-3 rounded-2xl max-w-sm text-white">
                  Halo kak, saya mau pakai template ini. Mohon dibantu
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20" />
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="bg-violet-600/40 px-5 py-3 rounded-2xl max-w-sm text-white">
                  Okeee, akan kami bantu dengan senang hati.
                </div>
              </div>

              <Separator className="bg-white/10 my-2" />

              {/* FORM */}
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-neutral-800 border-white/10 text-white placeholder:text-gray-400"
                />
                <Input
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-800 border-white/10 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Your message..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-neutral-800 border-white/10 text-white placeholder:text-gray-400 resize-none"
                />
                <Button
                  onClick={handleSend}
                  className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl text-lg"
                >
                  Send Message
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
