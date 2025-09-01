import express from 'express';
import authMiddleware from "../middleware/auth.js";
import { addToCart,removeFromCart,getCart,getCartData } from "../controller/cartcontroller.js";
import authMiddlewareforget from '../middleware/authforget.js';


const addtocartRoute = express.Router();

addtocartRoute.post('/add',authMiddleware, addToCart);
addtocartRoute.post('/remove',authMiddleware, removeFromCart);
addtocartRoute.post('/get',authMiddleware,getCart);
addtocartRoute.post('/getdata',authMiddlewareforget,getCartData);

export default addtocartRoute;