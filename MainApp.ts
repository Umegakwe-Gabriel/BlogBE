import express, {Application} from "express"
import cors from "cors"
import auth from "./router/authRouter"

export const mainApp = (app: Application)=>{
    app.use(cors())
    .use(express.json())
    .use("/api/v1/auth", auth)
    
}