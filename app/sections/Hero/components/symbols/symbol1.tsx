import React from 'react'

interface SymbolProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

const Symbol1 = ({ className = "w-200 h-200 text-foreground", ...props }: SymbolProps) => {
    return (
        <svg
            viewBox="0 0 120 120"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            {...props}
        >
            {/* 
              THE CONCEPT:
              Several scattered input nodes (knowledge) connect via strict geometric lines 
              into a stable, central architectural chamber (structured form).
              Represents: Connectivity, Decision-making, Clarity, Building.
            */}

            {/* DRAFTING GUIDES (Negative space framing & Context) */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.15">
                {/* Crosshairs representing alignment and clarity */}
                <line x1="60" y1="10" x2="60" y2="110" />
                <line x1="10" y1="60" x2="110" y2="60" />
                {/* Bounding box around the central chamber creating a stable quadrant */}
                <rect x="30" y="30" width="60" height="60" />
            </g>

            {/* INPUT NODES (Scattered knowledge) */}
            <g fill="currentColor">
                <circle cx="10" cy="25" r="2.5" />
                <circle cx="25" cy="10" r="2.5" />
                <circle cx="100" cy="20" r="2.5" />
                <circle cx="20" cy="100" r="2.5" />
                <circle cx="100" cy="105" r="2.5" />
            </g>

            {/* CONVERGING PATHS (Routing and connecting) */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
                {/* Top-Left Merge (Decision making: 2 inputs become 1) */}
                <path d="M 10 25 L 25 25 L 45 45" />
                <path d="M 25 10 L 25 25" />

                {/* Top-Right Input */}
                <path d="M 100 20 L 75 45" />

                {/* Bottom-Left Input */}
                <path d="M 20 100 L 45 75" />

                {/* Bottom-Right Input routing via an orthogonal turn */}
                <path d="M 100 105 L 100 100 L 75 75" />
            </g>

            {/* THE CENTRAL CHAMBER (Stable structured frame) */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
                {/* Outer Diamond Wall */}
                <polygon points="60,30 90,60 60,90 30,60" />

                {/* Structural Supports connecting outer wall to inner core */}
                <line x1="60" y1="30" x2="60" y2="46" />
                <line x1="90" y1="60" x2="74" y2="60" />
                <line x1="60" y1="90" x2="60" y2="74" />
                <line x1="30" y1="60" x2="46" y2="60" />
            </g>

            {/* THE INNER CORE (The final usable form / Clarity) */}
            {/* The finalized, built structure is highlighted in the primary color */}
            <polygon points="60,46 74,60 60,74 46,60" className="fill-primary" />

        </svg>
    )
}

export default Symbol1
