"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

export default function ContentOverlay({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
    const { scrollYProgress: defaultScrollY } = useScroll();
    const progress = scrollYProgress || defaultScrollY;

    // Beat A: Logo Fade
    const opacityA = useTransform(progress, [0, 0.05, 0.1, 1], [1, 1, 0, 0]);
    const yA = useTransform(progress, [0, 0.1], [0, -50]);

    // Beat B: 25-45%
    const opacityB = useTransform(progress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
    const xB = useTransform(progress, [0.2, 0.25], [-50, 0]);

    // Beat C: 50-70%
    const opacityC = useTransform(progress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
    const xC = useTransform(progress, [0.45, 0.5], [50, 0]);

    // Beat D: 75-90%
    const opacityD = useTransform(progress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
    const xD = useTransform(progress, [0.7, 0.75], [-50, 0]);

    // The Echo: 92-100%
    const opacityE = useTransform(progress, [0.9, 0.92, 0.94, 0.97], [0, 1, 1, 0]);
    const scaleE = useTransform(progress, [0.9, 0.92], [0.9, 1]);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center">
            {/* Beat A: THE SILENCE */}
            <motion.div
                style={{ opacity: opacityA, y: yA }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <div className="w-[90vw] md:w-[80vw] max-w-[1200px] aspect-[3/1] relative mb-8 drop-shadow-2xl">
                    <Image src="/logo.png" alt="Vibester Nation Logo" fill className="object-contain" priority />
                </div>
            </motion.div>

            {/* Beat B: THE VIBE */}
            <motion.div
                style={{ opacity: opacityB, x: xB }}
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
            >
                <div className="max-w-2xl text-left">
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 font-heading text-transparent bg-clip-text bg-gradient-to-b from-[#00f2ff] via-[#d100ff] to-[#ff00a0] uppercase tracking-tight">
                        Global Sound Fusion
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-sans tracking-wide leading-relaxed">
                        Blending electronic energy with regional hits. Specializing in Afro House and Techno.
                    </p>
                </div>
            </motion.div>

            {/* Beat C: THE REACH */}
            <motion.div
                style={{ opacity: opacityC, x: xC }}
                className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-24 text-right"
            >
                <div className="max-w-2xl">
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 font-heading text-transparent bg-clip-text bg-gradient-to-b from-[#00f2ff] via-[#d100ff] to-[#ff00a0] uppercase tracking-tight">
                        Uniting Cultures
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-sans tracking-wide leading-relaxed mb-4">
                        Rhythm without borders. Fusing global sounds:
                    </p>
                    <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
                        {["Afro House", "Techno", "EDM", "Bollywood", "South Indian", "Arabic", "Latin", "Commercial"].map((genre) => (
                            <span key={genre} className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full font-sans tracking-widest text-sm uppercase whitespace-nowrap">
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Beat D: THE IMPACT */}
            <motion.div
                style={{ opacity: opacityD, x: xD }}
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
            >
                <div className="max-w-2xl text-left">
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 font-heading text-transparent bg-clip-text bg-gradient-to-b from-[#00f2ff] via-[#d100ff] to-[#ff00a0] uppercase tracking-tight">
                        Igniting Crowds
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-sans tracking-wide leading-relaxed">
                        Building the perfect mood with crafted sets ranging from warm-up grooves to high-energy peak-hour drops.
                    </p>
                </div>
            </motion.div>

            {/* THE ECHO */}
            <motion.div
                style={{ opacity: opacityE, scale: scaleE }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
                <blockquote className="max-w-4xl">
                    <p className="text-3xl md:text-5xl italic font-heading font-light leading-snug mb-8 text-white">
                        "More than just music—it's an unforgettable cultural fusion and high-energy connection."
                    </p>
                    <footer className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#d100ff] font-bold tracking-widest uppercase">
                        — The Core Philosophy
                    </footer>
                </blockquote>
            </motion.div>
        </div>
    );
}
