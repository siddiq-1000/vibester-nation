"use client";

import { useEffect, useRef, useState } from "react";
// Dynamic import to avoid SSR errors with window object
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export type GlobeMarker = {
    lat: number;
    lng: number;
    src?: string;
    label?: string;
};

export function Globe3D({
    markers,
    config,
    onMarkerClick,
    onMarkerHover,
}: {
    markers: GlobeMarker[];
    config?: any;
    onMarkerClick?: (m: GlobeMarker) => void;
    onMarkerHover?: (m: GlobeMarker | null) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [countries, setCountries] = useState<any[]>([]);
    const globeRef = useRef<any>(null);

    useEffect(() => {
        setIsMounted(true);
        // Fetch geojson data for the hex polygons (dotted continents)
        fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data.features);
            });
    }, []);

    useEffect(() => {
        // Attempt auto rotate setting if ref is available
        if (globeRef.current && config?.autoRotateSpeed !== undefined) {
            if (globeRef.current.controls) {
                globeRef.current.controls().autoRotate = true;
                globeRef.current.controls().autoRotateSpeed = config.autoRotateSpeed;
            }
        }
    }, [config, isMounted]);

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center h-[500px] w-full bg-transparent">
                <div className="animate-pulse w-32 h-32 rounded-full border-t-2 border-white opacity-50"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex items-center justify-center cursor-move" style={{ minHeight: "600px" }}>
            <Globe
                ref={globeRef}
                height={600}
                width={typeof window !== 'undefined' && window.innerWidth < 768 ? window.innerWidth : 600}
                backgroundColor="rgba(0,0,0,0)" // Transparent background

                // Disable base globe to just show hexes, or set it to pure black
                showGlobe={true}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"

                // Atmosphere for glow effect
                showAtmosphere={true}
                atmosphereColor={config?.atmosphereColor || "#ffffff"}
                atmosphereAltitude={config?.atmosphereIntensity ? config.atmosphereIntensity / 100 : 0.15}

                // Hex Polygons for "dotted white" continents
                hexPolygonsData={countries}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                hexPolygonColor={() => "#ffffff"} // White continents

                // Plot user markers
                htmlElementsData={[]}
            />
        </div>
    );
}
