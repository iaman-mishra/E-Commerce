import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, CartItem, updateQuantity, navigate } = useContext(shopContext);
  const [CartData, SetCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in CartItem) {
        for (const item in CartItem[items]) {
          if (CartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              sizes: item,
              quantity: CartItem[items][item],
            });
          }
        }
      }
      SetCartData(tempData);
    }

  },[CartItem,products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {CartData.map((item, index) => {
          const product = products.find((product) => product._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cold-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={product.images[0]}
                  alt="not found"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {product.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.sizes}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                className="border max-w-1 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) => e.target.value ==='' || e.target.value ==='0' ? null : updateQuantity(item._id, item.sizes, parseInt(e.target.value))}
              />
              <img
                src={assets.bin_icon}
                alt=""
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() => updateQuantity(item._id, item.sizes, 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()=>navigate('/placeorder')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
