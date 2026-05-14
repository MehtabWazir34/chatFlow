import express from 'express';
import cors from 'cors';
import http, { createServer } from 'http';
import { userRoutes } from './Routes/User.js';
import { log } from 'console';
import { connectDB } from './DB/dbConnection.js';
import { configDotenv } from 'dotenv';
const myApp = express();
myApp.use(express.json())
myApp.use(cors());
const myServer = http.createServer(myApp);

cors({
    origin: process.env.myFRONTURL || 'http://localhost:5173',
    credentials: true
});

configDotenv()
connectDB();
myApp.get('/',(req,res)=>{
    res.send("Hello World");
});
myApp.use("/user", userRoutes)
let port = process.env.APP_PORT || 3700;
console.log("PORT", port)
myApp.listen(port,()=>{
    console.log(`myApp is running on port ${port}`);
})