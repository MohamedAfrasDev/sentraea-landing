import React from 'react'

export const HeroBackgroundSVG = ({ className }: { className?: string }) => {
    return (
        <svg 
            viewBox="0 0 1200 800" 
            className={`w-full h-full text-foreground/30 dark:text-foreground/20 ${className || ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
        >
            <g stroke="currentColor" strokeWidth="1">
                {/* Structural architectural grid lines */}
                <g opacity="0.4">
                    <line x1="600" y1="0" x2="600" y2="800" />
                    <line x1="0" y1="400" x2="1200" y2="400" />
                    {/* 45 degree drafting lines (Top half only to clear the text area below) */}
                    <line x1="200" y1="0" x2="600" y2="400" />
                    <line x1="1000" y1="0" x2="600" y2="400" />
                </g>

                {/* Guide Rings */}
                <g opacity="0.5">
                    <circle cx="600" cy="400" r="250" />
                    <circle cx="600" cy="400" r="120" strokeWidth="1.5" opacity="0.8" />
                    <circle cx="600" cy="400" r="380" opacity="0.3" strokeDasharray="6 6" />
                </g>

                {/* Four elegant branches */}
                <g strokeWidth="1.5" opacity="0.9">
                    {/* Top Right */}
                    <path d="M 600 400 L 750 250 L 950 250" />
                    <circle cx="950" cy="250" r="3" fill="currentColor" />
                    {/* Bottom Right */}
                    <path d="M 600 400 L 750 550 L 950 550" />
                    <circle cx="950" cy="550" r="3" fill="currentColor" />
                    {/* Bottom Left */}
                    <path d="M 600 400 L 450 550 L 250 550" />
                    <circle cx="250" cy="550" r="3" fill="currentColor" />
                    {/* Top Left */}
                    <path d="M 600 400 L 450 250 L 250 250" />
                    <circle cx="250" cy="250" r="3" fill="currentColor" />
                </g>
            </g>

            {/* Subtle center node with blue accent (prominence reduced) */}
            <circle cx="600" cy="400" r="3" className="fill-primary" opacity="0.8" />
            <circle cx="600" cy="400" r="12" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.3" />
        </svg>
    )
}
