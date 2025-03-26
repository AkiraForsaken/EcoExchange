import React from 'react'

const StoreCards = ({price}) => {
  return (
    <div className='flex-center flex-col bg-gray-100 w-[250px] h-[350px] p-3 rounded-xl'>
        <img src="toilet-paper.jpg" alt="toilet-paper" />
        <h3 className='text-2xl my-3'>Toilet paper</h3>
        <button>Redeem: {price} points</button>
    </div>
  )
} 

export default StoreCards