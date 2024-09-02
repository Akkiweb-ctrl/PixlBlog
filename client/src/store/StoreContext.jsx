import { createContext } from "react";

export const StoreContext = createContext({})


const StoreContextProvider = ({children}) =>{
     const url = "https://pixlblog-nr1m.onrender.com/"
    
    const contextValue = {
        url
    }
    return <StoreContext.Provider value = {contextValue}>
        {children}
    </StoreContext.Provider>

}
export default StoreContextProvider;