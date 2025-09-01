import mongoose from "mongoose";

const OrderSchama = new mongoose.Schema({
    userid: {type:String, required:true},
    items : {type:Array, required:true},
    amount : {type:Number, required:true},
    address : {type:Object, required:true},
    status : {type:String, default:"Food Pocessing"},
    data : {type:Date, default:Date.now()},
    payment: {type:Boolean, default:false},
})

const OrderModel =mongoose.models.order || mongoose.model('order',OrderSchama)

export default OrderModel;