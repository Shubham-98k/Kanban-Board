import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageUrl:{
        type: String,
        default:"https://e7.pngegg.com/pngimages/161/384/png-clipart-johnson-legal-pc-attorneys-at-law-lawyer-sales-corporation-service-login-button-blue-face.png",
    },
    role:{
        type: String,
        enum:["admin","user"],
        default: "user",
    },
},{timestamps:true}
)

const User = mongoose.model("User",userSchema)

export default User
