"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring, MotionValue } from "framer-motion";

export default function ScrollCanvas({
    onLoadProgress,
    scrollYProgress
}: {
    onLoadProgress: (progress: number) => void;
    scrollYProgress?: MotionValue<number>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress: defaultScrollY } = useScroll();
    const progressToUse = scrollYProgress || defaultScrollY;

    const springProgress = useSpring(progressToUse, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001
    });

    const frameCount = 192;
    const currentFrameIndex = useTransform(springProgress, [0, 1], [1, frameCount]);

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [inView, setInView] = useState(true);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/dj-gear-${paddedIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                onLoadProgress(Math.round((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            };
            // In case of error (e.g. missing files), still count to not freeze preloader
            img.onerror = () => {
                loadedCount++;
                onLoadProgress(Math.round((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                }
            }
            loadedImages.push(img);
        }
    }, [onLoadProgress, frameCount]);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                } else {
                    setInView(false);
                }
            },
            { threshold: 0 }
        );
        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Draw image
    useMotionValueEvent(currentFrameIndex, "change", (latest) => {
        if (!inView || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(latest) - 1));
        const img = images[frameIndex];

        // Only draw if image is complete
        if (img && img.complete && img.naturalHeight !== 0) {
            const canvasAspectRatio = canvas.width / canvas.height;
            const imgAspectRatio = img.width / img.height;

            let renderableWidth, renderableHeight, xStart, yStart;

            if (imgAspectRatio < canvasAspectRatio) {
                renderableWidth = canvas.width;
                renderableHeight = img.height * (canvas.width / img.width);
                xStart = 0;
                yStart = (canvas.height - renderableHeight) / 2;
            } else {
                renderableHeight = canvas.height;
                renderableWidth = img.width * (canvas.height / img.height);
                yStart = 0;
                xStart = (canvas.width - renderableWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
        }
    });

    // Resize canvas
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Use device pixel ratio for sharp rendering
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                const ctx = canvasRef.current.getContext("2d");
                if (ctx) ctx.scale(dpr, dpr);

                // Force a redraw after resize
                currentFrameIndex.set(currentFrameIndex.get() + 0.0001);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentFrameIndex]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full object-cover mix-blend-screen opacity-90"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
