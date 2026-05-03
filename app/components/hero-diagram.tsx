"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ChamberKey = 'clarify' | 'teach' | 'solve' | 'build';

const CHAMBER_CONTENT: Record<ChamberKey, { title: string; description: string }> = {
    clarify: {
        title: 'Clarify',
        description: 'Distill complexity into precise understanding. Surface the question beneath the question.',
    },
    teach: {
        title: 'Teach',
        description: 'Transfer knowledge with structure. Build mental models that compound over time.',
    },
    solve: {
        title: 'Solve',
        description: 'Reason from first principles. Decompose problems until each step is obvious.',
    },
    build: {
        title: 'Build',
        description: 'Translate thought into artifact. Ship working systems grounded in rigor.',
    },
};

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
const HeroDiagram = () => {
    const [activeChamber, setActiveChamber] = useState<ChamberKey | null>(null);
    const [proofTooltip, setProofTooltip] = useState(false);

    return (
        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center opacity-90">
            <svg
                viewBox="-50 -50 2300 2500"
                className="w-full h-full text-gray-500/50 dark:text-foreground/40"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={10}
            >
                <defs>
                    <filter id="silhouette-outline" x="-2%" y="-2%" width="104%" height="104%">
                        <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="dilated" />
                        <feComposite in="dilated" in2="SourceAlpha" operator="out" result="outline" />
                        <feFlood floodColor="currentColor" result="color" />
                        <feComposite in="color" in2="outline" operator="in" />
                    </filter>

                    {/* Filter for the proof-symbol hover state — slightly stronger outline */}
                    <filter id="silhouette-outline-active" x="-2%" y="-2%" width="104%" height="104%">
                        <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="dilated" />
                        <feComposite in="dilated" in2="SourceAlpha" operator="out" result="outline" />
                        <feFlood floodColor="currentColor" result="color" />
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
                    className={'text-primary'}
                >
                    {/* Left vertical bar (the | of ⊢) */}
                    <rect width="150" height="2185" rx="20" ry="20" />
                    {/* Middle horizontal bar (the — of ⊢) */}
                    <path d="M18,1026H1768a20,20,0,0,1,20,20v110a20,20,0,0,1-20,20H18a0,0,0,0,1,0,0V1026A0,0,0,0,1,18,1026Z" />
                </g>

                {/* Pass 2: outer outline only (full silhouette including proof symbol) */}
                <g fill="black" filter="url(#silhouette-outline)" pointerEvents="none">
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
                        filter="url(#silhouette-outline-active)"
                        pointerEvents="none"
                        className="text-foreground/80"
                    >
                        <rect width="150" height="2185" rx="20" ry="20" />
                        <path d="M18,1026H1768a20,20,0,0,1,20,20v110a20,20,0,0,1-20,20H18a0,0,0,0,1,0,0V1026A0,0,0,0,1,18,1026Z" />
                    </g>
                </AnimatePresenceSvgWrapper>

                {/* Static chamber labels — now correctly positioned */}
                <g
                    className="fill-foreground/40 dark:fill-foreground/50 font-mono uppercase text-lg tracking-[0.2em]"
                    style={{ fontSize: '80px' }}
                    stroke="none"
                    pointerEvents="none"
                >
                    <text x={CHAMBER_BOUNDS.clarify.labelX} y={CHAMBER_BOUNDS.clarify.labelY}>Clarify</text>
                    <text x={CHAMBER_BOUNDS.solve.labelX} y={CHAMBER_BOUNDS.solve.labelY}>Solve</text>
                    <text x={CHAMBER_BOUNDS.teach.labelX} y={CHAMBER_BOUNDS.teach.labelY} textAnchor="end">Teach</text>
                    <text x={CHAMBER_BOUNDS.build.labelX} y={CHAMBER_BOUNDS.build.labelY} textAnchor="end">Build</text>
                </g>

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
            </svg>

            {/* HTML overlays */}

            {/* Chamber description */}
            <AnimatePresence mode="wait">
                {activeChamber && (
                    <motion.div
                        key={activeChamber}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                        <div className="max-w-[60%] rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-md px-5 py-4 shadow-lg">
                            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 mb-1">
                                {CHAMBER_CONTENT[activeChamber].title}
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/80">
                                {CHAMBER_CONTENT[activeChamber].description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Provable tooltip — anchored to the left side where the ⊢ shape sits */}
            <AnimatePresence>
                {proofTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute"
                        style={{
                            // Anchor near the middle horizontal of the ⊢
                            left: '8%',
                            top: '50%',
                            transform: 'translate(0, -50%)',
                        }}
                    >
                        <div className="rounded-lg border border-foreground/10 bg-background/90 backdrop-blur-md px-3 py-2 shadow-md w-56">
                            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 mb-0.5">
                                Provable
                            </div>
                            <p className="text-xs leading-snug text-foreground/70">
                                The turnstile <span className="font-mono">⊢</span> denotes formal entailment — what
                                follows is derivable from what precedes.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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

export default HeroDiagram;