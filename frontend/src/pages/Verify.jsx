import React, { useContext, useEffect } from "react";
import { shopContext } from "../context/shopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
const Verify = () => {
    const {navigate, token, SetCartItem, backendUrl} = useContext(shopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () =>{
        try {
            if(!token){
                return null
            }
            const response = await axios.post(backendUrl+"/api/order/verifyStripe",{success,orderId},{headers:{token}});
            if(response.data.success){
                SetCartItem({});
                navigate('/orders')
                toast.success(response.data.message)
            }else{
                navigate('/cart')
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[token])

  return <div>Conferming Payment</div>;
};

export default Verify;
