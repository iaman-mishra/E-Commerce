import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{ type:String, required:true },
  description:{ type:String, required:true },
  price:{ type:Number, required:true},
  images:{ type:Array, required:true },
  category:{ type:String, required:true},
  subCategory:{type:String, required:true },
  sizes: {type:Array, required:true },
  bestSeller:{ type:Boolean, default:false },
  date:{type:Number, require:true}
});

const productModel = mongoose.model("product",productSchema) || mongoose.models.product;

export default productModel;