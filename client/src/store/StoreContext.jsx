import { createContext } from "react";

export const StoreContext = createContext({})


const StoreContextProvider = ({children}) =>{
     const url = "https://pixl-blog-api.vercel.app"
    
    const contextValue = {
        url
    }
    return <StoreContext.Provider value = {contextValue}>
        {children}
    </StoreContext.Provider>

}
export default StoreContextProvider;