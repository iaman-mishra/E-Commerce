import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ type:String ,required :true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    cartData:{type:Object, default:{}}
},{minimize:false}) // minimze false prevent mongoose to stop default nature of removing empty objects

const userModel = mongoose.model('user',userSchema) || mongoose.model.user;

export default userModel