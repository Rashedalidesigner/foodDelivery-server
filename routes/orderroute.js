import express from "express";
import authMiddleware from "../middleware/auth.js";
import {placeOrder,VerifyOrder,userOrder,AllOrder} from "../controller/ordercontroller.js";





const OrderRoute = express.Router();

OrderRoute.post('/placeorder',authMiddleware, placeOrder);
OrderRoute.post('/verify',VerifyOrder)
OrderRoute.post("/userorder",authMiddleware,userOrder);
OrderRoute.get('/allorder',AllOrder);

export default OrderRoute;