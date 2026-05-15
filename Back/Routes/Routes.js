import { Router } from "express";
import { editInfo, logIn, Logout, signUP } from "../Ctrls/User.js";
import { MiddleChk } from "../MdlWre/MiddleChk.js";
import { allUsrMsgCtrl, msgSeenStatus, sndMsg, twoPartyMsgs } from "../Ctrls/Msg.js";

export const userRoutes = Router();
userRoutes.post("/create", signUP);
userRoutes.post('/login', logIn);
userRoutes.post('/logout', MiddleChk, Logout);
userRoutes.put("/update", MiddleChk, editInfo);
userRoutes.get("/check-auth", MiddleChk, (req, res)=>(
    res.status(200).json({Msg:"All are okay!"})
))
export const msgsRoutes = Router();
msgsRoutes.get("/alluser", MiddleChk, allUsrMsgCtrl);
msgsRoutes.get("/:id", MiddleChk, twoPartyMsgs);
msgsRoutes.put("/msgseen-mark/:id", MiddleChk, msgSeenStatus);
msgsRoutes.post("/send-msg/:id", MiddleChk, sndMsg);