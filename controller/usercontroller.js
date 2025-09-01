import UserModel from "../models/usermodel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"; 
import validator from "validator";


/// login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email:email});

        if(!user){
            return res.json({success:false, message:"User Not Found"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true, message:"Login Success",token:token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


/// register user
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const existingUser = await UserModel.findOne({email:email});
        if(existingUser){
            return res.status(200).json({success:false, message:"User Already Exists"})
        }

        if(!validator.isEmail(email)){
            return res.status(200).json({success:false, message:"Please Enter Valid Email"})
        }

        if(password.length<8){
            return res.status(200).json({success:false, message:"please enter a Strong Password"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new UserModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, message:"Registration Success", token:token})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser};