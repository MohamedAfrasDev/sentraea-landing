import { Card } from '@/components/ui/card'
import React from 'react'
import ProofCard from './components/proof-card'

const Proofs = () => {
    return (
        <div className='flex flex-col gap-10'>
            <div>
                <p className=' uppercase'>FROM KNOWING TO DOING</p>
                <h2 className='text-5xl font-medium tracking-tighter'>What do you do with what you know?</h2>
                <p className='text-muted-foreground mt-3'>SENTRAEA helps you move from stored knowledge to clear action across everyday work.

                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <ProofCard title={'Clarify'}
                    from={'scattered notes and half-formed thoughts'}
                    to='a clearer view of what matters'
                    subTitle={'See the signal, not the noise.'} />
                <ProofCard title={'Decide'}
                    from={'uncertainty and open loops'}
                    to='decisions you can explain and act on'
                    subTitle={'Turn thinking into next steps.'} />
                <ProofCard title={'Deliver'}
                    from={'ideas that stay in your head'}
                    to='outputs people can use'
                    subTitle={'Write, teach, plan, and build from what you know.'} />
            </div>

            <h3 className='text-center font-medium'>
                Most tools help you store information. SENTRAEA helps you use it.
            </h3>
        </div>
    )
}

export default Proofs