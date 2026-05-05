import { Card } from '@/components/ui/card';
import React from 'react'
interface GridCardProps {
    title: string;
    desc: string;

}
const GridCard: React.FC<GridCardProps> = ({ title, desc }) => {
    return (
        <Card className='flex flex-col gap-2 px-4 ring-0 shadow-sm'>
            <h2 className='text-3xl font-medium tracking-tighter'>{title}</h2>
            <h3 className='text-2xl mt-2 tracking-tight'>{desc}</h3>
        </Card>
    )
}

export default GridCard