"use client";

import { Card } from '@/components/ui/card';
import React, { useState } from 'react';

type ChamberKey = 'clarify' | 'teach' | 'solve' | 'build';

const LOGO_SCALE = 3.25;

// Logo scaled size: 677×625 → 2200×2031
// viewBox: "-1600 -100 5400 2300" → x range: -1600 to 3800

const PATH_S1 = "M 31,0 L 91,0 L 91,285 L 565,285 L 565,340 L 91,340 L 91,625 L 31,625 Z";
const PATH_S2 = "M 144,0 L 677,0 L 677,274 L 612,274 L 612,60 L 379,60 L 379,234 L 324,234 L 324,60 L 144,60 Z";
const PATH_S3 = "M 144,565 L 324,565 L 324,391 L 379,391 L 379,565 L 612,565 L 612,351 L 677,351 L 677,625 L 144,625 Z";

// Chamber bounds from scaled logo geometry:
//   Left  x: 91×3.25=296  →  324×3.25=1053   (inside left bar → inside inner vert)
//   Right x: 379×3.25=1232 → 677×3.25=2200   (inside inner vert → right edge of outer vert)
//   Top   y: 60×3.25=195  →  285×3.25=927
//   Bot   y: 340×3.25=1105 → 565×3.25=1836
const CHAMBER_BOUNDS: Record<ChamberKey, { x: number; y: number; w: number; h: number }> = {
    clarify: { x: 296, y: 195, w: 757, h: 732 },
    teach: { x: 1232, y: 195, w: 1068, h: 732 },
    solve: { x: 296, y: 1105, w: 757, h: 731 },
    build: { x: 1232, y: 1105, w: 1068, h: 731 },
};

// Left cards: x=-1500 (right edge=-350), connect to left edge of left bar x=101
// Right cards: x=2400 (right edge=3550, fits in viewBox of 3800), connect to right edge of outer vert x=2200
// Top chamber mid-y:   (195+927)/2  = 561
// Bottom chamber mid-y: (1105+1836)/2 = 1470
const CARDS: Record<ChamberKey, {
    x: number; y: number; w: number; h: number;
    title: string; desc: string; rows: string[];
    path: string; targetX: number; targetY: number;
}> = {
    clarify: {
        x: -1500, y: -170, w: 1100, h: 680,
        title: 'Clarify',
        desc: 'Organize notes, ideas, and fragments into something you can actually work with',
        rows: ['Gather what matters', 'Reduce noise', "Surface what's useful"],
        path: 'M -350 561 C -150 561, -50 561, 101 561',
        targetX: 101, targetY: 561,
    },
    teach: {
        x: 2550, y: -170, w: 1100, h: 680,
        title: 'Teach',
        desc: 'Turn what you understand into explanations other people can follow.',
        rows: ['Draft clearly', 'Structure ideas', 'Share understanding'],
        path: 'M 2550 561 C 2380 561, 2320 561, 2200 561',
        targetX: 2200, targetY: 561,
    },
    solve: {
        x: -1500, y: 1050, w: 1100, h: 680,
        title: 'Solve',
        desc: 'Work through problems with clearer context, tradeoffs, and next steps.',
        rows: ['Compare options', 'Resolve blockers', 'Decide with context'],
        path: 'M -350 1470 C -150 1470, -50 1470, 101 1470',
        targetX: 101, targetY: 1470,
    },
    build: {
        x: 2550, y: 1050, w: 1100, h: 680,
        title: 'Build',
        desc: 'Turn thinking into outputs people can use, from briefs to plans to execution-ready work.',
        rows: ['Create deliverables', 'Prepare handoffs', 'Move work forward'],
        path: 'M 2550 1470 C 2380 1470, 2320 1470, 2200 1470',
        targetX: 2200, targetY: 1470,
    },
};

const WorkAbstract = () => {
    const [activeChamber, setActiveChamber] = useState<ChamberKey | null>(null);

    return (
        <div className="relative w-full min-h-full max-w-[1200px] mx-auto aspect-[2.1] flex items-center justify-center opacity-90 mt-10">
            <svg
                viewBox="-1600 -100 5400 2300"
                className="w-full min-h-full text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Logo mark */}
                <g
                    transform={`scale(${LOGO_SCALE})`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="text-foreground/40 dark:text-foreground/20"
                >
                    <path d={PATH_S1} />
                    <path d={PATH_S2} />
                    <path d={PATH_S3} />
                </g>

                {/* Hover targets */}
                {(Object.keys(CHAMBER_BOUNDS) as ChamberKey[]).map((key) => {
                    const b = CHAMBER_BOUNDS[key];
                    return (
                        <rect
                            key={key}
                            x={b.x} y={b.y} width={b.w} height={b.h}
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setActiveChamber(key)}
                            onMouseLeave={() => setActiveChamber(null)}
                        />
                    );
                })}

                {/* Connectors */}
                {(Object.keys(CARDS) as ChamberKey[]).map((key) => {
                    const card = CARDS[key];
                    const isActive = activeChamber === key;
                    return (
                        <g key={`connector-${key}`}>
                            <path
                                d={card.path}
                                fill="none"
                                stroke={isActive ? 'var(--primary)' : 'currentColor'}
                                strokeWidth={isActive ? 16 : 8}
                                strokeLinecap="round"
                                strokeDasharray={isActive ? 'none' : '30 30'}
                                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-20 text-muted-foreground'}`}
                            />
                            <circle
                                cx={card.targetX} cy={card.targetY}
                                r={isActive ? 25 : 15}
                                fill={isActive ? 'var(--primary)' : 'currentColor'}
                                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-20 text-muted-foreground'}`}
                            />
                        </g>
                    );
                })}

                {/* Cards */}
                {(Object.keys(CARDS) as ChamberKey[]).map((key) => {
                    const card = CARDS[key];
                    const isActive = activeChamber === key;
                    return (
                        <foreignObject
                            key={`card-${key}`}
                            x={card.x} y={card.y} width={card.w} height={card.h}
                            onMouseEnter={() => setActiveChamber(key)}
                            onMouseLeave={() => setActiveChamber(null)}
                            style={{ overflow: 'visible' }}
                        >
                            <Card
                                className={`w-full bg-primary/5 dark:bg-primary/10 flex flex-col justify-center px-24 py-16 backdrop-blur-2xl transition-all duration-300 ${isActive
                                    ? 'border-primary/80 scale-105 shadow-primary/20'
                                    : 'border-border/50 scale-100'
                                    }`}
                                style={{ cursor: 'pointer' }}
                            >
                                <h3 className={`text-[120px] uppercase font-medium tracking-tight transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                                    {card.title}
                                </h3>
                                <p className="text-[80px] text-muted-foreground mt-4 leading-tight">
                                    {card.desc}
                                </p>
                                <div className="flex flex-col gap-3 mt-10">
                                    {card.rows.map((row, i) => (
                                        <p key={i} className="text-[70px] text-muted-foreground mt-4 leading-tight">
                                            ● {row}
                                        </p>
                                    ))}
                                </div>
                            </Card>
                        </foreignObject>
                    );
                })}
            </svg>
        </div>
    );
};

export default WorkAbstract;