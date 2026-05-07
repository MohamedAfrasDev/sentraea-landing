"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ChamberKey = 'clarify' | 'teach' | 'solve' | 'build';



// Chamber bounding boxes — corrected to match the visual layout
// Upper row: Clarify (left of T-divider), Teach (right of T-divider)
// Lower row: Solve (left of T-divider),   Build (right of T-divider)
type ChamberBound = {
    x: number;
    y: number;
    w: number;
    h: number;
    labelX: number;
    labelY: number;
    anchor: 'start' | 'end';
};

const CHAMBER_BOUNDS: Record<ChamberKey, ChamberBound> = {
    clarify: { x: 170, y: 150, w: 750, h: 880, labelX: 360, labelY: 530, anchor: 'start' },
    teach: { x: 1070, y: 150, w: 1000, h: 880, labelX: 1780, labelY: 530, anchor: 'end' },
    solve: { x: 170, y: 1170, w: 750, h: 880, labelX: 370, labelY: 1720, anchor: 'start' },
    build: { x: 1070, y: 1170, w: 1000, h: 880, labelX: 1780, labelY: 1720, anchor: 'end' },
};
const CARDS: Record<ChamberKey, { x: number, y: number, w: number, h: number, title: string, desc: string, rows: string[], path: string, targetX: number, targetY: number }> = {
    clarify: {
        x: -1500, y: 10, w: 1200, h: 600,
        title: 'Clarify',
        desc: 'Organize notes, ideas, and fragments into something you can actually work with',
        rows: [
            "Gather what matters",
            "Reduce noise",
            "Surface what’s useful"
        ],

        path: 'M -300 400 C -100 400, -50 590, 150 590', targetX: 150, targetY: 590
    },
    teach: {
        x: 2500, y: 10, w: 1200, h: 600,
        title: 'Teach',
        desc: 'Turn what you understand into explanations other people can follow.',
        rows: [
            "Draft clearly",
            "Structure ideas",
            "Share understanding"
        ],
        path: 'M 2500 400 C 2300 400, 2250 590, 2085 590', targetX: 2085, targetY: 590
    },
    solve: {
        x: -1500, y: 1250, w: 1200, h: 600,
        title: 'Solve',
        desc: 'Work through problems with clearer context, tradeoffs, and next steps.',
        rows: [
            "Compare options",
            "Resolve blockers",
            "Decide with context"
        ],
        path: 'M -300 1800 C -100 1800, -50 1610, 150 1610', targetX: 150, targetY: 1610
    },
    build: {
        x: 2500, y: 1250, w: 1200, h: 600,
        title: 'Build',
        desc: 'Turn thinking into outputs people can use, from briefs to plans to execution-ready work.',
        rows: [
            "Create deliverables",
            "Prepare handoffs",
            "Move work forward",
        ],
        path: 'M 2500 1800 C 2300 1800, 2250 1610, 2085 1610', targetX: 2085, targetY: 1610
    },
};

