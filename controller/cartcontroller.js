
import userModel from "../models/usermodel.js";

const addToCart = async (req, res) => {
    try {
        
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Added to Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in Adding to Cart"})
    }
}

const removeFromCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true, message:"Removed from Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in Removing from Cart"})
    }
    
}

const getCartData = async(req, res)=>{
    
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in Getting Cart Data"})
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error in Getting Cart Data"})
    }
}

export { addToCart,removeFromCart,getCart,getCartData };