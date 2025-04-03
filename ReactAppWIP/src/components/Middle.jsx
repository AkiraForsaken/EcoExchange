import React from 'react'

const Middle = () => {
    return (
        <div className='middle-container'>
            <div className='flex-center flex-col my-10'>
                <h1 className='text-gradient text-7xl'> EcoExchange </h1>
                <h3 className='text-white'> Your solution to start recycling</h3>
            </div>
            <div className='flex justify-around mb-10'>
                <div className='middle-cards'>
                    <h2>Plastic Waste Generation</h2>
                    <p>Vietnam generates approximately 3.1 million metric tons of plastic waste annually, with at least 10% leaking into the ocean.</p>
                </div>
                <div className='middle-cards'>
                    <h2>Recycling Rates</h2>
                    <p>Only about 25% of plastic waste in Vietnam is recycled; the remaining 75% is discarded.</p>
                </div>
                <div className='middle-cards'>
                    <h2>Landfill Practices</h2>
                    <p>Approximately 85% of Vietnam's waste is buried without treatment in landfill sites, 80% of which are considered unhygienic and contribute to environmental pollution.</p>
                </div>
            </div>
        </div>
    )
}

export default Middle