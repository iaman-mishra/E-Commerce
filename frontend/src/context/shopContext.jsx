import { createContext, useState } from "react";
import { products } from "../assets/assets.js";
export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [ShowSearch, SetShowSearch] = useState(false);
  const [Search, SetSearch] = useState("");
  return (
    <shopContext.Provider value={{ currency, delivery_fee, products, Search, SetSearch, ShowSearch, SetShowSearch }}>
      {children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
