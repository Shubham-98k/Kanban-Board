import Task from "../models/task.model.js"
import { errorhandler } from "../utils/error.js"

export const createTask = async (req,res,next) =>{
    try{
        const {title, description, priority, dueDate, assignedTo, attachments, todoChecklist } = req.body
        
        if(!Array.isArray(assignedTo)){
            return next(errorhandler(400,"assignedTo must be an array of user IDs"))
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            attachements,
            todoChecklist,
            assignedTo,
            createdBy: req.user.id,
        })
        res.status(200).json({message:"Task created sucessfully", task})
    }catch(error){
        next(error)
    }
}