import jwt from "jsonwebtoken";
import { uModel } from "../Models/theUSER.js";

export const MiddleChk=async(req, res, next)=>{
    try {
        let hdr = await req.headers['authorization'];
        if(!hdr || !hdr.startsWith('Bearer ')){
            return res.status(401).json({Msg:"Err"})
        }
        let token = hdr.split(" ");
        if(!token){
            return res.status(401).json({Msg:"Err"})
        }
        let isUser = jwt.verify(token, `${process.env.myJWTScrt}`);
        if(!isUser){
        return res.status(401).json({Msg:"Err"})
        }
        let user = await uModel.findById(isUser.id).select('-uPassword');
        if(!user){
            return res.status(404).json({Msg:"Err"});
        };
        req.user = user;
        next();
    } catch (error) {
        console.log("MDLERR:", error.message);
        
    }
}