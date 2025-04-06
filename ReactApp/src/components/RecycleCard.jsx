import React, {useState} from 'react'

const RecycleCard = ({ type, setUserPoints, userPoints }) => {
  const typeLabels = {
    "plastic-bottles":"Plastic bottles",
    "aluminium-cans":"Aluminium cans",
    "paper":"Old paper",
    "cardboard":"Cardboard",
    "glass":"Glass",
    "batteries":"Old batteries"
  }
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
        <img src={`${import.meta.env.BASE_URL}/images/${type}.jpg`} alt={type}></img>
        <h3>{typeLabels[type] || "Item"}</h3>
        <div className='flex-center flex-row'>
            <p>Weight:</p>
            <input type='number' placeholder='1' 
            onChange={handleWeightChange}
            value={Weight} min={1} max={100000}></input>
            <span>grams</span>
        </div>
        <button onClick={() => setUserPoints(userPoints + Points)}>Recycle for {Points} points</button>
    </div>
  )
}

export default RecycleCard