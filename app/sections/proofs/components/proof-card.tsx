import { Card } from '@/components/ui/card'
import React from 'react'

interface ProofCardProps {
    title: string;
    from: string;
    to: string;
    subTitle: string;
    isReversed?: boolean;
}

const ProofCard: React.FC<ProofCardProps> = ({ title, from, to, subTitle, isReversed }) => {
    return (
        <Card className='flex flex-col gap-0 px-5 pt-3.5 pb-1.5 text-center'>
            <h2 className='text-2xl font-medium uppercase'>{title}</h2>
            <div className='mt-5 text-start'>
                <p className='text-muted-foreground text-xs'>FROM</p>
                <h3 className='text-lg mt-1 tracking-tight'>{from}</h3>
            </div>
            <div className='mt-2 text-start'>
                <p className='text-muted-foreground text-xs'>TO</p>
                <h3 className='text-lg mt-1 tracking-tight'>{to}</h3>
            </div>
            <p className='text-sm text-muted-foreground mt-4'>{subTitle}</p>
        </Card>)
}

export default ProofCard