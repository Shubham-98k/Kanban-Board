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
        default:"https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.freepik.com%2Ficon%2Fuser_3177440&ved=0CBYQjRxqFwoTCOiZlvThgZQDFQAAAAAdAAAAABAG&opi=89978449",
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
