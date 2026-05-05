import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'

const TestContentMobile = () => {
    return (
        <section className='z-20 px-7 block md:hidden'>

            <div className='flex flex-col items-start  min-w-full '>
                <h1 className='text-[70px] leading-15 font-medium    -tracking-widest'>Turn what you know</h1>

                <h1 className='text-4xl text-start pr-15 mt-5 mb-4 text-center -pl-4 font-heading font-medium -tracking-widest'>into</h1>

                <h1 className='text-6xl    leading-14 font-semibold -tracking-widest uppercase text-primary '>
                    Clarity
                    <br />
                    <span className='w-20'>Change</span>
                    <br />
                    <span>Growth</span>
                </h1>

            </div>

            <p className='text-xl mt-5 '>
                Turn experience into useful work.            </p>
            <div className='flex gap-5 mt-5'>
                <Button>
                    Join Waitlist
                </Button>
                <Button variant="outline_without_border">
                    Learn More
                </Button>
            </div>

        </section>
    )
}

export default TestContentMobile