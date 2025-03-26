import React from 'react'
import StoreCards from './StoreCards'

const Store = ({onClose}) => {
  return ( 
    <div className='modal-overlay'>
        <div className='store-container flex flex-wrap justify-around rounded-xl gap-5'>
          <span onClick={onClose} className="close-button right-5 text-xl">X</span>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
          <StoreCards price={15000}/>
        </div>
    </div>
  )
}

export default Store