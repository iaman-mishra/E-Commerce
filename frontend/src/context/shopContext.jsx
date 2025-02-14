import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const [ShowSearch, SetShowSearch] = useState(false);
  const [Search, SetSearch] = useState("");
  const [CartItem, SetCartItem] = useState({});


  const AddToCart = async (id,Size) => {

    if (!Size) {
      toast.error('Select Product Size');
      return;
    }

    const cartData = structuredClone(CartItem);

    if (cartData[id]) {
      if (cartData[id][Size]) {
        cartData[id][Size] += 1;
      } 
      else {
        cartData[id][Size] = 1;
      }
    } 
    else {
      cartData[id] = {};
      cartData[id][Size] = 1;
    }
    SetCartItem(cartData);
  };

  const GetCartCount = () => {
    let TotalCount = 0;
    for (const items in CartItem) {
      for (const item in CartItem[items]) {
        try {
          if (CartItem[items][item] > 0) {
            TotalCount += CartItem[items][item];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return TotalCount;
  };


  return (
    <shopContext.Provider value={{ currency, delivery_fee, products, Search, SetSearch, ShowSearch, SetShowSearch, CartItem, AddToCart, GetCartCount}}>
      {children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
