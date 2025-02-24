import express from 'express';
import {addToCart,updateCart,getUserCart} from '../controllers/cartController.ja';
import userAuth from '../middleware/userAuth';

const cartRouter = express.Router();

cartRouter.post('/get',userAuth, getUserCart);
cartRouter.post('/add',userAuth, addToCart);
cartRouter.post('/update',userAuth, updateCart);

export default cartRouter; 