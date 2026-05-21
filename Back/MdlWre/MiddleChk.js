import jwt from "jsonwebtoken";
import { uModel } from "../Models/theUSER.js";
import dotenv from 'dotenv'
dotenv.config()
export const MiddleChk = async (req, res, next) => {
    try {
        const hdr = req.headers['authorization'];
        if (!hdr || !hdr.startsWith('Bearer ')) {
            return res.status(401).json({ Msg: "No token provided" });
        }

        const token = hdr.split(" ")[1]; // ← just the token string

        const isUser = jwt.verify(token, process.env.myJWTScrt);
        console.log("DCODED USER:", isUser);
        
        if (!isUser) {
            return res.status(401).json({ Msg: "Invalid token" });
        }

        const user = await uModel.findById(isUser.id).select('-uPassword');
        if (!user) {
            return res.status(404).json({ Msg: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("MDLERR:", error.message);
        return res.status(401).json({ Msg: "Invalid token", ERR: error.message });
    }
};