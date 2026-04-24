import Task from "../models/task.model.js"
import User from "../models/user.model.js"

export const getUsers = async (req, res, next) =>{
    try{
        const users = await User.find({role:"user"}).select("-password")

        const usersWithTaskCounts = await Promise.all(
            users.map(async(user)=>{

                const pendingTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Pending"
                })

                const inProgressTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "In Progress"
                })

                const completedTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Completed"
                })
                return {
                    //already excluded password from user object
                ...users._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks
                }
            })

        )

        res.status(200).json(usersWithTaskCounts)
    } catch(error){
        next(error)
    }
}