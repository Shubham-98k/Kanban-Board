import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

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
