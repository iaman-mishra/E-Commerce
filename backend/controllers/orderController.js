import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


// Placing Order COD
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount,address} = req.body;
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}}) // This will clear the cart data of the user

        res.json({success:true, message: "Order Placed Successfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }

}

// Placing Order using Payment Gateway STRIPE
const placeOrderStripe = async (req, res) => {
    
}


// Placing Order using Payment GatewaY RAZORPAY
const placeOrderRazoprpay = async (req, res) => {
    
}


// All Orders data for admin pannel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}


// All Orders data for user frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}


// Order Status Update Admin Panel
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: 'Status Updated Successfully'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazoprpay, allOrders, userOrders, updateOrderStatus};