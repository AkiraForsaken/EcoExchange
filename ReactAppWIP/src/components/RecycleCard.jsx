import React, {useState} from 'react'

const RecycleCard = ({ type }) => {
  const [Weight, setWeight] = useState(1);
  const [Points, setPoints] = useState(10);

  const handleWeightChange = (event) => {
    let updatedWeight = parseInt(event.target.value, 10) || 1; // 
    if (updatedWeight > 100000) updatedWeight = 100000;
    if (updatedWeight < 1) updatedWeight = 1;
    setWeight(updatedWeight);
    setPoints(updatedWeight*10);
  }

  return (
    <div className='recycle-card'>
        <img src={`${type}.jpg`} alt={type}></img>
        <h3>{type}</h3>
        <div className='flex-center flex-row'>
            <p>Weight:</p>
            <input type='number' placeholder='1' 
            onChange={handleWeightChange}
            value={Weight} min={1} max={100000}></input>
            <span>grams</span>
        </div>
        <button>Recycle for {Points} points</button>
    </div>
  )
}

export default RecycleCard