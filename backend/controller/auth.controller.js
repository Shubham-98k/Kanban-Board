import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js"

export const signup = async (req, res, next) => {
    const { name, email, password, profileImageUrl, adminJoinCode } = req.body

    if (!name || !password || !email || !adminJoinCode){
        return next(errorhandler(400,"All fields are required"))
    }

    /* check if user already exist */
    const isAlreadyExist = await User.findOne({email})
    
    if(isAlreadyExist){
        return next(errorhandler(400,"User already exists"))
    }

    //check user role 
    let role="user"
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role = "admin"
    }

    const hashedpassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
        name:name,
        email,
        password:hashedpassword,
        profileImageUrl,
        role,
    })
    
    try{
        await newUser.save()
        res.json("signup successful")
    } catch(error){
        next(errorhandler(500,error.message))
    }

}