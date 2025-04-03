import { useState } from 'react'
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

function App() {
  const [showLoginMenu, setshowLoginMenu] = useState(false);
  const [showStoreMenu, setshowStoreMenu] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [showUserInfo, setshowUserInfo] = useState(false);
  return (
    <div className='flex flex-col min-h-screen bg-linear-to-b from-green-500 to-ivory'>
      <Title onLoginClick={() => {!isLoggedIn ? setshowLoginMenu(true) : setshowUserInfo(true)}} onStoreClick={() => { isLoggedIn ? setshowStoreMenu(true) : setshowStoreMenu(false)}} isLoggedIn={isLoggedIn}/>
      <main className='flex-grow'>
        <Middle />
        {isLoggedIn ? <section className='recycle-container'>
          <ul>
            <RecycleCard type='plastic-bottles'/>
            <RecycleCard type='glass' />
            <RecycleCard type='cardboard' />
            <RecycleCard type='paper' />
            <RecycleCard type='batteries' />
          </ul>
        </section> : <></>}
        {showLoginMenu ? <LoginSignup onClose={() => setshowLoginMenu(false)} onLoginClick={() => {setisLoggedIn(true)}} /> : <></>}
        {showUserInfo ? <UserInfo onClose={() => setshowUserInfo(false)}/> : <></>}
        {showStoreMenu ? <Store onClose={() => setshowStoreMenu(false)}/> : <></>}
      </main>
      <SimpleFooter />
    </div>
  )
}

export default App
