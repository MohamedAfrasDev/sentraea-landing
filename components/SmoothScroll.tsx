"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.7,
            smoothWheel: true,
            wheelMultiplier: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 3),
        });

        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
