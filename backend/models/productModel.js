import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{ type:String, required:true },
  description:{ type:String, required:true },
  price:{ type:Number, required:true},
  image:{ type:String, required:true },
  category:{ type:String, required:true},
  sybCategory:{type:String, required:true },
  sizes: {type:Array, required:true },
  bestSeller:{ type:Boolean, default:false },
});

const productModel = mongoose.model("product",productSchema) || mongoose.models.product;

export default productModel;