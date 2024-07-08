import express from 'express'
import cors from 'cors'                         
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


//app config
//inialize app using express package
const app = express()
const port = process.env.PORT || 4000;



//add middleware
app.use(express.json())   //req is from frontend to backend theat will parse using this json
app.use(cors())           //we can access from backend to any frontend


//db connection
connectDB();


//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))   //mount the upload folder at endpoint /images
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

//we can req. data from server http method
app.get("/", (req, res) => {   
    res.send("API Working")
})


//to run express server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})


//mongodb+srv://savajdrashti2511:Alpa0106@cluster0.f89jgb8.mongodb.net/?