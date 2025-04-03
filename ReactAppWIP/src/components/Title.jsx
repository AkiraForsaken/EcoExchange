import React from 'react'
import logo from '../assets/logo.jpg'

const Title = ({ onLoginClick, onStoreClick }) => {
    return (
        <nav className="flex justify-between items-center h-20 text-black text-2xl">
            <div className='flex-center p-4 gap-4'>
                <img src={logo} alt='logo' className='h-15 w-15' />
                <span className='text-4xl'>EcoExchange</span>
            </div>
            <div className='flex-center gap-8 p-4 '>
                <a className='cursor-pointer' onClick={onStoreClick}> Store </a>
                <a className='cursor-pointer'> About </a>
                <a className='cursor-pointer' onClick={onLoginClick}> Login </a>
            </div>
        </nav>
    )
}
export default Title;