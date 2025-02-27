
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Gateway Initiallization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const currency = 'inr'
const deliveryCharges = 50


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
    try {

        const { userId, items, amount,address} = req.body;
        const { origin } = req.headers;
        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({

            price_data:{
                currency: currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity

        }))

        line_items.push({

            price_data:{
                currency: currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1

        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}


const verifyStripe = async (req, res) => {
    const {orderId , success, userId} = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true}); // update order payment status to paid
            await userModel.findByIdAndUpdate(userId,{cartData:{}}) // clear cart data after sucessfull payment
            res.json({success:true , message: 'Payment Successfull'})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false , message: 'Payment failed'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
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
        res.json({success:true, orders })
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

export {placeOrder, placeOrderStripe, placeOrderRazoprpay, allOrders, userOrders, updateOrderStatus, verifyStripe};