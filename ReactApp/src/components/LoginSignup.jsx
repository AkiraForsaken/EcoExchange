import React, { useContext, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {data, useNavigate} from 'react-router-dom'
import './login.css'
import { UserContext } from '../../context/UserContext'

const LoginSignup = ({ onClose }) => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = registerData
        try {
            const {data} = await axios.post('/register', {
                name, email, password
            })
            if (data.error){
                toast.error(data.error)
            } else {
                setRegisterData({
                    name: '',
                    email: '',
                    password: '',
                })
                toast.success('Register success. Welcome!')
                navigate('/')
                onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password} = loginData
        try {
            const {data} = await axios.post('/login', {
                email, password
            }) // matches with endpoint in the authRoutes server side
            if (data.error){
                toast.error(data.error)
            } else {
                setLoginData({
                    email: '',
                    password: '',
                })
                setUser(data); // Update UserContext
                toast.success('Login success.')
                navigate('/')
                onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [isActive, setIsActive] = useState(false);
    return (
        <div className='modal-overlay'>
            <div className={`container ${isActive ? 'active' : ''}`} id='container'>
                <div className='form-container sign-up'> 
                    {/* Right side  */}
                    <form onSubmit={registerUser}>
                        <span onClick={onClose} className="close-button right-5 text-xl">X</span>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href='#' className='icons'><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href='#' className='icons'><i className="fa-brands fa-facebook"></i></a>
                            <a href='#' className='icons'><i className="fa-brands fa-x"></i></a>
                            <a href='#' className='icons'><i className="fa-brands fa-instagram"></i></a>
                        </div>
                        <span> or use your email for registration</span>
                        <input type="text" placeholder='Name' 
                        value={registerData.name} onChange={(e) => {setRegisterData({...registerData, name: e.target.value})}}/>
                        <input type="email" placeholder='email' 
                        value={registerData.email} onChange={(e) => {setRegisterData({...registerData, email: e.target.value})}}/>
                        <input type="password" placeholder='password' 
                        value={registerData.password} onChange={(e) => {setRegisterData({...registerData, password: e.target.value})}}/>
                        {/* <button onClick={() => {onLoginClick(); onClose();}}>Sign up</button> */}
                        <button type="submit">Sign up</button>
                    </form>
                </div>
                <div className='form-container sign-in'>  
                    {/* Left side  */}
                    <form onSubmit={loginUser}>
                        <span onClick={onClose} className="close-button left-5 text-xl">X</span>
                        <h1>Sign in</h1>
                        <div className="social-icons">
                            <a href='#' className='icons'><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href='#' className='icons'><i className="fa-brands fa-facebook"></i></a>
                            <a href='#' className='icons'><i className="fa-brands fa-x"></i></a>
                            <a href='#' className='icons'><i className="fa-brands fa-instagram"></i></a>
                        </div>
                        <span> or use your email password to sign in</span>
                        <input type="email" placeholder='email' 
                        value={loginData.email} onChange={(e) => {setLoginData({...loginData, email: e.target.value})}}/>
                        <input type="password" placeholder='password' 
                        value={loginData.password} onChange={(e) => {setLoginData({...loginData, password: e.target.value})}}/>
                        <a href="#">Forgot your password?</a>
                        {/* <button onClick={() => {onLoginClick(); onClose();}}>Log in</button> */}
                        <button type="submit">Log in</button>
                    </form>
                </div>
                <div className='toggle-container'>
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button onClick={() => { setIsActive(false) }} id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>If you haven't created an accound, sign up now to benefit from recyclying</p>
                            <button onClick={() => { setIsActive(true) }} id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup