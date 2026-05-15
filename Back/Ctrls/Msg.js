import cloudinary from "../Cnfg/Cloudinary.js";
import { msgModel, uModel } from "../Models/theUSER.js";
import { socketio, userSKTMap } from "../MyApp.js";

export const allUsrMsgCtrl = async(req, res)=>{
    try {
        let myId = req.user._id;
        // Get all users except that one rcvr.
        const fltrUsers = await uModel.find({_id:{$ne:myId}}).select("-uPassword");
        const unseenMsgs = {};
        const prms = fltrUsers.map(async(eachUser)=>{
            const allMsgs = await msgModel.find({sndrId: eachUser._id, rcvrId: myId, msgSeen: false});
            if(allMsgs.length > 0){
                unseenMsgs[eachUser._id] = allMsgs.length;
            }
        });
        await Promise.all(prms);
        res.status(200).json({Msg:"Success", fltrUsers, unseenMsgs})
    } catch (error) {
        res.status(401).json({Msg:"Failed msg!", Err:error.message})
    }
};

// Msgs b/w two users
export const twoPartyMsgs = async(req, res)=>{
    try {
        const { id: otherUsrId} = req.params;
        const myId = req.user._id;
        const bothSideMsgs = await msgModel.find({ 
            $or:[
            {sndrId: myId, rcvrId: otherUsrId},
            {sndrId: otherUsrId, rcvrId: myId}
        ]});
        await msgModel.updateMany({sndrId: otherUsrId, rcvrId: myId}, {msgSeen: true});

        res.status(200).json({Msg:"Success", bothSideMsgs})
    } catch (error) {
        res.status(401).json({Msg:"Failed msg!", Err:error.message})
        
    }
}

// Send msg
export const sndMsg = async(req, res)=>{
    try {
        const {msgTxts, msgImg} = req.body;
        const sndrId = req.user._id;
        const rcvrId = req.params.id;
        let imgURL;
        if(msgImg){
            imgURL = (await cloudinary.uploader.upload(msgImg)).secure_url;
                };
        let newMsg = await msgModel.create({
            sndrId, rcvrId, msgTxts, msgImg: imgURL
        });
        let rcvrSKTId = userSKTMap[rcvrId];
        if(rcvrSKTId){
            socketio.to(rcvrSKTId).emit("newMsg", newMsg);
        }
        res.status(200).json({Msg:"Msg send!", newMsg: newMsg, msgImg: imgURL})
    } catch (error) {
        res.json({Msg:"Failed msg snd", ERR: error.message})
    }
}
// seen updates
export const msgSeenStatus = async(req, res)=>{
    try {
        const {id} = req.params;
        await msgModel.findByIdAndUpdate(id, {msgSeen: true}, {new: true});
        res.status(200).json({Msg:"Seen updated"})
    } catch (error) {
        res.status(401).json({Msg:"Failed seen updates", ERR: error.message})
    }
}
