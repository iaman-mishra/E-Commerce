import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {shopContext} from '../context/shopContext.jsx'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const{}=useContext(shopContext);
  const{ShowSearch,SetShowSearch,GetCartCount,token,SetToken,navigate,SetCartItem}=useContext(shopContext)

  const logoutHandler=()=>{
    localStorage.removeItem("token")
    SetToken("")
    SetCartItem({})
    navigate("/login")
    
  }

  return (
    <div className="flex items-center justify-between font-medium py-5">

        <Link to='/'><h1 className="text-3xl logo font-bold">EVOQUE</h1></Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700 fill-black }" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700 fill-black" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700 fill-black" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="hidden w-2/4 border-none h-[1.5px] bg-gray-700 fill-black" />
        </NavLink>

        <a href="https://evoque-admin.vercel.app/" target="_blank" className="border px-5 text-xs py-1 rounded-full -mt-2 ">
          <p className="mt-1">Admin Panel</p>
        </a>

        
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
          onClick={()=>{SetShowSearch(!ShowSearch)}}
        />

        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
            onClick={()=>{token ? null : navigate("/login") }}
          />

          {token ?
            <div className="dropdown-menu group-hover:block  hidden absolute right-0 pt-4 ">
              <div className="flex flex-col gap-2 w-max p-4 bg-slate-100 rounded-lg shadow-lg text-gray-500">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>{navigate("/orders")}} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logoutHandler} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          : null }

        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {GetCartCount()}
          </p>
        </Link>

        <img
          onClick={() => {
            setMenuOpen(true);
          }}
          src={assets.menu_icon}
          alt="menu-open"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/*Mobile Menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          menuOpen ? "w-full" : "w-0"
        } shadow-lg`}
      >
        <div className="flex flex-col text-gray-600">
          <div onClick={()=>{setMenuOpen(false)}} className="flex items-center gap-4 pt-5 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} alt="menu-close" className="h-4 rotate-180"/>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>{setMenuOpen(false)}} className='pl-6 p-2 border' to="/" >HOME</NavLink>
          <NavLink onClick={()=>{setMenuOpen(false)}} className='pl-6 p-2 border' to="/collection" >COLLECTION</NavLink>
          <NavLink onClick={()=>{setMenuOpen(false)}} className='pl-6 p-2 border' to="/about" >ABOUT</NavLink>
          <NavLink onClick={()=>{setMenuOpen(false)}} className='pl-6 p-2 border' to="/contact" >CONTACT</NavLink>
          <a href="https://evoque-admin.vercel.app/" target="_blank" lassName='border'>
            <p className="pl-6 p-2">Admin Panel</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
