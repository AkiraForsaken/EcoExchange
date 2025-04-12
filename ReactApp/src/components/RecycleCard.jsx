import React, {useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import {toast} from 'react-hot-toast'

const RecycleCard = ({ type }) => {
  const typeLabels = {
    "plastic-bottles":"Plastic bottles",
    "aluminium-cans":"Aluminium cans",
    "paper":"Old paper",
    "cardboard":"Cardboard",
    "glass":"Glass",
    "batteries":"Old batteries"
  }
  const {user, setUser} = useContext(UserContext);
  const [weight, setWeight] = useState(1);
  const [points, setPoints] = useState(10);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleWeightChange = (event) => {
    let updatedWeight = parseInt(event.target.value, 10) || 1; 
    updatedWeight = Math.max(1, Math.min(updatedWeight, 100000));
    setWeight(updatedWeight);
    setPoints(updatedWeight * 10);
  }

  const handleRecycle = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/recycle', {
        userId: user._id,
        type,
        weight,
        pointsEarned: points,
      });
      if (response.data.success) {
        // const updatedUser = response.data.user;
        // setUser(updatedUser);
        // toast.success(`Recycled ${weight}g of ${typeLabels[type]} for ${points} points!`);
        toast.success('Recycling request submitted. Awaiting confirmation.');
      } else {
        toast.error('Failed to submit recycling request.');
      }
    } catch (error) {
      // console.error('Error recycling:', error);
      console.error('Error submitting recycling request:', error);
      toast.error('An error occurred while submitting the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='recycle-card'>
        <img src={`${import.meta.env.BASE_URL}/images/${type}.jpg`} alt={type}></img>
        <h3>{type}</h3>
        <div className='flex-center flex-row'>
            <p>Weight:</p>
            <input type='number' placeholder='1' 
            onChange={handleWeightChange}
            value={weight} min={1} max={100000}></input>
            <span>grams</span>
        </div>
        <button onClick={handleRecycle} disabled={loading}>
          Recycle for {points} points
        </button>
    </div>
  )
}

export default RecycleCard