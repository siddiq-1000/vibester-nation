"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollCanvas from "@/components/ScrollCanvas";
import ContentOverlay from "@/components/ContentOverlay";
import { Instagram, Phone, Disc, GlassWater, Briefcase, Heart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // Prevent browser extensions (e.g. Avast bis_skin_checked) from causing hydration errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="bg-[#020202] min-h-screen relative selection:bg-white/20" />;
  }

  return <InnerHome />;
}

function InnerHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fades the crowd in during the final 15% of the canvas build sequence
  const crowdOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <main className="bg-[#020202] min-h-screen relative selection:bg-white/20">

      {/* FIXED BACKGROUND SEQUENCE - stays permanently stuck in the viewport */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <ScrollCanvas onLoadProgress={() => { }} scrollYProgress={scrollYProgress} />

        {/* NEW CROWD BACKGROUND - fades in exactly as the sequence ends */}
        <motion.div
          style={{ opacity: crowdOpacity }}
          className="absolute inset-0 z-10"
        >
          <Image src="/crowd.jpg" alt="Vibester Nation Crowd" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#020202]/50 to-[#020202] z-10" />
        </motion.div>
      </div>

      {/* THE 600VH SCROLL AREA - Tracks the animation progress */}
      <div ref={containerRef} className="h-[600vh] w-full relative z-10">
        <ContentOverlay scrollYProgress={scrollYProgress} />
      </div>

      {/* SCROLLING CONTENT - Rolls up over the fixed background sequence */}
      <div className="relative z-20 bg-transparent md:bg-[#020202]/30 backdrop-blur-2xl shadow-[0_-30px_60px_rgba(0,0,0,0.8)] border-t border-white/5 pt-8">
        <ServicesSection />
        <EventPicsSection />

        {/* FINAL CTA DASHBOARD */}
        <footer className="relative z-20 flex flex-col items-center justify-center bg-transparent py-32 border-t border-white/5">
          <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4">
            <h2 className="text-5xl md:text-8xl font-heading font-extrabold uppercase mb-12 text-transparent bg-clip-text bg-gradient-to-b from-[#00f2ff] via-[#d100ff] to-[#ff00a0] text-center">
              Book Vibester Nation
            </h2>

            <div className="flex flex-col md:flex-row gap-6 mb-16">
              <a href="tel:+918884487221" className="px-8 py-4 bg-gradient-to-r from-[#00f2ff] to-[#d100ff] text-white font-bold text-lg tracking-widest uppercase hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-3">
                <Phone size={24} />
                +91 88844 87221
              </a>
              <a href="https://instagram.com/vibester_nation" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-[#d100ff] text-[#d100ff] font-bold text-lg tracking-widest uppercase hover:bg-[#d100ff] hover:text-white transition-colors duration-300 flex items-center justify-center gap-3">
                <Instagram size={24} />
                @vibester_nation
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ServicesSection() {
  const services = [
    { title: "Live DJ Performances", desc: "Tailored sets ranging from warm-up grooves to peak-hour drops.", icon: Disc },
    { title: "Club & Nightlife", desc: "Resident and guest DJ services for clubs, lounges, and private nightlife venues.", icon: GlassWater },
    { title: "Corporate & College", desc: "High-energy sets for brand events, conferences, and college festivals.", icon: Briefcase },
    { title: "Weddings & Celebrations", desc: "Customized, seamless and memorable playlists for your special day.", icon: Heart },
  ];

  return (
    <section className="relative z-20 bg-transparent py-24 md:py-32 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#00f2ff] via-[#d100ff] to-[#ff00a0] uppercase tracking-tight mb-16 text-center">
          Services Offered
        </h2>

        <div className="flex flex-col gap-4">
          {services.map((svc, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group cursor-pointer rounded-xl"
            >
              <div className="flex items-start md:items-center mb-4 md:mb-0 max-w-2xl gap-6">
                <div className="p-4 rounded-full bg-white/5 text-[#00f2ff] group-hover:text-[#d100ff] transition-colors duration-300">
                  <svc.icon size={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl md:text-4xl font-heading font-extrabold text-white tracking-widest uppercase mb-2">
                    {svc.title}
                  </span>
                  <span className="text-xl text-gray-400 font-sans tracking-wide leading-relaxed">
                    {svc.desc}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-start w-full md:w-auto mt-4 md:mt-0 pl-20 md:pl-0">
                <button className="text-[#d100ff] uppercase tracking-widest font-bold text-sm border-b border-[#d100ff] pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventPicsSection() {
  // Add placeholder image paths here.
  const eventPics = [
    { img: "/event/event-1.jpg", alt: "Vibester Nation Performance 1" },
    { img: "/event/event-2.jpg", alt: "Vibester Nation Performance 2" },
    { img: "/event/event-3.jpg", alt: "Vibester Nation Performance 3" },
    { img: "/event/event-4.jpg", alt: "Vibester Nation Performance 4" },
    { img: "/event/event-5.jpg", alt: "Vibester Nation Performance 5" },
  ];

  // Duplicate to allow seamless marquee looping
  const duplicatedPics = [...eventPics, ...eventPics];

  return (
    <section className="relative z-20 bg-transparent py-24 md:py-32 border-t border-white/5 overflow-hidden flex flex-col items-center">
      <div className="flex flex-col items-center mb-16 px-4">
        <h2 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#00f2ff] via-[#d100ff] to-[#ff00a0] uppercase tracking-tight text-center mb-4">
          Event Pics
        </h2>
        <p className="text-gray-400 font-sans tracking-widest text-sm uppercase text-center max-w-xl">
          Captured moments of pure <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#d100ff] font-bold">energy and connection</span>. The vibe lives on.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="w-full relative py-8 group/marquee">
        <div className="flex w-[200%] md:w-[150%] animate-marquee hover:[animation-play-state:paused] ease-linear">
          {duplicatedPics.map((pic, i) => (
            <div
              key={i}
              className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] shrink-0 mx-4 rounded-xl overflow-hidden bg-gray-900 border border-white/5 group object-cover"
            >
              {pic.img ? (
                <Image
                  src={pic.img}
                  alt={pic.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 p-6 text-center border-2 border-dashed border-gray-800 rounded-xl m-2">
                  <span className="text-sm font-sans tracking-widest uppercase mb-2 text-gray-500">
                    Image Placeholder
                  </span>
                  <span className="text-xs font-sans opacity-40">
                    {pic.alt}
                  </span>
                </div>
              )}
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
