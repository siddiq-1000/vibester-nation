import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LiveDJPage() {
    return (
        <main className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-4 relative selection:bg-white/20">
            <div className="absolute top-8 left-8">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-sans font-bold uppercase tracking-widest text-sm text-gray-400 group-hover:text-white">Back</span>
                </Link>
            </div>

            <div className="max-w-4xl w-full text-center mt-16 md:mt-0">
                <h1 className="text-5xl md:text-8xl font-heading font-extrabold uppercase mb-8 text-white drop-shadow-md">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#d100ff]">Live DJ Performance</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-sans tracking-wide leading-relaxed mb-12 max-w-2xl mx-auto">
                    Witness true musical artistry. Our live DJ performances are immersive musical journeys combining seamless transitions, engaging stage presence, and unmatched energy.
                </p>

                <a href="tel:+918884487221" className="inline-flex px-8 py-4 bg-gray-800 text-white font-bold text-lg tracking-widest uppercase hover:bg-gray-700 transition-colors duration-300 items-center justify-center rounded-full shadow-lg border border-gray-600">
                    Book Vibester Nation
                </a>
            </div>
        </main>
    );
}
