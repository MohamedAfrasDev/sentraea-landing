"use client";

import React, { useState } from 'react';

type ChamberKey = 'clarify' | 'teach' | 'solve' | 'build';

// Three clean union-polygon paths — true outer boundary of each connected sub-shape.
// fill="none" stroke="currentColor" → zero internal intersection lines.
//
// Shape 1: Left vertical bar  +  Middle horizontal
const PATH_S1 = "M 0,0 L 150,0 L 150,1026 L 1788,1026 L 1788,1136 L 150,1136 L 150,2185 L 0,2185 Z";
//
// Shape 2: Top horizontal  +  T-divider upper  +  Right vertical upper
const PATH_S2 = "M 428,0 L 2216,0 L 2216,943 L 2065,943 L 2065,150 L 1069,150 L 1069,884 L 919,884 L 919,150 L 428,150 Z";
//
// Shape 3: Bottom horizontal  +  T-divider lower  +  Right vertical lower
const PATH_S3 = "M 428,2044 L 919,2044 L 919,1282 L 1069,1282 L 1069,2044 L 2065,2044 L 2065,1251 L 2216,1251 L 2216,2194 L 428,2194 Z";

// Chamber bounds (same as original — these are correct for this viewBox)
const CHAMBER_BOUNDS: Record<ChamberKey, { x: number; y: number; w: number; h: number }> = {
    clarify: { x: 170, y: 150, w: 750, h: 880 },
    teach: { x: 1070, y: 150, w: 1000, h: 880 },
    solve: { x: 170, y: 1170, w: 750, h: 880 },
    build: { x: 1070, y: 1170, w: 1000, h: 880 },
};

const HeroAbstract = () => {
    const [activeChamber, setActiveChamber] = useState<ChamberKey | null>(null);

    return (
        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center opacity-90">
            <svg
                viewBox="-50 -50 2300 2500"
                className="w-full h-full text-gray-400/30 dark:text-foreground/20"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Three clean outline paths — no intersecting strokes */}
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                >
                    <path d={PATH_S1} />
                    <path d={PATH_S2} />
                    <path d={PATH_S3} />
                </g>

                {/* Invisible hover targets */}
                {(Object.keys(CHAMBER_BOUNDS) as ChamberKey[]).map((key) => {
                    const b = CHAMBER_BOUNDS[key];
                    return (
                        <rect
                            key={key}
                            x={b.x}
                            y={b.y}
                            width={b.w}
                            height={b.h}
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setActiveChamber(key)}
                            onMouseLeave={() => setActiveChamber(null)}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default HeroAbstract;