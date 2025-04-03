import React, {useState, useEffect} from 'react'

const UserInfo = ({userData, setuserData, onClose, points}) => {
  // const [userData, setuserData] = useState({
  //   fullname: "",
  //   age: 0,
  //   address: ""
  // })

  const [formData, setformData] = useState(userData);

  const handleDataChange = (event) => {
    setformData({
    ...formData,
    [event.target.name]: event.target.value,
    })}

  const handleSubmit = (event) => { // send user data up to app.jsx
    event.preventDefault();
    setuserData(formData);
    onClose();
  }

  useEffect(() => { // update current data with new data
    setformData(userData);
  }, [userData])
  
  return (
    <div className='modal-overlay'>
        <div className='store-container bg-white p-6 rounded-xl shadow-lg w-[400px] relative'>
          <span onClick={onClose} className="close-button right-5 text-xl">X</span>
          <h1 className='text-center text-4xl self-center w-full'>User information:</h1>
          
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            {/* Full Name */}
            <label className='font-medium'>Full Name</label>
            <input type="text" name='fullname' value={formData.fullname} placeholder="Enter your full name" onChange={handleDataChange} className="border p-2 rounded-md" />

            {/* Age */}
            <label className='font-medium'>Age</label>
            <input type="number" name='age' value={formData.age} placeholder="Enter your age" onChange={handleDataChange} className="border p-2 rounded-md" />

            {/* Points */}
            <label className='font-medium'>Points: {points}</label>

            {/* Home Address */}
            <label className='font-medium'>Home Address</label>
            <textarea placeholder="Enter your home address" name='address' value={formData.address} onChange={handleDataChange} className="border p-2 rounded-md"></textarea>

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-3 hover:bg-blue-600">
                Save Information
            </button>
            </form>
        </div>
    </div>
  )
}

export default UserInfo