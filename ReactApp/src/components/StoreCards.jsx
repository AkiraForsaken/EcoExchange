import React, { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'
import toilet_paper from '../assets/images/toilet-paper.jpg'
import sting from '../assets/images/sting.jpg'
import hao_hao from '../assets/images/hao-hao.jpg'
import coca_cola from '../assets/images/coca-cola.jpg'
import eggs from '../assets/images/eggs.jpg'
import cup from '../assets/images/cup.jpg'

const StoreCards = ({type, price, userPoints, setUserPoints}) => {
  const typeLabels = {
    "toilet-paper":"Toilet paper",
    "sting":"Sting energy drink",
    "hao-hao":"Instant noodle",
    "coca-cola":"Coca cola",
    "eggs":"Chicken eggs",
    "cup":"Glass cup"
  }
  const typeToImage = {
    "toilet-paper":toilet_paper,
    "sting":sting,
    "hao-hao":hao_hao,
    "coca-cola":coca_cola,
    "eggs":eggs,
    "cup":cup
  }
  const {user, setUser } = useContext(UserContext);
  const handleRedeem = async () => {
    if (user.points < price) {
      toast.error('Insufficient points!');
      return;
    }
    try {
      const response = await axios.post('/redeem', {
        userId: user._id,
        type,
        price,
      });
      if (response.data.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error redeeming item:', error);
    }
  };
  return (
    <div className='flex-center flex-col bg-gray-100 w-[250px] h-[350px] p-3 rounded-xl'>
        <img src={typeToImage[type]} alt={type} />
        <h3 className='text-xl my-3 text-center'>
          {typeLabels[type]}
        </h3>
        <button onClick={handleRedeem}> Redeem: {price} points</button>
    </div>
  )
} 

export default StoreCards