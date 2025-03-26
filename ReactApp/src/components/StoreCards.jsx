import React from 'react'

const StoreCards = ({type, price}) => {
  const typeLabels = {
    "toilet-paper":"Toilet paper",
    "sting":"Sting energy drink",
    "hao-hao":"Mì hảo hảo"
  }
  return (
    <div className='flex-center flex-col bg-gray-100 w-[250px] h-[350px] p-3 rounded-xl'>
        <img src={`${type}.jpg`} alt={type} />
        <h3 className='text-xl my-3 text-center'>
          {typeLabels[type] || "Item"} {/* Unknown is just generic "Item" */}
        </h3>
        <button>Redeem: {price} points</button>
    </div>
  )
} 

export default StoreCards