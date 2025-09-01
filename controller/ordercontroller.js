import OrderModel from "../models/ordermodel.js";
import Stripe from "stripe";
import userModel from "../models/usermodel.js";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {

    const frontendUrl = "http://localhost:5173";
    const { address, items, amount } = req.body.order_data;

    try {
        const newOrder = new OrderModel({
            userid: req.body.userId,
            items: items,
            amount: amount,
            address: address
        })

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_item = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*130
            },
            quantity: item.quantity
        }));

        line_item.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Shipping Charges"
                },
                unit_amount: 2*100*130
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: "payment",
            success_url: `${frontendUrl}/verify?seccess=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?seccess=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, sessionUrl: session.url })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Placing Order" });
    }
}

const VerifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    
    try {
        if (success === "true") {
            
            await OrderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        } else {
            await OrderModel.findByIdAndDelete(orderId, { payment: "Not Paid" })
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Not Paid"})
    }

}

const userOrder = async(req, res)=>{
    try {
        console.log(req.body.userId)
        const orders = await OrderModel.find({userid:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const AllOrder = async(req, res)=>{
    try {
        const allorder = await OrderModel.find();
        res.json({success:true,data:allorder});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export { placeOrder, VerifyOrder,userOrder,AllOrder }