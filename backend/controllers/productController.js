import { v2 } from "cloudinary";
import productModel from "../models/productModel.js";

// function to add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 ? req.files.image1[0] : undefined;
    const image2 = req.files.image2 ? req.files.image2[0] : undefined;
    const image3 = req.files.image3 ? req.files.image3[0] : undefined;
    const image4 = req.files.image4 ? req.files.image4[0] : undefined;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await v2.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      images: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);

    await product.save();

    res.json({ sucess: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred while adding the product",
    });
  }
};

// function to get all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ sucess: true, products });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function to remove product
const removeProduct = async (req, res) => {};

// function to get a single product
const singleProduct = async (req, res) => {};

export { addProduct, listProduct, removeProduct, singleProduct };
