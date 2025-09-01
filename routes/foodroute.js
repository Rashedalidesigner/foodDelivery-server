import express from "express";
import { addFood,listfood,removefood } from "../controller/foodcontroller.js";
import multer from "multer";


const foodRouter = express.Router();
/// image storeage engin

const storeage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage:storeage})

foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listfood);
foodRouter.post("/remove",removefood)



export default foodRouter