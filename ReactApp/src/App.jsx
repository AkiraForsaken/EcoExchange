import { useState } from 'react'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/UserContext'
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
  const [userPoints, setuserPoints] = useState(0);
  const [showLoginMenu, setshowLoginMenu] = useState(false);
  const [showStoreMenu, setshowStoreMenu] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [showUserInfo, setshowUserInfo] = useState(false);
  const [userData, setuserData] = useState({
      fullname: "",
      age: 0,
      address: ""
    })
  return (
    <UserContextProvider>
      <div className='flex flex-col min-h-screen bg-linear-to-b from-green-500 to-ivory'>
        <Toaster position='bottom-right' toastOptions={{duration:2000}} />
        <Title onLoginClick={() => {!isLoggedIn ? setshowLoginMenu(true) : setshowUserInfo(true)}} onStoreClick={() => { isLoggedIn ? setshowStoreMenu(true) : setshowStoreMenu(false)}} isLoggedIn={isLoggedIn}/>
        <main className='flex-grow'>
          <Middle />
          {isLoggedIn ? <section className='recycle-container'>
            <ul>
              <RecycleCard userPoints={userPoints} setUserPoints={setuserPoints} type='plastic-bottles'/>
              <RecycleCard userPoints={userPoints} setUserPoints={setuserPoints} type='glass' />
              <RecycleCard userPoints={userPoints} setUserPoints={setuserPoints} type='cardboard' />
              <RecycleCard userPoints={userPoints} setUserPoints={setuserPoints} type='paper' />
              <RecycleCard userPoints={userPoints} setUserPoints={setuserPoints} type='batteries' />
              <RecycleCard userPoints={userPoints} setUserPoints={setuserPoints} type='aluminium-cans' />
            </ul>
          </section> : <></>}
          {showLoginMenu ? <LoginSignup onClose={() => setshowLoginMenu(false)} onLoginClick={() => {setisLoggedIn(true)}} /> : <></>}
          {showUserInfo ? <UserInfo userData={userData} setuserData={setuserData} onClose={() => setshowUserInfo(false)} onLogOut={() => setisLoggedIn(false)} points={userPoints}/> : <></>}
          {showStoreMenu ? <Store userPoints={userPoints} setUserPoints={setuserPoints} onClose={() => setshowStoreMenu(false)}/> : <></>}
        </main>
        <SimpleFooter />
      </div>
    </UserContextProvider>
  )
}

export default App
