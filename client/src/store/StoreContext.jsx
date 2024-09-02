import { createContext } from "react";

export const StoreContext = createContext({})


const StoreContextProvider = ({children}) =>{
     const url = "http://localhost:3000"
    
    const contextValue = {
        url
    }
    return <StoreContext.Provider value = {contextValue}>
        {children}
    </StoreContext.Provider>

}
export default StoreContextProvider;