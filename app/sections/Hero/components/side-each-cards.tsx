"use client";

import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'

interface SideEachCardsProps {
    title: string;
    subHeading: string;
    desc: string;
}

const SideEachCards = ({ title, subHeading, desc }: SideEachCardsProps) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleChamberActive = (e: CustomEvent) => {
            const chamberId = e.detail.id;
            if (chamberId && title.toLowerCase() === chamberId) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        window.addEventListener('hero-chamber-active', handleChamberActive as EventListener);
        return () => window.removeEventListener('hero-chamber-active', handleChamberActive as EventListener);
    }, [title]);

    return (
        <Card className={`ring-0 shadow-sm px-5 py-4 flex flex-col gap-1 transition-all duration-300 ${isActive ? 'border-primary bg-primary/5 shadow-md' : ''}`}>
            <h3 className='text-xl uppercase tracking-widest font-medium text-foreground'>{title}</h3>
            <p className='text-sm text-muted-foreground'>{desc}</p>
        </Card>
    )
}

export default SideEachCards;