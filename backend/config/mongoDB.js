import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {

        mongoose.connection.on('connected',()=>{
            console.log('MongoDB connected');
        })
        
        mongoose.connection.off('disconnected',()=>{
            console.log('MongoDB disconnected');
        })

        await mongoose.connect(process.env.MONGODB_URI);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;
