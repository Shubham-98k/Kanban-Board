import jwt from "jsonwebtoken"
import { errorhandler } from "./error.js"

export const verifyToken = (req,res,next) =>{
const token = req.cookies.access_token
if (!token){
    return next(errorhandler(401,"Unauthorized"))
}

jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
        return next(errorhandler(401,"Unauthorized"))
    }

    req.user = user

    next()
})
}

export const adminOnly = (req,res,next) =>{
    console.log("DEBUG - User Object:", req.user);
    if(req.user && req.user.role?.toLowerCase() === "admin"){
        next()
    }else{
        return next(errorhandler(403,"Access Denied, admin only!"))
    }
}