import express from 'express';
import cors from 'cors';
import http, { createServer } from 'http';
import { msgsRoutes, userRoutes } from './Routes/Routes.js';
import { log } from 'console';
import { connectDB } from './DB/dbConnection.js';
import { configDotenv } from 'dotenv';
import { Server } from 'socket.io';
configDotenv()
const myApp = express();
myApp.use(express.json())
myApp.use(cors());
const myServer = http.createServer(myApp);

export const socketio = new Server(myServer, cors({origin: "*"}))
// cors({
//     origin: process.env.myFRONTURL || 'http://localhost:5173',
//     credentials: true
// });
export const userSKTMap = {};
socketio.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("Usr connected!", userId);
    
    if(userId) return userSKTMap[userId] = socket.id;

    socketio.on("disconnect", ()=>{
        console.log("Disconnected!", userId);
        delete userSKTMap[userId];
        socketio.emit("getOnlineUsers", Object.keys(userSKTMap))
        
    })
})

connectDB();
myApp.get('/',(req,res)=>{
    res.send("Hello World");
});
myApp.use("/user", userRoutes)
myApp.use("/msgs", msgsRoutes)
let port = process.env.APP_PORT || 3700;
console.log("PORT", port)
myApp.listen(port,()=>{
    console.log(`myApp is running on port ${port}`);
})