import React from "react";
import { assets } from "../assets/assets.js";
const Footer = () => {
  return (
    <div>

        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
            <img className="mb-5 w-32" src={assets.logo} alt="logo" />
            <p className="w-full md:w-2/3 text-gray-600 text-justify">
                Welcome to our e-commerce store! We offer a wide range of products
                to meet all your needs. Stay connected with us for the latest
                updates and exclusive offers. Thank you for shopping with us!
            </p>
            </div>

            <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
            </div>

            <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+91-1234567890</li>
                <li>support@RatnaRoyals.in</li>
            </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025@ RatnaRoyals.in - All Rights Reserved.</p>
        </div>

    </div>
  );
};

export default Footer;
