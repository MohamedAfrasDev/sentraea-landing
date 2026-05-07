"use client";

import React, { useEffect, useState } from 'react'
import GridCard from './components/grid-card'
import WorkspaceUi from "@/public/icons/WORKSPACE-UI.svg";
import WorkspaceUIDARK from "@/public/icons/WORKSPACE-UI-DARK.svg"
import Image from 'next/image';
import { useTheme } from 'next-themes';

const WhatIsSentraea = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Before mount, render neither image to avoid hydration mismatch.
    // The placeholder div preserves layout space (matches image dimensions).
    const imageSrc = mounted
        ? (resolvedTheme === "dark" ? WorkspaceUIDARK : WorkspaceUi)
        : null;

    return (
        <div className='flex flex-col gap-1'>
            <h2 className='text-5xl font-medium tracking-tighter'>What is SENTRAEA?</h2>
            <h3 className='text-xl text-muted-foreground mt-2 tracking-tight'>Sentraea helps turn experience into usable work through four practical modes.</h3>

            <div className='flex flex-col md:flex-row gap-5 items-start mt-3'>
                <div className='grid grid-cols-2 h-full gap-4 flex-2 mt-4 '>
                    <GridCard title={'Clarify '} desc={'Sort what you know.'} isFocal={true} />
                    <GridCard title={'Teach '} desc={'Explain it simply.'} isFocal={false} />
                    <GridCard title={'Solve '} desc={'Apply it to real problems.'} isFocal={false} />
                    <GridCard title={'Build '} desc={'Turn it into useful output.'} isFocal={false} />
                </div>
                <div className='text-start md:-mt-6'>
                    <p className='text-md tracking-tighter text-left'>INSIDE WORKSPACE</p>
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt="Workspace UI"
                            width={580}
                            height={580}
                            className=''
                        />
                    ) : (
                        <div style={{ width: 580, height: 580 }} aria-hidden="true" />
                    )}
                </div>

            </div>
        </div>
    )
}

export default WhatIsSentraea