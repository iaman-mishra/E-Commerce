import express from 'express';
import {placeOrder, placeOrderStripe, placeOrderRazoprpay, allOrders, userOrders, updateOrderStatus, verifyStripe} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';


const orderRouter = express.Router();

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateOrderStatus);

orderRouter.post('/place', userAuth, placeOrder)
orderRouter.post('/stripe', userAuth, placeOrderStripe)
orderRouter.post('/razorpay', userAuth, placeOrderRazoprpay);
orderRouter.post('/userorders', userAuth, userOrders);

// verify payment
orderRouter.post('/verify', userAuth, verifyStripe);

export default orderRouter;