import { useContext, useState } from 'react'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContext } from '../context/UserContext'
import Title from './components/Title'
import Middle from './components/Middle'
import SimpleFooter from './components/Footer'
import LoginSignup from './components/LoginSignup'
import RecycleCard from './components/RecycleCard'
import Store from './components/Store'
import UserInfo from './components/UserInfo'

// Notes: if "isLoggedIn" -> replace "Login" in Title with username
//                        -> shows the recycle cards options
// Notes: Add section about recyclable waste (2/4/2025)

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const [showLoginMenu, setshowLoginMenu] = useState(false);
  const [showStoreMenu, setshowStoreMenu] = useState(false);
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  const [showUserInfo, setshowUserInfo] = useState(false);

  const { user } = useContext(UserContext);

  return (
    <div className='flex flex-col min-h-screen bg-linear-to-b from-green-500 to-ivory'>
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Title 
      onLoginClick={() => setshowLoginMenu(true)}
      onUserInfoClick={() => setshowUserInfo(true)} 
      onStoreClick={() => setshowStoreMenu(true)}/>
      <main className='flex-grow'>
        <Middle />
        {user && 
        <section className='recycle-container'>
          <ul>
            <RecycleCard type='plastic-bottles'/>
            <RecycleCard type='glass' />
            <RecycleCard type='cardboard' />
            <RecycleCard type='paper' />
            <RecycleCard type='batteries' />
            <RecycleCard type='aluminium-cans' />
          </ul>
        </section>}
        {showLoginMenu && <LoginSignup onClose={() => setshowLoginMenu(false)} />}
        {showUserInfo && <UserInfo onClose={() => setshowUserInfo(false)}/> }
        {showStoreMenu && <Store onClose={() => setshowStoreMenu(false)}/>}
      </main>
      <SimpleFooter />
    </div>
  )
}

export default App
