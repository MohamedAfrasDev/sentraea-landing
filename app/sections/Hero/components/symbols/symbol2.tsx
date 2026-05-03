import React from 'react'

interface SymbolProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

const Symbol2 = ({ className = "w-200 h-200 text-black", ...props }: SymbolProps) => {
    return (
        <svg
            viewBox="0 0 120 120"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            {...props}
        >
            {/* 
              THE CONCEPT: DECISION LATTICE
              A geometric lattice representing structured thinking and options.
              Multiple paths are explored (faint lines and empty chambers),
              but one definitive route cuts through the complexity and 
              resolves into a clear, built outcome (primary blue chamber).
            */}

            {/* THE LATTICE GRID (Chamber system) */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.15">
                {/* Outer Diamond Frame */}
                <polygon points="60,10 110,60 60,110 10,60" />

                {/* Diagonal divisions (Left-to-Right) */}
                <line x1="50" y1="20" x2="100" y2="70" />
                <line x1="40" y1="30" x2="90" y2="80" />
                <line x1="30" y1="40" x2="80" y2="90" />
                <line x1="20" y1="50" x2="70" y2="100" />

                {/* Diagonal divisions (Right-to-Left) */}
                <line x1="70" y1="20" x2="20" y2="70" />
                <line x1="80" y1="30" x2="30" y2="80" />
                <line x1="90" y1="40" x2="40" y2="90" />
                <line x1="100" y1="50" x2="50" y2="100" />
            </g>

            {/* UNSELECTED CHAMBERS (Evaluated options) */}
            {/* Faint shading on dead-end chambers to show they were considered */}
            <polygon points="40,30 50,40 40,50 30,40" fill="currentColor" opacity="0.05" />
            <polygon points="80,10 90,20 80,30 70,20" fill="currentColor" opacity="0.05" />

            {/* EXPLORED/DISCARDED ROUTES (Complexity) */}
            <g stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinejoin="miter">
                {/* Path 1: Explores left side and ends at a considered chamber */}
                <path d="M 30 80 L 50 60 L 40 50" />
                {/* Path 2: Explores right side and ends at a considered chamber */}
                <path d="M 90 80 L 80 70 L 100 50 L 80 30" />
            </g>

            {/* THE DEFINITIVE ROUTE (Direction & Clarity) */}
            {/* Navigates firmly through the lattice to reach the final core */}
            <path
                d="M 60 110 L 70 100 L 50 80 L 70 60 L 60 50"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="miter"
            />

            {/* THE BUILT OUTCOME (Resolution) */}
            {/* The finalized chamber in primary color representing the built decision */}
            <polygon
                points="60,30 70,40 60,50 50,40"
                className="fill-primary"
            />
        </svg>
    )
}

export default Symbol2
