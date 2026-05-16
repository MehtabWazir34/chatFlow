import { Router } from "express";
import { editInfo, getProfile, logIn, Logout, signUP } from "../Ctrls/User.js";
import { MiddleChk } from "../MdlWre/MiddleChk.js";
import { allUsrMsgCtrl, msgSeenStatus, sndMsg, twoPartyMsgs } from "../Ctrls/Msg.js";
import multer from "multer";
import fs from 'fs';
import path from "path";
console.log("ROUTeS");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const dir = "uploads/";
        if(!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
},
);

const upload = multer({ storage });
export const userRoutes = Router()
userRoutes.post("/user/create", (req, res, next) => {
    console.log("HIT /user/create"); // if this doesn't print, route is wrong
    next();
}, upload.single("uProPic"), signUP);
userRoutes.post('/login', logIn);
userRoutes.post('/logout', MiddleChk, Logout);
userRoutes.put("/update", MiddleChk, editInfo);
userRoutes.get("/profile", MiddleChk, getProfile)
userRoutes.get("/check-auth", MiddleChk, (req, res)=>(
    res.status(200).json({Msg:"All are okay!"})
))
export const msgsRoutes = Router();
msgsRoutes.get("/alluser", MiddleChk, allUsrMsgCtrl);
msgsRoutes.get("/:id", MiddleChk, twoPartyMsgs);
msgsRoutes.put("/msgseen-mark/:id", MiddleChk, msgSeenStatus);
msgsRoutes.post("/send-msg/:id", MiddleChk, sndMsg);