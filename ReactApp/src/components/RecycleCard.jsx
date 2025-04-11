import React, {useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'

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

  const handleWeightChange = (event) => {
    let updatedWeight = parseInt(event.target.value, 10) || 1; 
    updatedWeight = Math.max(1, Math.min(updatedWeight, 100000));
    setWeight(updatedWeight);
    setPoints(updatedWeight * 10);
  }

  const handleRecycle = async () => {
    try {
      const response = await axios.post('/recycle', {
        userId: user._id,
        type,
        weight,
        pointsEarned: points,
      });
      if (response.data.success) {
        const updatedUser = await axios.get('/profile');
        // setUser({ ...user, points: user.points + points });
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error recycling:', error);
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
        <button onClick={handleRecycle}>Recycle for {points} points</button>
    </div>
  )
}

export default RecycleCard