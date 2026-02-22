"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader({ progress }: { progress: number }) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => setComplete(true), 500);
        }
    }, [progress]);

    if (complete) return null;

    return (
        <motion.div
            suppressHydrationWarning
            initial={{ opacity: 1 }}
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020202] text-white"
        >
            <div className="w-48 md:w-64 aspect-[3/1] relative mb-8">
                <Image src="/logo1.png" alt="Vibester Nation Logo" fill className="object-contain drop-shadow-2xl" priority />
            </div>
            <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#00f2ff] to-[#d100ff]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                />
            </div>
            <div className="mt-4 text-sm font-sans tracking-widest text-gray-400">
                {progress}%
            </div>
        </motion.div>
    );
}
