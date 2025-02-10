import { createContext } from "react";
import { products } from "../assets/assets.js";
export const shopContext=createContext();

const ShopContextProvider=({children})=>{
    const currency='₹'
    const delivery_fee=50;
    return(
        <shopContext.Provider value={{currency,delivery_fee,products}}>
            {children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider;