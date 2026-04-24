import multer from 'multer'

//Configure storage
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null,"uploads/")
    },
    filename: (req, file, callback)=>{
        const cleanName = file.originalname.replace(/\s+/g, '_');
        callback(null,`${Date.now()}-${cleanName}`)
    }
    })

    //file filter
    const fileFilter = (req,file,callback)=>{
        const allowedTypes = ["image/jpeg","image/png","image/jpg"]

        if(allowedTypes.includes(file.mimetype)) {
            callback(null,true)
        } else {
            callback(new Error("Only .jpeg, .jpg & .png formats are allowed"),false)
        }
    }

    const upload = multer({storage,fileFilter})

    export default upload
