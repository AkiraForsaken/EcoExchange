import React from 'react'

const UserInfo = ({onClose}) => {
  return (
    <div className='modal-overlay'>
        <div className='store-container flex flex-wrap justify-around rounded-xl gap-5'>
          <span onClick={onClose} className="close-button right-5 text-xl">X</span>
          <h1 className='text-center text-4xl self-center w-full'>User information:</h1>
          
          <form className='flex flex-col gap-3'>
            {/* Full Name */}
            <label className='font-medium'>Full Name</label>
            <input type="text" placeholder="Enter your full name" className="border p-2 rounded-md" />

            {/* Age */}
            <label className='font-medium'>Age</label>
            <input type="number" placeholder="Enter your age" className="border p-2 rounded-md" />

            {/* Points */}
            <label className='font-medium'>Points</label>
            <input type="number" placeholder="User points" className="border p-2 rounded-md" />

            {/* Home Address */}
            <label className='font-medium'>Home Address</label>
            <textarea placeholder="Enter your home address" className="border p-2 rounded-md resize-none"></textarea>

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