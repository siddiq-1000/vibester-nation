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
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

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

        <Globe3DDemo />

        {/* FINAL CTA DASHBOARD */}
        <footer className="relative z-20 flex flex-col items-center justify-center py-20 md:py-32">
          <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-heading font-extrabold uppercase mb-8 md:mb-12 text-white mix-blend-difference text-center">
              Book Experiences
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16">
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
  ];

  return (
    <section className="relative z-20 py-16 md:py-32 px-4 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold uppercase tracking-tight mb-10 md:mb-16 flex flex-wrap justify-center items-center gap-2 md:gap-3 drop-shadow-md text-center">
          <span className="bg-white text-black px-4 md:px-6 pt-2 pb-1 rounded-full">Signature</span>
          <span className="text-white">Experiences</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-4xl">
          {services.map((svc, i) => (
            <Link
              href={svc.href}
              key={i}
              className="group flex-shrink-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="transition-transform duration-300 group-hover:animate-hover-x">
                <AnimatedButton text={svc.title} icon={<svc.icon size={20} />} />
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
    <section className="relative z-20 py-16 md:py-32 overflow-hidden flex flex-col items-center">
      <div className="flex flex-col items-center mb-10 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold uppercase tracking-tight mb-4 flex flex-wrap justify-center items-center gap-2 md:gap-3 drop-shadow-md text-center">
          <span className="bg-white text-black px-4 md:px-6 pt-2 pb-1 rounded-full">Event</span>
          <span className="text-white">Pics</span>
        </h2>
        <p className="text-gray-400 font-sans tracking-widest text-xs sm:text-sm uppercase text-center max-w-xl flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mt-2">
          <span>Captured moments of</span>
          <span className="bg-white text-black px-3 py-1 rounded-full font-bold">pure energy</span>
          <span>and connection. The vibe lives on.</span>
        </p>
      </div>

      {/* Marquee Container */}
      <div className="w-full relative py-4 group/marquee overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] ease-linear">
          {duplicatedPics.map((pic, i) => (
            <CometCard key={i} className="shrink-0 mx-2 md:mx-4">
              <button
                type="button"
                className="my-2 md:my-5 flex w-[260px] sm:w-[300px] md:w-[400px] cursor-pointer flex-col items-stretch rounded-[16px] border border-white/5 bg-[#1F2121]/80 backdrop-blur-md p-2 saturate-0 hover:saturate-100 hover:border-white/20 transition-all duration-300 md:p-4 group/btn"
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
                        sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, 400px"
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
                  <div className="text-[10px] sm:text-xs font-sans tracking-widest uppercase font-bold drop-shadow-md">Vibester Nation</div>
                  <div className="text-[10px] sm:text-xs font-sans tracking-widest text-[#00f2ff] opacity-80 uppercase drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">#MOMENTS</div>
                </div>
              </button>
            </CometCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const sampleMarkers: GlobeMarker[] = [
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },
  { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/7.webp", label: "Moscow" },
  { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio de Janeiro" },
  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },
  { lat: -34.6037, lng: -58.3816, src: "https://assets.aceternity.com/avatars/11.webp", label: "Buenos Aires" },
  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },
  { lat: 37.5665, lng: 126.978, src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul" },
  { lat: 12.9716, lng: 77.5946, src: "https://assets.aceternity.com/avatars/14.webp", label: "Bangalore" },
];

function Globe3DDemo() {
  return (
    <section className="relative z-20 py-16 md:py-32 w-full flex flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center mb-4 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-bold uppercase tracking-tight flex flex-wrap justify-center items-center gap-2 md:gap-3 drop-shadow-md text-center">
          <span className="bg-white text-black px-4 md:px-6 pt-2 pb-1 rounded-full">Global</span>
          <span className="text-white">Reach</span>
        </h2>
      </div>
      <Globe3D
        markers={sampleMarkers}
        config={{
          atmosphereColor: "#ffffff",
          atmosphereIntensity: 20,
          bumpScale: 5,
          autoRotateSpeed: 0.3,
        }}
        onMarkerClick={(marker) => {
          console.log("Clicked marker:", marker.label);
        }}
        onMarkerHover={(marker) => {
          if (marker) {
            console.log("Hovering:", marker.label);
          }
        }}
      />
    </section>
  );
}

