import {Request, Response} from "express"
import authModel from "../model/authModel"
import bcrypt from "bcrypt"
import cloudinary from "../config/cloudinary"

export const createUser = async(req: Request, res: Response)=>{
    try {
        const {email, password, userName, avatar} = req.body;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);

        const {public_id, secure_url} = await cloudinary.uploader.upload(
            req.file?.path!,
        )

        const user = await authModel.create({
            email, password: hash, userName, avatar: secure_url, avatarID: public_id
        });

        res.status(201).json({message: "user created", data: user})
    } catch (error) {
        res.status(404).json({message: "Unable to create user"})
    }
}

export const viewUser = async(req: Request, res: Response)=>{
    try {
        const user = await authModel.find();

        res.status(201).json({message: "view one user" , data: user})
    } catch (error) {
        res.status(404).json({
            message: "Unable to view one user"
        })
    }
}

export const updateOneUser = async(req: Request, res: Response)=>{
    try {
        const {userName} = req.body
        const {userID} = req.params
        const user = await  authModel.findByIdAndUpdate(
            userID,
            {
                userName
            },
            {new: true}
        )
        res.status(201).json({
            message: "updated one user",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            message: "Unable to update one user"
        })
    }
}

export const viewOneUsr = async(req: Request, res: Response) =>{
    try {
        const {userID} = req.params;;
        const user = await authModel .findById(userID);

        return res.status(200).json({message: "view user", data: user})
    } catch (error) {
        return res.status(404).json({message: "unable to view user"})
    }
}
export const signInUser = async(req: Request, res: Response) =>{
    const {email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await authModel.findOne({ email })
    try {
    if (user) {
        const checkPassword = await bcrypt.compare(password, user?.password!)

        if (checkPassword!) {
            return res.status(201).json({
                message: "createedd user", data: user._id
            })
        } else {
            res.status(404).json({
                message: "User's password is not correct"
            })
        }
    } else {
        res.status(404).json({
            message: "User's doesn't exit"
        })
    }
    } catch (error) {
        return res.status(404).json({message: "unable to create user"})
    }
}