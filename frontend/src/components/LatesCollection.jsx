import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopContext } from "../context/shopContext";
import ProductItem from "./ProductItem";

const LatesCollection = () => {
  const { products } = useContext(shopContext);
  const [LatestProducts, SetLatestProducts] = useState([]);

  useEffect(() => {
    SetLatestProducts(products.slice(0, 10));
  }, []);

  console.log(LatestProducts);

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
          nemo sequi ex officia harum,
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
        {LatestProducts.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatesCollection;
