import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import path from 'path';
import { specs,swaggerUI } from "./swagger.js";

const app = express();
dotenv.config({
    path:'./env'
})

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

 app.use(express.json({limit:"16kb"}));  
 app.use(express.urlencoded({extended:true, limit:"16kb"}));
 app.use(express.static(path.join(process.cwd(), "public")));
 app.use(cookieParser());


//  routes import
import userRouter from './routes/user.routes.js';


// routes declartion 
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs,{explorer:true}));
app.use("/api/v1/users",userRouter);



export {app};