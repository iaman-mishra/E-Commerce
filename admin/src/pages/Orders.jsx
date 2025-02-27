import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  const [Orders, SetOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        SetOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e , orderId) => {
    try {
      if(!token){
        return null;
      }
      const response = await axios.post(backendUrl + "/api/order/status", {orderId, status:e.target.value}, {headers:{token}})
      if(response.data.success){
        await fetchOrders();
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token]);

  console.log(Orders);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {Orders.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-sm text-gray-700">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-12"
              />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity} <span>{item.size} </span>,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street}, </p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>Mob: {order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Payment Method: {order.paymentMethod}</p>
                <p>Pyment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {currency} {order.amount}
              </p>
              <select
                name=""
                id=""
                className="p-2 font-semibold"
                value={order.status}
                onChange={(e)=>{statusHandler(e,order._id)}}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packaging">Packaging</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
