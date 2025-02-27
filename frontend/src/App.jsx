//Imporing Dependencies
import React from "react"
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

//Import Components & Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Verify from "./pages/Verify";



const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/placeorder" element={<PlaceOrder/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route ></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