const WorkAbstract = () => {
    const [activeChamber, setActiveChamber] = useState<ChamberKey | null>(null);
    const [proofTooltip, setProofTooltip] = useState(false);

    return (
        <div className=" relative w-full min-h-full max-w-[1200px] mx-auto aspect-[2.1] flex items-center justify-center opacity-90 mt-10">
            <svg
                viewBox="-1600 -100 5400 2500"
                className="w-full min-h-full text-gray-800 dark:text-foreground/20"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={10}
            >
                <defs>
                    <filter id="silhouette-outline-primary" x="-2%" y="-2%" width="104%" height="104%">
                        <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="dilated" />
                        <feComposite in="dilated" in2="SourceAlpha" operator="out" result="outline" />
                        <feFlood className="text-muted-foreground/90" floodColor="currentColor" result="color" />
                        <feComposite in="color" in2="outline" operator="in" />
                    </filter>

                    {/* Filter for the proof-symbol hover state — slightly stronger outline */}
                    <filter id="silhouette-outline-active-primary" x="-2%" y="-2%" width="104%" height="104%">
                        <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="dilated" />
                        <feComposite in="dilated" in2="SourceAlpha" operator="out" result="outline" />
                        <feFlood className="text-muted-foreground/90" floodColor="currentColor" result="color" />
                        <feComposite in="color" in2="outline" operator="in" />
                    </filter>
                </defs>

                {/* Pass 1: filled silhouette (all chambers + proof symbol parts) */}
                <g fill="var(--background)" className='' strokeWidth={10}>
                    {/* Bottom horizontal of the lower-right C */}
                    <path d="M448,2044H2216a0,0,0,0,1,0,0v110a40,40,0,0,1-40,40H448a20,20,0,0,1-20-20V2064A20,20,0,0,1,448,2044Z" />
                    {/* Top horizontal of the upper-right C */}
                    <path d="M448,0H2176a40,40,0,0,1,40,40V150a0,0,0,0,1,0,0H448a20,20,0,0,1-20-20V20A20,20,0,0,1,448,0Z" />
                    {/* Right verticals (upper + lower) */}
                    <path d="M2065,10h110a40,40,0,0,1,40,40V923a20,20,0,0,1-20,20H2085a20,20,0,0,1-20-20V10A0,0,0,0,1,2065,10Z" />
                    <path d="M2085,1251h110a20,20,0,0,1,20,20v883a40,40,0,0,1-40,40H2065a0,0,0,0,1,0,0V1271A20,20,0,0,1,2085,1251Z" />
                    {/* T-divider (vertical bars between left/right chambers, top + bottom halves) */}
                    <path d="M919,5h150V863.99a20,20,0,0,1-20,20H939a20,20,0,0,1-20-20V5Z" />
                    <path d="M939,1282h110a20,20,0,0,1,20,20v892a0,0,0,0,1,0,0H919a0,0,0,0,1,0,0V1302A20,20,0,0,1,939,1282Z" />
                </g>

                {/* Proof-symbol parts rendered separately so we can attach hover handlers */}
                <g
                    fill="var(--background)"
                    style={{ cursor: 'help' }}
                    onMouseEnter={() => setProofTooltip(true)}
                    onMouseLeave={() => setProofTooltip(false)}
                >
                    {/* Left vertical bar (the | of ⊢) */}
                    <rect width="150" height="2185" rx="20" ry="20" />
                    {/* Middle horizontal bar (the — of ⊢) */}
                    <path d="M18,1026H1768a20,20,0,0,1,20,20v110a20,20,0,0,1-20,20H18a0,0,0,0,1,0,0V1026A0,0,0,0,1,18,1026Z" />
                </g>

                {/* Pass 2: outer outline only (full silhouette including proof symbol) */}
                <g fill="black" filter="url(#silhouette-outline-primary)" pointerEvents="none" className="text-primary">
                    <path d="M448,2044H2216a0,0,0,0,1,0,0v110a40,40,0,0,1-40,40H448a20,20,0,0,1-20-20V2064A20,20,0,0,1,448,2044Z" />
                    <path d="M18,1026H1768a20,20,0,0,1,20,20v110a20,20,0,0,1-20,20H18a0,0,0,0,1,0,0V1026A0,0,0,0,1,18,1026Z" />
                    <path d="M448,0H2176a40,40,0,0,1,40,40V150a0,0,0,0,1,0,0H448a20,20,0,0,1-20-20V20A20,20,0,0,1,448,0Z" />
                    <rect width="150" height="2185" rx="20" ry="20" />
                    <path d="M919,5h150V863.99a20,20,0,0,1-20,20H939a20,20,0,0,1-20-20V5Z" />
                    <path d="M2065,10h110a40,40,0,0,1,40,40V923a20,20,0,0,1-20,20H2085a20,20,0,0,1-20-20V10A0,0,0,0,1,2065,10Z" />
                    <path d="M2085,1251h110a20,20,0,0,1,20,20v883a40,40,0,0,1-40,40H2065a0,0,0,0,1,0,0V1271A20,20,0,0,1,2085,1251Z" />
                    <path d="M939,1282h110a20,20,0,0,1,20,20v892a0,0,0,0,1,0,0H919a0,0,0,0,1,0,0V1302A20,20,0,0,1,939,1282Z" />
                </g>

                {/* Highlight outline that appears on the proof symbol when hovered */}
                <AnimatePresenceSvgWrapper visible={proofTooltip}>
                    <g
                        fill="black"
                        filter="url(#silhouette-outline-active-primary)"
                        pointerEvents="none"
                        className="text-primary"
                    >
                        <rect width="150" height="2185" rx="20" ry="20" />
                        <path d="M18,1026H1768a20,20,0,0,1,20,20v110a20,20,0,0,1-20,20H18a0,0,0,0,1,0,0V1026A0,0,0,0,1,18,1026Z" />
                    </g>
                </AnimatePresenceSvgWrapper>



                {/* Invisible hover targets — one per chamber */}
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

                {/* Connectors */}
                {(Object.keys(CARDS) as ChamberKey[]).map((key) => {
                    const card = CARDS[key];
                    const isActive = activeChamber === key;
                    return (
                        <g key={`connector-${key}`}>
                            <path
                                d={card.path}
                                fill="none"
                                stroke={isActive ? "var(--primary)" : "currentColor"}
                                strokeWidth={isActive ? 16 : 8}
                                strokeLinecap="round"
                                strokeDasharray={isActive ? "none" : "30 30"}
                                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-20 text-muted-foreground'}`}
                            />
                            {/* Dot at the chamber end */}
                            <circle
                                cx={card.targetX}
                                cy={card.targetY}
                                r={isActive ? 25 : 15}
                                fill={isActive ? "var(--primary)" : "currentColor"}
                                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-20 text-muted-foreground'}`}
                            />
                        </g>
                    );
                })}

                {/* Cards (foreignObjects) */}
                {(Object.keys(CARDS) as ChamberKey[]).map((key) => {
                    const card = CARDS[key];
                    const isActive = activeChamber === key;
                    return (
                        <foreignObject
                            key={`card-${key}`}
                            x={card.x}
                            y={card.y}
                            width={card.w}
                            height={card.h}
                            onMouseEnter={() => setActiveChamber(key)}
                            onMouseLeave={() => setActiveChamber(null)}
                            style={{ overflow: 'visible' }}
                        >
                            <div
                                className={`w-full bg-primary/5 dark:bg-primary/10 rounded-xl  shadow-md flex flex-col justify-center px-24 py-16 border-[8px] backdrop-blur-2xl transition-all duration-300 ${isActive
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
                                <div className='flex flex-col gap-3 mt-10'>
                                    {card.rows.map((row, index) => (
                                        <p className="text-[70px] text-muted-foreground mt-4 leading-tight" key={index}>
                                            ● {row}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </foreignObject>
                    );
                })}
            </svg>
        </div>
    );
};

// Tiny helper: AnimatePresence works on HTML, but for SVG groups we just need a
// conditional render with a CSS opacity transition (Framer Motion's SVG support
// inside AnimatePresence can be finicky for filtered groups).
const AnimatePresenceSvgWrapper: React.FC<{ visible: boolean; children: React.ReactNode }> = ({ visible, children }) => (
    <g style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms ease' }}>
        {children}
    </g>
);

export default WorkAbstract;