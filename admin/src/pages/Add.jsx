import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const add = ({ token }) => {
  const [image1, SetImage1] = useState(false);
  const [image2, SetImage2] = useState(false);
  const [image3, SetImage3] = useState(false);
  const [image4, SetImage4] = useState(false);

  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [price, SetPrice] = useState("");
  const [category, SetCategory] = useState("Men");
  const [subCategory, SetSubCategory] = useState("Topwear");
  const [bestseller, SetBestseller] = useState(false);
  const [sizes, SetSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(); // for storing the data
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // Can not send array directly so we convert it to string
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const respone = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (respone.data.sucess) {
        toast.success(respone.data.message);
        // Reset form fields to default values
        SetName("");
        SetDescription("");
        SetPrice("");
        SetCategory("Men");
        SetSubCategory("Topwear");
        SetBestseller(false);
        SetSizes([]);
        SetImage1(false);
        SetImage2(false);
        SetImage3(false);
        SetImage4(false);
      } else {
        toast.error(respone.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => SetImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => SetImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => SetImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => SetImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 border border-solid border-[#c2c2c2] rounded-[4px]"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 border border-solid border-[#c2c2c2] rounded-[4px]"
          type="text"
          placeholder="Type here"
          value={description}
          onChange={(e) => SetDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2 border border-solid border-[#c2c2c2]"
            name=""
            value={category}
            onChange={(e) => SetCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2 border border-solid border-[#c2c2c2]"
            name=""
            value={subCategory}
            onChange={(e) => SetSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px] border border-solid border-[#c2c2c2] rounded-[4px]"
            type="number"
            placeholder="Type here"
            value={price}
            onChange={(e) => SetPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              SetSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }>
            <p
              className={`${
                sizes.includes("S") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              S
            </p>
          </div>
          <div
            onClick={() =>
              SetSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }>
            <p
              className={`${
                sizes.includes("M") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              M
            </p>
          </div>
          <div
            onClick={() =>
              SetSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }>
            <p
              className={`${
                sizes.includes("L") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              L
            </p>
          </div>
          <div
            onClick={() =>
              SetSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }>
            <p
              className={`${
                sizes.includes("XL") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              XL
            </p>
          </div>
          <div
            onClick={() =>
              SetSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }>
            <p
              className={`${
                sizes.includes("XXL") ? "bg-black text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => SetBestseller(!bestseller)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default add;
