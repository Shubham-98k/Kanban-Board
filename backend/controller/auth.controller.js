import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
    const { name, email, password, profileImageUrl, adminJoinCode } = req.body

    if (!name || !password || !email || !adminJoinCode){
        return res.status(400).json( {message: "All fields are required" } )
    }

    /* check if user already exist */
    const isAlreadyExist = await User.findOne({email})
    
    if(isAlreadyExist){
        return res.status(400).json({message: "User already exists"})
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
        res.status(500).json({message: error.message()})
    }

}