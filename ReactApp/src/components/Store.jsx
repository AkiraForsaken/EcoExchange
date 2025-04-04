import React from 'react'
import StoreCards from './StoreCards'

const Store = ({onClose, userPoints, setUserPoints}) => {
  return ( 
    <div className='modal-overlay'>
        <div className='store-container flex flex-wrap justify-around rounded-xl gap-5'>
          <span onClick={onClose} className="close-button right-5 text-xl">X</span>
          <h1 className='text-center text-4xl self-center w-full'>Exchange your points into items</h1>
          <StoreCards userPoints={userPoints} setUserPoints={setUserPoints} type="toilet-paper" price={10000}/>
          <StoreCards userPoints={userPoints} setUserPoints={setUserPoints} type="cup" price={50000}/>
          <StoreCards userPoints={userPoints} setUserPoints={setUserPoints} type="eggs" price={30000}/>
          <StoreCards userPoints={userPoints} setUserPoints={setUserPoints} type="hao-hao" price={3500}/>
          <StoreCards userPoints={userPoints} setUserPoints={setUserPoints} type="sting" price={15000}/>
          <StoreCards userPoints={userPoints} setUserPoints={setUserPoints} type="coca-cola" price={13000}/>
        </div>
    </div>
  )
}

export default Store