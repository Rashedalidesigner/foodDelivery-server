import mongoose from "mongoose";

export const connectdb = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://rashedalidesigner:Rashed56&gh@cluster0.acye2f9.mongodb.net/food-delivery?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('Db connected'));
    } catch (error) {
        console.log(error)   
    }
}