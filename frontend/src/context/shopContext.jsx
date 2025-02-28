import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, } from "react-router-dom";
import axios from 'axios';
export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  
  
  const navigate=useNavigate();
  const currency = "₹";
  const delivery_fee = 50;
  const [products,SetProducts]=useState([])
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const [ShowSearch, SetShowSearch] = useState(false);
  const [Search, SetSearch] = useState("");
  const [CartItem, SetCartItem] = useState({});
  const [token, SetToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"")



  const getUserCart = async (token) =>{
    try {
      const response = await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}});      
      if (response.data.success) {
        SetCartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      getUserCart(token);
    }
  },[]);

  const AddToCart = async (id, Size) => {
    if (!Size) {
      toast.error("Select Product Size");
      return;
    }

    const cartData = structuredClone(CartItem);

    if (cartData[id]) {
      if (cartData[id][Size]) {
        cartData[id][Size] += 1;
      } else {
        cartData[id][Size] = 1;
      }
    } else {
      cartData[id] = {};
      cartData[id][Size] = 1;
    }
    SetCartItem(cartData);
    toast.success("Product added to cart")
    if (token) {
      try {
        await axios.post(backendUrl+"/api/cart/add",{id,Size},{headers:{token}});
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };

  const updateQuantity = async (id, Size, quantity) => {

    let temp = structuredClone(CartItem);
    temp[id][Size] = quantity;
    SetCartItem(temp);

    if (token) {
      try {
        await axios.post(backendUrl+"/api/cart/update",{id,Size,quantity},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

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


  const GetCartAmount=()=>{
    let totalAmount = 0;
    for(const items in CartItem){
      let itemInfo=products.find((product)=>product._id===items);
      for(const item in CartItem[items]){
        try {
          if(CartItem[items][item]>0){
            totalAmount+=CartItem[items][item]*itemInfo.price;
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount;
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl+"/api/product/list");
      if(response.data.sucess){
        SetProducts(response.data.products);
      }else{
        toast.error("Error fetching products");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <shopContext.Provider
      value={{
        currency,
        delivery_fee,
        products,
        Search,
        SetSearch,
        ShowSearch,
        SetShowSearch,
        CartItem,
        AddToCart,
        GetCartCount,
        updateQuantity,
        GetCartAmount,
        navigate,
        token,
        SetToken,
        backendUrl,
        SetCartItem
      }}
    >
      {children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
