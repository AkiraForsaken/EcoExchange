import React from 'react'
import StoreCards from './StoreCards'

const Store = ({onClose}) => {
  return ( 
    <div className='modal-overlay'>
        <div className='store-container flex flex-wrap justify-around rounded-xl gap-5'>
          <span onClick={onClose} className="close-button right-5 text-xl">X</span>
          <h1 className='text-center text-4xl self-center w-full'>Exchange your points into items</h1>
          <StoreCards type="toilet-paper" price={10000}/>
          <StoreCards type="hao-hao" price={5000}/>
          <StoreCards type="sting" price={13000}/>
          <StoreCards type="toilet-paper" price={10000}/>
          <StoreCards type="hao-hao"price={5000}/>
          <StoreCards type="sting" price={13000}/>
        </div>
    </div>
  )
}

export default Store