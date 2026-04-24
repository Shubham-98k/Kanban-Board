import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorhandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

export const signin = async (req, res, next) => {
    try{
        const {email,password}= req.body
        
        if(!email || !password || email ==="" || password ===""){
            return next(errorhandler(400,"All fields are required"))
        }

        const validUser = await User.findOne({email})

        if(!validUser){
            return next(errorhandler(404,"User not found"))
        }

        //Compare Password
        const validPassword = bcryptjs.compareSync(password,validUser.password)

        if(!validPassword){
            return next(errorhandler(400,"Wrong credentials"))
        }

        //Creating session
        //Create a JWT token
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET)

        //send everything to user expect password, so destructure that and send only rest
        const {password:pass,...rest} = validUser._doc

        res.status(200).cookie("access_token", token, { httpOnly:true }).json(rest)

    }catch(error){
        next(error)
    } 
}

export const userProfile = async (req, res, next) => {
try{
const user = await User.findById(req.user.id)

if(!user){
    return next(errorhandler(404,"User does not exist"))
}

//if user exist then we will return everything except password
const {password:pass,...rest} = user._doc

res.status(200).json(rest)

}catch(error){
    next(error)
}
}

export const updateUserProfile = async (req,res,next) =>{
    try{

        const user = await User.findById(req.user.id)

        if(!user){
            return next(errorhandler(404, "User not found"))
        }

        //if we get a new name with a req if will change that else we will keep the same user name in the database 
        user.name = req.body.name || user.name

         user.email = req.body.email || user.email

        // if we get to chnage the password then we will have to first hash it and then store it 
         if(req.body.password){
            const hashedpassword = bcryptjs.hashSync(req.body.password,10)
            user.password = hashedpassword 
         }
         
         // then save the changes in the database
         const updateUser = await user.save()

         // res with everything except password
         const {password: pass, ...rest} = user._doc
        
         res.status(200).json(rest)

    }catch(error){
        next(error)
    }
}

export const uploadImage = async (req,res,next)=>{
    try{
        if(!req.file){
            return next(errorhandler(400,"No file uploaded"))
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
            req.file.filename
        }`

        res.status(200).json({imageUrl})

    }catch(error){
        next(error)
    }
}