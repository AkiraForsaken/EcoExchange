import React, {useContext, useState} from 'react'
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const UserInfo = ({ onClose }) => {
  const {user, setUser} = useContext(UserContext) // to use: user.name, user.email,...

  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age || '',
    address: user.address || '',
  });

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/profile', formData); // Update user profile
      if (response.data.success) {
        setUser(response.data.user); // Update UserContext with new data
        toast.success('Saved information successfully');
        onClose(); // Close the modal
      } else {
        console.error('Failed to update user information:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const onLogOut = async () => {
    try {
      const response = await axios.post('/logout');
      if (response.data.success) {
        setUser(null); // Clear the user state in UserContext
        toast.success('Logged out successfully!');
        onClose(); // Close the modal
      } else {
        console.error('Failed to log out:', response.data.message);
      }
    } catch (error) {
      toast.error('Error logging out: ', error)
    }
  }
  
  return (
    <div className='modal-overlay'>
        <div className='store-container bg-white p-6 rounded-xl shadow-lg w-[400px] relative'>
          <span onClick={onClose} className="close-button right-5 text-xl">X</span>
          <h1 className='text-center text-4xl self-center w-full'>User information:</h1>
          
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            {/* Full Name */}
            <label className='font-medium'>Full Name</label>
            <input 
            type="text" name='fullname' 
            value={formData.name} placeholder="Enter your full name" 
            onChange={handleDataChange} className="border p-2 rounded-md" />

            {/* Age */}
            <label className='font-medium'>Age</label>
            <input type="number" name='age' 
            value={formData.age} placeholder="Enter your age" 
            onChange={handleDataChange} className="border p-2 rounded-md" />

            {/* Points */}
            <label className='font-medium'> Points: {user.points}</label>

            {/* Home Address */}
            <label className='font-medium'>Address</label>
            <textarea 
            placeholder="Enter your home address" 
            name='address' 
            value={formData.address} 
            onChange={handleDataChange} 
            className="border p-2 rounded-md"></textarea>

            {/* Recycle History */}
            <h3 className='font-medium'>Recycle History:</h3>
            <ul>
              {user.history.recycleItems.map((item, index) => (
                <li key={index}>
                  {item.type} - {item.weight}g - {item.pointsEarned} points
                </li>
              ))}
            </ul>

            <h3 className='font-medium'>Redeem History:</h3>
            <ul>
              {user.history.redeemItems.map((item, index) => (
                <li key={index}>
                  {item.type} - {item.price} points
                </li>
              ))}
            </ul>

            {/* Submit Button */}
            <div className='flex justify-between'>
              <button type="submit" className="w-[49%] h-15">Save Information</button>
              <button type="button" className="w-[49%] h-15" onClick={onLogOut}>Log Out</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default UserInfo