import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('/profile').then(({data}) => {
            setUser(data)
        }) // get user data from server, then set the user info as that data
    }, [])
    const value = { user, setUser }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}