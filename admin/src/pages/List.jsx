import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = ({token}) => {

  const[list,SetList]=useState([]);

  const fetchList = async ()=>{
    try {
      const response = await axios.get(backendUrl+"/api/product/list");
      if (response.data.sucess) {
        SetList(response.data.products);
      }else{
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}});
      if (response.data.sucess) {
        toast.success(response.data.message);
        await fetchList();
      }else{
        toast.error("Unable to remove product");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchList();
  },[]);

  return (
  
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* Headings of list */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Products List */}
        {list.map((item,index)=>{
          return(
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' >
              <img className='w-[50%]' src={item.images[0]} alt="Not found" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>{removeProduct(item._id)}} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          )
        })}

      </div>
    </>
  )
}

export default List