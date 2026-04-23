import express from "express"
import { signin, signup, userProfile } from "../controller/auth.controller.js"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post("/sign-up", signup)

router.post("/sign-in", signin)

router.get("/user-profile", verifyToken , adminOnly, userProfile)

export default router