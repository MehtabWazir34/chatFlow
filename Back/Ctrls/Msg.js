import cloudinary from "../Cnfg/Cloudinary.js";
import { msgModel, uModel } from "../Models/theUSER.js";
import { socketio, userSKTMap } from "../MyApp.js";

export const allUsrMsgCtrl = async (req, res) => {
    try {
        const myId = req.user._id;
        const fltrUsers = await uModel.find({ _id: { $ne: myId } }).select("-uPassword");
        const unseenMsgs = {};
        const lastMsgTime = {}; // ✅ new

        const prms = fltrUsers.map(async (eachUser) => {
            const allMsgs = await msgModel.find({ sndrId: eachUser._id, rcvrId: myId, msgSeen: false });
            if (allMsgs.length > 0) {
                unseenMsgs[eachUser._id] = allMsgs.length;
            }

            // ✅ Get the most recent message between me and this user (either direction)
            const lastMsg = await msgModel.findOne({
                $or: [
                    { sndrId: eachUser._id, rcvrId: myId },
                    { sndrId: myId, rcvrId: eachUser._id }
                ]
            }).sort({ createdAt: -1 });

            lastMsgTime[eachUser._id] = lastMsg ? lastMsg.createdAt : null;
        });

        await Promise.all(prms);

        // ✅ Sort: unseen first, then by latest message time
        const sortedUsers = fltrUsers.sort((a, b) => {
            const aUnseen = unseenMsgs[a._id] || 0;
            const bUnseen = unseenMsgs[b._id] || 0;

            if (aUnseen > 0 && bUnseen === 0) return -1;
            if (bUnseen > 0 && aUnseen === 0) return 1;

            const aTime = lastMsgTime[a._id] ? new Date(lastMsgTime[a._id]) : new Date(0);
            const bTime = lastMsgTime[b._id] ? new Date(lastMsgTime[b._id]) : new Date(0);
            return bTime - aTime; // latest first
        });

        res.status(200).json({ Msg: "Success", success: true, users: sortedUsers, unseenMsgs });
    } catch (error) {
        res.status(500).json({ Msg: "Failed msg!", Err: error.message });
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

        res.status(200).json({Msg:"Success", success:true,  chat:bothSideMsgs})
    } catch (error) {
        res.status(401).json({Msg:"Failed msg!", Err:error.message})
        
    }
}

// Send msg
export const sndMsg = async(req, res)=>{

    try {
        const {msgTxts} = req.body;
        const msgImg  = req.file?.path;
        // if(!msgTxts){
        //     return res.status(401).json({Msg:"Can't sent empty msg"})
        // }
        const sndrId = req.user._id;
        const rcvrId = req.params.id;
        let imgURL;
        if(msgImg){
            const uploadImg = await cloudinary.uploader.upload(msgImg)
            imgURL = uploadImg.secure_url;
                };
        let newMsg = await msgModel.create({
            sndrId, rcvrId, msgTxts, msgImg: imgURL
        });
        let rcvrSKTId = userSKTMap[rcvrId];
        if(rcvrSKTId){
            socketio.to(rcvrSKTId).emit("newMsg", newMsg);
        }
        console.log("SEND BODY:", req.body);   // is msgTxts here?
        console.log("SEND FILE:", req.file);   // is image here?
        return res.status(200).json({Msg:"Msg send!", success: true, newMsg, msgImg: imgURL})
    } catch (error) {
        res.json({Msg:"Failed msg snd", ERR: error.message})
        
    }
}
// seen updates
export const msgSeenStatus = async(req, res)=>{
    try {
        const {id} = req.params;
        await msgModel.findByIdAndUpdate(id, {msgSeen: true}, {new: true});
        res.status(200).json({Msg:"Seen updated", success: true})
    } catch (error) {
        res.status(401).json({Msg:"Failed seen updates", ERR: error.message})
    }
}
export const dltMSG = async (req, res) => {
    try {
        const msgId = req.params.id;
        const userId = req.user._id;

        // Make sure user can only delete their own messages
        const msg = await msgModel.findById(msgId);
        if (!msg) {
            return res.status(404).json({ Msg: "Message not found" });
        }
        if (msg.sndrId.toString() !== userId.toString()) {
            return res.status(403).json({ Msg: "Not authorized to delete this message" });
        }

        const msgDeleted = await msgModel.findByIdAndDelete(msgId);
        return res.status(200).json({ Msg: "Deleted", success: true, msgDeleted });

    } catch (error) {
        console.log("DLT ERR:", error.message);
        res.status(500).json({ Msg: "Failed msgDLT", ERR: error.message });
    }
};
