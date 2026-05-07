import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react'
interface GridCardProps {
    title: string;
    desc: string;
    isFocal?: boolean

}
const GridCard: React.FC<GridCardProps> = ({ title, desc, isFocal }) => {
    return (
        <Card className={cn('flex flex-col h-full gap-0 px-5 py-5 ring-0  ', isFocal && 'bg-primary/5 dark:bg-primary/10 border dark:border-primary/10')}>
            <h2 className='text-3xl font-medium tracking-tighter uppercase'>{title}</h2>
            <h3 className='text-lg mt-1 tracking-tight'>{desc}</h3>
        </Card>
    )
}

export default GridCard