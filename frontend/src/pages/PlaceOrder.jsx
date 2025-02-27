import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { shopContext } from "../context/shopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [PayMethod, SetPayMethod] = useState("cod");
  const { navigate, backendUrl, token, CartItem, SetCartItem, GetCartAmount, delivery_fee, products } = useContext(shopContext);

  const [formData, SetFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    SetFormData({ ...formData, [name]: value });
  };

  const initPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        console.log(response);
        try {
          const {data} = await axios.post(backendUrl+ "/api/order/verifyRazorpay",response,{headers:{token}});
          if (data.success) {
            SetCartItem({})
            navigate('/orders')
            toast.success(data.message);
          }else{
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Please login to proceed");
        navigate('/login');
        return;
      }
      let orderItems = [];
      for (const items in CartItem) {
        for (const item in CartItem[items]) {
          if (CartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = CartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: GetCartAmount() + delivery_fee,
      };

      switch (PayMethod) {

        // API CALL FOR CASH ON DELIVERY
        case "cod": {
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (response.data.success) {
            SetCartItem({});
            toast.success(response.data.message);
            navigate('/orders')
          }else{
            toast.error(response.data.message);
          }
          break;
        }

        // API CALL FOR STRIPE PAYMENT METHOD
        case "stripe":{
          const toastId = toast.loading("Please wait...");
          const responseStripe =await axios.post(backendUrl+ "/api/order/stripe", orderData, { headers: { token } });
          if (responseStripe.data.success) {
            toast.update(toastId, { render: "Redirecting", type: "success", isLoading: false, autoClose: 3000 });
            const {session_url} = responseStripe.data;
            window.location.replace(session_url)
          }else{
            toast.update(toastId, { render: "responseStripe.data.message", type: "success", isLoading: false, autoClose: 3000 });
          }
          break
        }

        // API CALL FOR RAZORPAY PAYMENT METHOD
        case "razorpay":{
          const toastId = toast.loading("Please wait...");
          const responseRazorpay = await axios.post(backendUrl+"/api/order/razorpay", orderData, { headers: { token } });
          if (responseRazorpay.data.success) {
            toast.update(toastId, { render: "Redirecting", type: "success", isLoading: false, autoClose: 3000 });
            console.log(responseRazorpay.data.order);
            initPay(responseRazorpay.data.order);
          }
        }

        default:{
          break;
        }
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* adress details */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title
            text1={"DELIVERY"}
            text2={"INFORMATION"}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          required
        />
      </div>

      {/* order summary */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title
            text1={"PAYMENT"}
            text2={"METHOD"}
          />
        </div>

        {/* payment methods */}
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => SetPayMethod("stripe")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${PayMethod === "stripe" ? "bg-green-400" : ""}`}></p>
            <img
              className="h-5 mx-4"
              src={assets.stripe_logo}
              alt=""
            />
          </div>
          <div
            onClick={() => SetPayMethod("razorpay")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${PayMethod === "razorpay" ? "bg-green-400" : ""}`}></p>
            <img
              className="h-5 mx-4"
              src={assets.razorpay_logo}
              alt=""
            />
          </div>
          <div
            onClick={() => SetPayMethod("cod")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${PayMethod === "cod" ? "bg-green-400" : ""}`}></p>
            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            className="bg-black text-white px-16 py-3 text-sm"
            type="submit">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
