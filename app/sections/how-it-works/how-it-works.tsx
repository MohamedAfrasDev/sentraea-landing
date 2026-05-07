import React from 'react'
import HeroDiagram from '../Hero/components/hero-diagram'
import HeroAbstract from '../Hero/components/hero-abstract'
import WorkAbstract from './components/work-abstract'

const HowItWorks = () => {
    return (
        <div className='flex flex-col gap-10'>
            <div className='text-end'>
                <p className=' uppercase'>HOW IT WORKS</p>
                <h2 className='text-5xl font-medium tracking-tighter'>Four modes for turning knowledge into useful work.</h2>
                <p className='text-muted-foreground mt-3'>
                    Move from understanding to action with workflows designed for thinking, deciding, and delivering.
                </p>
            </div>

            <WorkAbstract />
        </div>
    )
}

export default HowItWorks