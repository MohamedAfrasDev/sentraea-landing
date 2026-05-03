import React from 'react'

interface AbstractSymbolProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

const AbstractSymbol = ({ className = "w-16 h-16 text-black", ...props }: AbstractSymbolProps) => {
    return (
        <svg 
            viewBox="0 0 134 100" 
            className={className} 
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            {...props}
        >
            {/* 
              THE CONCEPT:
              1. Scattered inputs (5 nodes on the left)
              2. Connection (Paths extending along a 45-degree grid logic)
              3. Decision (Architectural drafting lines showing alignment and turning points)
              4. Clarity (Convergence into a single unified path)
              5. Build (Resolution into a structured, coherent isometric frame core)
            */}

            {/* DRAFTING GUIDES (Decision & Alignment axes) */}
            <g stroke="currentColor" strokeWidth="1" opacity="0.15">
                {/* Vertical guides where paths turn */}
                <line x1="40" y1="12" x2="40" y2="88" />
                <line x1="60" y1="32" x2="60" y2="68" />
                <line x1="70" y1="42" x2="70" y2="58" />
                {/* Frame boundary guides */}
                <line x1="98" y1="28" x2="98" y2="72" />
                <line x1="122" y1="28" x2="122" y2="72" />
            </g>

            {/* NODES (Scattered Inputs) */}
            <g stroke="currentColor" strokeWidth="1.5">
                <circle cx="20" cy="20" r="2" />
                <circle cx="30" cy="40" r="2" />
                <circle cx="15" cy="50" r="2" />
                <circle cx="30" cy="60" r="2" />
                <circle cx="20" cy="80" r="2" />
            </g>

            {/* PATHS (Connection -> Clarity) */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
                {/* Converging inputs following exact 45-degree constraints */}
                <path d="M 22 20 L 40 20 L 70 50" />
                <path d="M 32 40 L 60 40 L 70 50" />
                <path d="M 17 50 L 70 50" />
                <path d="M 32 60 L 60 60 L 70 50" />
                <path d="M 22 80 L 40 80 L 70 50" />
                
                {/* The Unified Clarified Path injecting into the frame */}
                <path d="M 70 50 L 104 50" />
            </g>

            {/* THE STRUCTURED FRAME (Build) */}
            <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter">
                {/* Outer bounding box */}
                <rect x="98" y="38" width="24" height="24" />
                {/* Isometric structural corners matching the 45-degree logic */}
                <path d="M 98 38 L 104 44" />
                <path d="M 122 38 L 116 44" />
                <path d="M 98 62 L 104 56" />
                <path d="M 122 62 L 116 56" />
            </g>

            {/* THE CORE OUTCOME (The resolved system) */}
            <rect x="104" y="44" width="12" height="12" className="fill-primary" />
        </svg>
    )
}

export default AbstractSymbol
