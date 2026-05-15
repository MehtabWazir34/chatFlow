import mongoose from 'mongoose';

const userSCHEMA = new mongoose.Schema({

    uUserName:{type: String, 
        required : true, 
        unique:true },
    uFullName:{type: String, 
        required : true, },
    uBio:{type: String, required : true },
    uEmail:{type: String, required : true },
    uPassword:{
        type: String, required : true, 
        minlength:6
        // ,
        // maxlength:[12, 'Max 12 characters allowed'] 
    },
    uProPic:{ type: String}
}, {timestamps: true})

export const uModel = mongoose.model("ModelUser", userSCHEMA);
const msgsSchema = new mongoose.Schema({
    sndrId:{
        type:[mongoose.Schema.Types.ObjectId], required : true, ref:'uModel'
    },
    rcvrId:{
        type:[mongoose.Schema.Types.ObjectId], required : true, ref:'uModel'
    },
    msgSeen:{
        type: Boolean, default: false
    },
    msgTxts:{ type: String},
    msgImg:{type:String}
}, {timestamps: true});
export const msgModel = mongoose.model("Message", msgsSchema);