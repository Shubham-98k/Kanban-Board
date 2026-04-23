import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database is connected")
}).catch((err)=>{
    console.log(err)
})

const app = express()

/* Middleware to handle CORS */
app.use(cors(
    {
        origin: process.env.FRONT_END_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
))

/* Middleware to handle JSON object in the req body */
app.use(express.json())


app.listen(5175,() => {
    console.log("server started on 5175")
})

//configure cookieParser
app.use(cookieParser())

// Middleware for auth
app.use("/api/auth", authRoutes)

//Middleware to handle erros
app.use((err,req,res,next) =>{
const statusCode = err.statusCode || 500
const message = err.message || "Internal Server Error"
res.status(statusCode).json({success:false, statusCode, message})
})