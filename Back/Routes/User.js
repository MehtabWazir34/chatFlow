import { Router } from "express";
import { editInfo, logIn, Logout, signUP } from "../Ctrls/User.js";
import { MiddleChk } from "../MdlWre/MiddleChk.js";

export const userRoutes = Router();
userRoutes.post("/create", signUP);
userRoutes.post('/login', logIn);
userRoutes.post('/logout', MiddleChk, Logout);
userRoutes.put("/update",MiddleChk, editInfo);