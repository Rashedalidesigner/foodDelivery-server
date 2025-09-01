import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodroute.js";
import userRouter from "./routes/userroute.js";
import 'dotenv/config'
import addtocartRoute from "./routes/addtocartroute.js";
import OrderRoute from "./routes/orderroute.js";

const app = express();
const port = 4000;

app.use(express.json())
app.use(cors())

// db connected 
connectdb()
// add router

app.use('/api/food' ,foodRouter)
app.use('/api/user' ,userRouter)
app.use("/images",express.static('uploads'))
app.use('/api/cart', addtocartRoute)
app.use('/api/order',OrderRoute)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server is Started on http://localhost:${port}`)
})


///mongodb+srv://rashedalidesigner:<db_password>@cluster0.acye2f9.mongodb.net/?