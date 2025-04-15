import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import profilePic from '../assets/profilepic.png'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'

const Title = ({ onLoginClick, onStoreClick, onUserInfoClick }) => {
    const {user} = useContext(UserContext)
    return (
        <nav className="flex justify-between items-center h-20 text-black text-2xl">
            <div className='flex-center p-4 gap-4'>
                <img src={logo} alt='logo' className='h-15 w-15 rounded-lg' />
                <span className='text-4xl'>EcoExchange</span>
            </div>
            <div className='flex-center gap-8 p-4 '>
                {user ? <a className='cursor-pointer' 
                onClick={user ? onStoreClick : () => {toast.error('Not Logged In')}}> Store </a> : <></>}
                <a className='cursor-pointer'> About </a>
                <a className='cursor-pointer' 
                onClick={user ? onUserInfoClick : onLoginClick}> 
                    {user ? 
                    <img src={profilePic} alt="profilepic" className='h-15 w-15 rounded-lg'/> 
                    : "Log in"} 
                </a>
            </div>
        </nav>
    )
}
export default Title;