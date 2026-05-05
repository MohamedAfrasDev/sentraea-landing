import React from 'react'
import TestContent from './components/test-content'
import { HeroBackgroundSVG } from './components/hero-background-svg'
import HeroDiagram from './components/hero-diagram'
import HeroAbstract from './components/hero-abstract'
import TestContentMobile from './components/test-content-mobile'

const Hero = () => {
    return (
        <div
            className='min-h-screen relative overflow-hidden w-full'
        >

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-primary/30 via-zinc-950 to-zinc-950"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>

            {/* Dotted pattern overlay */}


            <div className='absolute -right-10 top-1/3 scale-200 bottom-0'>
                <HeroAbstract />
            </div>
            <div className='px-3 md:px-5 flex flex-col items-center justify-center min-h-[85vh] w-full py-16'>
                <TestContent />
                <TestContentMobile />
            </div>
            <div className="opacity-80 -z-10 absolute inset-0 bg-[linear-gradient(rgba(242,242,242,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(242,242,242,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(57,58,59,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(57,58,59,0.07)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] h-full w-full pointer-events-none"></div>

        </div>
    )
}

export default Hero