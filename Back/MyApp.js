import express from 'express';
import cors from 'cors';
import http from 'http';
import { msgsRoutes, userRoutes } from './Routes/Routes.js';
import { connectDB } from './DB/dbConnection.js';
import { configDotenv } from 'dotenv';
import { Server } from 'socket.io';

configDotenv();

const myApp = express();
myApp.use(express.json());
myApp.use(cors());

const myServer = http.createServer(myApp);

export const socketio = new Server(myServer, {
    cors: { origin: "*" }
});

export const userSKTMap = {};

socketio.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected!", userId);

    if (userId) {
        userSKTMap[userId] = socket.id;
        socketio.emit("getOnlineUsers", Object.keys(userSKTMap));
    }

    socket.on("disconnect", () => {
        console.log("Disconnected!", userId);
        delete userSKTMap[userId];
        socketio.emit("getOnlineUsers", Object.keys(userSKTMap));
    });
});

connectDB();

myApp.get('/', (req, res) => res.send("Hello World"));
myApp.use("/user", userRoutes);
myApp.use("/msgs", msgsRoutes);

const port = process.env.APP_PORT || 3700;

myServer.listen(port, () => {
    console.log(`myApp is running on port ${port}`);
});