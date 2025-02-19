import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';


const userLogin = async () => {

};

const registerUser = async (req, res) => {
  try {
    const {name, email, password}=req.body;
    
    // checking for duplicate email
    const exists = await userModel.findOne({email});
    if (exists) {
        return res.json({success:false, message: "User already exists" });
    }
    
    // checking valid email and password
    if(!validator.isEmail(email)){
        return res.json({success:false, message: "Enter a valid email" });
    }
    if(password.length<8){
        return res.json({success:false, message: "Enter a strong password"})
    }

    // Hashing user password
    const salt= await bcrypt.genSalt(10) // salt genration
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        name,
        email,
        password:hashedPassword
    })

    const result = await newUser.save()
    res.json({success:true, message: "User created successfully" ,result})

  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async () => {
 
};

export {userLogin , registerUser, adminLogin};