import { createContext, useState } from "react";

export const UserContext = createContext({})


const UserContextProvider = ({children}) =>{
    const [loggedIn,setLoggedIn] = useState(false);
    const [user,setUser] = useState({
        name:'',
        _id:'',
        email:'',
    });
    const updateUser = (value) =>{
        setUser(value);
    }
    const contextValue = {
        user,
        updateUser,
        loggedIn,
        setLoggedIn
    }
    return <UserContext.Provider value = {contextValue}>
        {children}
    </UserContext.Provider>

}
export default UserContextProvider;