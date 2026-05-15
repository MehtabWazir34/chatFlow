import jwt from "jsonwebtoken";
import { uModel } from "../Models/theUSER.js";
import bcrypt from 'bcrypt'
import cloudinary from "../Cnfg/Cloudinary.js";

const genToken =(userId)=>{
    const token = jwt.sign({userId}, process.env.myJWTScrt)
    return token;
} 
export const signUP = async (req, res)=>{
    try {
        const { uUserName, uFullName, uEmail, uPassword, uBio, uProPic } = req.body;
        if( !uUserName || !uFullName || !uEmail || !uBio || !uPassword){
            return res.status(401).json({Msg: "All fields are required to create account."})
        };
        const lowerName = uUserName.toLowerCase()
        let user = await uModel.findOne({uUserName:lowerName});
        if(user){
            return res.status(401).json({Msg:"Username exists already!, try different name or login if its you."});
        } 
    
        const saltStr = await bcrypt.genSalt(10)
        const encPassword = await bcrypt.hash(uPassword, saltStr);
        const addUser = await uModel.create({
            uUserName: lowerName, uFullName, uBio, uPassword: encPassword, uEmail
        });
        let token = genToken(addUser._id);
        addUser.uPassword = undefined;
         return res.status(200).json({
            Msg:"Created ", 
            addUser,
            token
        })

    } catch (error) {
        res.status(500).json({
            Msg:"Failed to create account",
            ERR: error.message
        })
    }
}
export const logIn = async(req, res)=>{
    try {
        const {uEmail, uPassword} = req.body;
        if(!uEmail || !uPassword) return res.json({Msg:"Fill both the fields to login!"});
        let user = await uModel.findOne({uEmail});
        if(!user){
            return res.status(404).json({Msg:"User not found!, create account"});
            }
        
        let isPassCorrect = await bcrypt.compare(uPassword, user.uPassword);
        if(!isPassCorrect){
            return res.status(401).json({Msg:"Password not match"});
        }
        let token = genToken(user._id);
        user.uPassword = undefined;
        res.status(200).json({
            Msg:"Logged In",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            Msg:"Login failed",
            Err: error.message
        })
    }
};
export const Logout= async(req, res)=>{
    try {
        // await uModel.findByIdAndUpdate(req.user._id, {token:""})
        res.status(200).json({Msg:"Logged Out"})
    } catch (error) {
        return res.status(400).json({
            Msg:"Failed to logout",
            Err: error.message
        })
    }
}
export const editInfo = async(req, res)=>{
    try {
        let userId = req.params.id;
        const {uUserName, uFullName, uBio, uProPic} = req.body;
        if(!userId){
            return res.status(400).json({Msg:"Not found userId"});
       } 
       let updatedInfo;
       if(!uProPic){
        updatedInfo = await uModel.findByIdAndUpdate(userId,{uUserName, uFullName, uBio}, {new: true});
       } else {
        let uploadPic = await cloudinary.uploader.upload(uProPic)
        updatedInfo = await uModel.findByIdAndUpdate(userId, {uUserName, uFullName, uBio, uProPic: uploadPic.secure_url}, {new: true});
       }

        res.status(200).json({Msg:"Updated infor"}, updatedInfo)

    } catch (error) {
        res.status(500).json({Msg:"Failed to update info.", ERR: error.message})
    }
}