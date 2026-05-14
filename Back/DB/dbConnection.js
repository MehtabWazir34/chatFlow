import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOME)
        console.log("Connected to DB");
    } catch (error) {
        console.log("Faild to connectDB", error.message);
        
    }
}