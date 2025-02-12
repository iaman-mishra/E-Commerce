import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import {useLocation} from 'react-router-dom';

const SearchBar = () => {

  const { Search, SetSearch, ShowSearch, SetShowSearch } =useContext(shopContext);
  const [visible,SetVisible]=useState(false)
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname.includes('collection')) {
      SetVisible(true);
    } else {
      SetVisible(false);
    }
  },[location])
  
  

  return ShowSearch && visible ? (

    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-500 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          className="flex-1 outline-none bg-inherit text-sm "
          value={Search}
          placeholder="Search here"
          onChange={(e) => {
            SetSearch(e.target.value);
          }}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        onClick={() => {
          SetShowSearch(false);
        }}
        className="w-3 inline cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>

  ) : null;

};

export default SearchBar;
