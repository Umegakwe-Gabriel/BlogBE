import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const URL: string = process.env.DB_STRING!;
export const db = ()=>{
    try {
        mongoose.connect(URL).then(()=>{
            console.log("Connected...");    
        })
    } catch (error) {
        console.log(error)
    }
}