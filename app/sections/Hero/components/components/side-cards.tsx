import React from 'react'
import SideEachCards from './side-each-cards'

const SideCards = () => {
    return (
        <div className='flex-1 grid grid-cols-4 gap-5  '>
            <SideEachCards title={'Clarify'}
                subHeading={'Clarify your thinking'}
                desc={'Shape your experience into a clear point of view, method, or framework.'} />
            <SideEachCards
                title={'Solve'}
                subHeading={'Help people solve problems'}
                desc={'Apply what you know to real problems that matter to people, teams, or clients.'} />
            <SideEachCards
                title={'Teach'}
                subHeading={'Teach what is useful'}
                desc={'Share useful knowledge through writing, workshops, systems, or guidance.'} />
            <SideEachCards
                title={'Build'}
                subHeading={'Create something repeatable'}
                desc={'Turn your expertise into services, tools, products, or repeatable processes.'} />

        </div>
    )
}

export default SideCards