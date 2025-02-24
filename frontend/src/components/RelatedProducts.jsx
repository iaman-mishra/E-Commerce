import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subcategory }) => {
  const { products } = useContext(shopContext);
  const [RelatedProducts, SetRelatedProducts] = useState([]);

  useEffect(() => {
    if(products.length > 0){
        let relatedCopy = products.slice();        
        relatedCopy = relatedCopy.filter((item) => category === item.category);
        relatedCopy = relatedCopy.filter((item) => subcategory === item.subCategory);
        SetRelatedProducts(relatedCopy.slice(0,5));
    }
  }, [products]);

  return(
    <div className="my-24">
        <div className="text-center text-3xl py-2">
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
            {RelatedProducts.map((item,index)=>{
                return <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
            })}
        </div>
    </div>
  )
};

export default RelatedProducts;
