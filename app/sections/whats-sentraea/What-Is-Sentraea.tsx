import React from 'react'
import HeroDiagram from '../Hero/components/hero-diagram'
import GridCard from './components/grid-card'

const WhatIsSentraea = () => {
    return (
        <div className='flex flex-col gap-1'>
            <h2 className='text-5xl font-medium tracking-tighter'>What is SENTRAEA?</h2>
            <h3 className='text-2xl mt-2 tracking-tight'>Sentraea helps turn experience into usable work through four practical modes.</h3>

            <div className='grid grid-cols-2 gap-5'>
                <GridCard title={'Clarify '} desc={'organize what you know'} />
                <GridCard title={'Teach '} desc={'explain it clearly'} />
                <GridCard title={'Solve '} desc={'apply it to problems'} />
                <GridCard title={'Build '} desc={'turn it into outputs'} />
            </div>
        </div>
    )
}

export default WhatIsSentraea