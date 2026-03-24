"use client";

import { useState } from 'react';
import { Instagram, User, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden flex flex-col">
      {/* Header Navigation */}
      <header className="fixed top-0 w-full z-50 px-12 py-8 flex items-center justify-between pointer-events-none">
        {/* Top Left: Artist Name & Go Back */}
        <div className="flex-1 flex items-center gap-6 pointer-events-auto">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            Back
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <Link href="/">
            <h2 className="text-xl font-serif italic tracking-tight text-white/90 hover:text-emerald-400 transition-colors cursor-pointer">
              Pranav Ondan
            </h2>
          </Link>
        </div>

        <nav className="flex justify-center gap-8 text-[10px] tracking-[0.3em] font-medium uppercase opacity-80 hover:opacity-100 transition-opacity pointer-events-auto">
          <Link href="/music" className="hover:text-emerald-400 transition-colors">Music</Link>
          <Link href="/tour" className="hover:text-emerald-400 transition-colors">Tour</Link>
        </nav>

        {/* Right side spacer to balance header */}
        <div className="flex-1" />
      </header>

      {/* Main Content */}
      <main className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Image / Artist Image */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="aboutmee.png" 
              alt="Artist" 
              className="w-full h-full object-cover opacity-70 brightness-110 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Radial Gradient Overlay for Spotlight Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,40,20,0.2)_0%,black_80%)]" />
          </div>
        </div>

        {/* Extended About Me Text & Branding */}
        <div className="absolute left-1/4 top-1/3 z-10 hidden md:block opacity-10 pointer-events-none">
          <h1 className="text-9xl font-sans font-black tracking-tighter uppercase leading-none mix-blend-overlay">
            THE<br />VIBE<br />CITY
          </h1>
        </div>

        {/* Right Side Description */}
        <div className="absolute right-12 z-20 flex flex-col items-end gap-5 max-w-[280px]">
          <div className="h-px w-16 bg-emerald-500/60 mb-2" />
          <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-emerald-400/80">Sonic Architect</h3>
          <p className="text-[10px] leading-relaxed tracking-widest text-right opacity-70 font-light">
            Crafting sonic landscapes from the heart of the Garden City. A fusion of tech-forward beats and organic textures inspired by the streets of Bengaluru.
          </p>
          <p className="text-[10px] leading-relaxed tracking-widest text-right opacity-70 font-light mt-1">
            Redefining the underground frequency, blending heavy basslines with ethereal melodies to create an unforgettable, immersive club experience.
          </p>
          <div className="flex gap-4 mt-2">
            <span className="text-[9px] border border-white/20 px-3 py-1 rounded-full text-white/60">TECHNO</span>
            <span className="text-[9px] border border-white/20 px-3 py-1 rounded-full text-white/60">HOUSE</span>
          </div>
          <span className="text-[7px] tracking-[0.4em] uppercase text-emerald-400/30 mt-8 [writing-mode:vertical-rl] rotate-180 font-medium">
            Bengaluru — The Vibe City
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 px-12 py-10 flex items-center justify-between pointer-events-none">
        {/* Logo Left */}
        <div className="flex-1">
          <span className="text-[8px] tracking-[0.5em] uppercase opacity-40 font-mono">
            Bengaluru
          </span>
        </div>

        {/* Social Icons & Action Center (One Line) */}
        <div className="flex-1 flex justify-center items-center gap-8 animate-beep pointer-events-auto">
          <ArrowRight size={12} className="text-white" />
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] tracking-[0.5em] uppercase hover:text-emerald-400 transition-colors duration-500 font-bold text-white whitespace-nowrap cursor-pointer"
            >
              Book for Experience 
            </button>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-6">
              <a href="#" className="hover:opacity-100 cursor-pointer transition-opacity text-white hover:text-white">
                <User size={14} />
              </a>
              <a href="https://instagram.com/vibester_nation" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 cursor-pointer transition-opacity text-white hover:text-white">
                <Instagram size={14} />
              </a>
            </div>
          </div>
          <ArrowLeft size={12} className="text-white" />
        </div>

        {/* Logo Right */}
        <img src="/logo.png" className="w-16 absolute top-2 right-20 pointer-events-none" />
      </footer>

      {/* Registration Modal (Cloud/Blur Animation) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg"
          >
            {/* Atmospheric pseudo-clouds overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 3, delay: 0.5 }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549298240-0d8e60513026?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen pointer-events-none" 
            />
            
            <div className="relative z-10 p-10 max-w-[400px] w-full flex flex-col items-center border border-white/5 bg-[#050505]/95 shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)] overflow-hidden">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2"
              >
                <X size={16} />
              </button>

              <h2 className="text-3xl font-serif italic tracking-tight text-white mb-2 text-center mt-2">
                The Next Frequency
              </h2>
              <p className="text-[9px] uppercase tracking-[0.4em] font-mono text-emerald-400/80 mb-10 text-center">
                Secure your presence
              </p>
              
              <div className="w-full flex flex-col gap-6 mb-10">
                <input 
                  type="text" 
                  placeholder="NAME" 
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-[10px] tracking-widest text-center focus:outline-none focus:border-emerald-500 text-white transition-colors placeholder:text-white/30"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-[10px] tracking-widest text-center focus:outline-none focus:border-emerald-500 text-white transition-colors placeholder:text-white/30"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white hover:bg-emerald-400 text-black text-[11px] tracking-[0.5em] uppercase font-bold transition-colors duration-500"
                onClick={() => setIsModalOpen(false)}
              >
                Sign
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
