"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LogoHero() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div className="relative w-full h-[100vh] flex flex-col items-center justify-center text-center px-4 bg-[#020202] z-30">
            <button
                onClick={() => setIsVideoOpen(true)}
                className="group w-[85vw] sm:w-[80vw] md:w-[60vw] max-w-[1000px] aspect-[2/1] relative mb-8 drop-shadow-2xl pointer-events-auto cursor-pointer overflow-hidden rounded-3xl"
                aria-label="Play Intro Video"
            >
                <Image src="/logo.png" alt="Vibester Nation Logo" fill className="object-contain transition-transform duration-700 ease-out group-hover:scale-110" priority />
            </button>

            {/* Click to Play and Scroll Down Container */}
            <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 sm:gap-6 pointer-events-none">
                {/* Blinking Click to Play */}
                <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="text-white text-base sm:text-lg font-[family-name:var(--font-anton)] uppercase tracking-widest drop-shadow-lg"
                >
                    Click to Play
                </motion.span>

                {/* Scroll Down Animation */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-white/60 text-xs sm:text-sm font-sans tracking-[0.3em] uppercase">Scroll Down</span>
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-1 h-2 sm:w-1.5 sm:h-2.5 bg-white/80 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center overflow-hidden px-4 sm:px-8 pointer-events-auto"
                    >
                        <video
                            src="/intro-video.mp4"
                            autoPlay
                            muted
                            playsInline
                            onEnded={() => setIsVideoOpen(false)}
                            className="w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-4xl max-h-[85vh] object-contain mix-blend-screen"
                        >
                            Your browser does not support the video tag.
                        </video>
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 text-white p-2 text-xl font-bold cursor-pointer"
                            aria-label="Close intro video"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
