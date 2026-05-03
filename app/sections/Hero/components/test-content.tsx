import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'

const TestContent = () => {
    return (
        <section className='z-20 px-7'>

            <div className='flex items-center  min-w-full '>
                <h1 className='text-[100px] leading-20 font-medium   w-1/3  -tracking-widest'>Turn what you know</h1>

                <h1 className='text-5xl text-start pr-15 -pl-4 font-heading font-medium -tracking-widest'>into</h1>

                <h1 className='text-8xl    leading-24 font-semibold -tracking-widest uppercase text-primary '>
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

export default TestContent