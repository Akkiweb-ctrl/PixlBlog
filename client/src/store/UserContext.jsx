import { createContext, useState } from "react";

export const UserContext = createContext({})


const UserContextProvider = ({children}) =>{
    const [user,setUser] = useState({
        name:'',
        _id:'',
        email:''
    });
    const updateUser = (value) =>{
        setUser(value);
    }
    const contextValue = {
        user,
        updateUser
    }
    return <UserContext.Provider value = {contextValue}>
        {children}
    </UserContext.Provider>

}
export default UserContextProvider;