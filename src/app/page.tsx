"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollCanvas from "@/components/ScrollCanvas";
import ContentOverlay from "@/components/ContentOverlay";
import { CometCard } from "@/components/ui/comet-card";
import AnimatedButton from "@/components/ui/animated-button";
import UiverseButton from "@/components/ui/UiverseButton";
import { Instagram, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <Image src="/cowrd.png" alt="Vibester Nation Crowd" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#020202]/50 to-[#020202] z-10" />
        </motion.div>
      </div>

      {/* THE 600VH SCROLL AREA - Tracks the animation progress */}
      <div ref={containerRef} className="h-[600vh] w-full relative z-10">
        <ContentOverlay scrollYProgress={scrollYProgress} />
      </div>

      {/* SCROLLING CONTENT - Rolls up over the fixed background sequence */}
      <div className="relative z-20 pt-8">
        <ServicesSection />
        <EventPicsSection />

        {/* FINAL CTA DASHBOARD */}
        <footer className="relative z-20 flex flex-col items-center justify-center py-32">
          <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4">
            <h2 className="text-5xl md:text-8xl font-heading font-extrabold uppercase mb-12 text-white mix-blend-difference text-center">
              Book Vibester Nation
            </h2>

            <div className="flex flex-col md:flex-row gap-6 mb-16">
              <UiverseButton
                text="+91 88844 87221"
                icon={<Phone size={24} />}
                href="tel:+918884487221"
                variant="primary"
              />
              <UiverseButton
                text="@vibester_nation"
                icon={<Instagram size={24} />}
                href="https://instagram.com/vibester_nation"
                variant="secondary"
              />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ServicesSection() {
  const CorporateIcon = ({ size }: { size?: number }) => (
    <i className="fi fi-rs-building text-white" style={{ fontSize: size }} />
  );

  const WeddingIcon = ({ size }: { size?: number }) => (
    <i className="fi fi-bs-ring-diamond text-white" style={{ fontSize: size }} />
  );

  const CelebrationIcon = ({ size }: { size?: number }) => (
    <i className="fi fi-br-party-horn text-white" style={{ fontSize: size }} />
  );

  const CollegeIcon = ({ size }: { size?: number }) => (
    <i className="fi fi-rr-student text-white" style={{ fontSize: size }} />
  );

  const ClubIcon = ({ size }: { size?: number }) => (
    <i className="fi fi-rs-disco-ball text-white" style={{ fontSize: size }} />
  );

  const LiveDJIcon = ({ size }: { size?: number }) => (
    <i className="fi fi-br-album text-white" style={{ fontSize: size }} />
  );

  const services = [
    { title: "Celebration", icon: CelebrationIcon, href: "/celebration" },
    { title: "Weddings", icon: WeddingIcon, href: "/wedding" },
    { title: "Corporate", icon: CorporateIcon, href: "/corporate" },
    { title: "College & School", icon: CollegeIcon, href: "/college-schools" },
    { title: "Club & Night Life", icon: ClubIcon, href: "/club-nightlife" },
    { title: "Live DJ Performance", icon: LiveDJIcon, href: "/live-dj" },
  ];

  return (
    <section className="relative z-20 py-24 md:py-32 px-4 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase tracking-tight mb-16 flex flex-wrap justify-center items-center gap-3 drop-shadow-md">
          <span className="bg-white text-black px-6 pt-2 pb-1 rounded-full">Signature</span>
          <span className="text-white">Experiences</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
          {services.map((svc, i) => (
            <Link href={svc.href} key={i} className="group flex-shrink-0">
              <div className="transition-transform duration-300 group-hover:animate-hover-x">
                <AnimatedButton text={svc.title} icon={<svc.icon size={24} />} />
              </div>
            </Link>
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
    <section className="relative z-20 py-24 md:py-32 overflow-hidden flex flex-col items-center">
      <div className="flex flex-col items-center mb-16 px-4">
        <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase tracking-tight mb-4 flex flex-wrap justify-center items-center gap-3 drop-shadow-md">
          <span className="bg-white text-black px-6 pt-2 pb-1 rounded-full">Event</span>
          <span className="text-white">Pics</span>
        </h2>
        <p className="text-gray-400 font-sans tracking-widest text-sm uppercase text-center max-w-xl flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-2">
          <span>Captured moments of</span>
          <span className="bg-white text-black px-3 py-1 rounded-full font-bold">pure energy</span>
          <span>and connection. The vibe lives on.</span>
        </p>
      </div>

      {/* Marquee Container */}
      <div className="w-full relative py-8 group/marquee overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] ease-linear">
          {duplicatedPics.map((pic, i) => (
            <CometCard key={i} className="shrink-0 mx-2 md:mx-4">
              <button
                type="button"
                className="my-5 flex w-[300px] md:w-[400px] cursor-pointer flex-col items-stretch rounded-[16px] border border-white/5 bg-[#1F2121]/80 backdrop-blur-md p-2 saturate-0 hover:saturate-100 hover:border-white/20 transition-all duration-300 md:my-8 md:p-4 group/btn"
                aria-label={`View moment ${i}`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "none",
                  opacity: 1,
                }}
              >
                <div className="mx-2 flex-1 relative" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
                  <div className="relative mt-2 aspect-[3/4] w-full shadow-2xl">
                    {pic.img ? (
                      <Image
                        loading="lazy"
                        className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75 group-hover/btn:contrast-100 transition-all duration-500"
                        alt={pic.alt}
                        src={pic.img}
                        fill
                        sizes="(max-width: 768px) 300px, 400px"
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.5) 0px 10px 20px 0px",
                          opacity: 1,
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 p-6 text-center border-2 border-dashed border-gray-800 rounded-[16px] m-2">
                        <span className="text-sm font-sans tracking-widest uppercase mb-2 text-gray-500">Image Placeholder</span>
                      </div>
                    )}
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover/btn:opacity-40 transition-opacity duration-500 rounded-[16px]" />
                  </div>
                </div>
                <div className="mt-4 flex flex-shrink-0 items-center justify-between p-2 md:p-4 text-white" style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}>
                  <div className="text-xs font-sans tracking-widest uppercase font-bold drop-shadow-md">Vibester Nation</div>
                  <div className="text-xs font-sans tracking-widest text-[#00f2ff] opacity-80 uppercase drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">#MOMENTS</div>
                </div>
              </button>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
}
