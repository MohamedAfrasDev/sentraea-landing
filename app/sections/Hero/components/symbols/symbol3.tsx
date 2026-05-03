import React from 'react'

interface SymbolProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

const Symbol3 = ({ className = "w-16 h-16 text-black", ...props }: SymbolProps) => {
    return (
        <svg
            viewBox="0 0 120 120"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            {...props}
        >
            {/* 
              THE CONCEPT: THE BRIDGE
              Two structured chambers. The left contains separated, distinct inputs (knowledge).
              A single, precise central link bridges the gap, translating the scattered
              inputs into one solid, unified structure on the right (clarity/action).
            */}

            {/* DRAFTING GUIDES (Alignment and Space) */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.15">
                {/* Global axes */}
                <line x1="60" y1="15" x2="60" y2="105" />
                <line x1="10" y1="60" x2="110" y2="60" />

                {/* Chamber boundary alignments */}
                <line x1="15" y1="20" x2="15" y2="100" />
                <line x1="105" y1="20" x2="105" y2="100" />

                {/* Content bounding box alignments */}
                <line x1="10" y1="40" x2="110" y2="40" />
                <line x1="10" y1="80" x2="110" y2="80" />
            </g>

            {/* THE TWO CHAMBERS (Balanced sides) */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
                {/* Left Frame (Knowledge Chamber) */}
                {/* Features a precise gap at y=60 to allow the bridge to pass through */}
                <path d="M 15 60 L 15 30 L 55 30 L 55 56" />
                <path d="M 55 64 L 55 90 L 15 90 L 15 60" />

                {/* Right Frame (Action/Clarity Chamber) */}
                {/* Features a gap at y=60 to receive the bridge */}
                <path d="M 105 60 L 105 30 L 65 30 L 65 56" />
                <path d="M 65 64 L 65 90 L 105 90 L 105 60" />
            </g>

            {/* LEFT SIDE CONTENT (Scattered Knowledge / Ideas) */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <line x1="25" y1="40" x2="45" y2="40" />
                <line x1="25" y1="50" x2="45" y2="50" />
                {/* Gap at y=60 left explicitly for the central link */}
                <line x1="25" y1="70" x2="45" y2="70" />
                <line x1="25" y1="80" x2="45" y2="80" />
            </g>

            {/* THE CENTRAL LINK (The Bridge / Transition) */}
            <line
                x1="25" y1="60"
                x2="75" y2="60"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
            />

            {/* RIGHT SIDE CONTENT (Unified Structure / Action) */}
            {/* The 4 fragmented horizontal lines have consolidated into 1 solid vertical block */}
            <rect
                x="75" y="40"
                width="20" height="40"
                className="fill-primary"
            />
        </svg>
    )
}

export default Symbol3
