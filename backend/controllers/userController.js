import dotenv from 'dotenv';
dotenv.config();
import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

const userLogin = async (req,res) => {
    try {
        const {email, password}=req.body;
        
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.json({success:false, message: 'User with this email does not exist'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true , message: 'User logged in successfully', token});
        }else{
            return res.json({success:false, message: 'Invalid credentials'});
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error login" })
    }
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

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true, message: "User created successfully", token})

  } catch (error) {
    console.log(error);
    res.json({success:false, message: "Error creating user" })
  }
};

const adminLogin = async () => {
 
};

export {userLogin , registerUser, adminLogin};