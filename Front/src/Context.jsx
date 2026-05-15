import { Children, createContext, useEffect, useState } from "react";
import {API_INSTANCE} from './Utls/API'
import { io } from 'socket.io-client'
const AuthContext = createContext();

export const AuthProvider = ({Children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userAuth, setUserAuth] = useState(false);
    const [onlineUser, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null)

    const checkUserAuth = async()=>{
        try {
            let respnse = await API_INSTANCE.get("/user/check-auth");
            setUserAuth(respnse.user || respnse.data.user)
            socketConnection(respnse.data.user || respnse.user);
        } catch (error) {
            console.log("ERRAUTH:", error.message);            
        }   
    }
    const socketConnection = ((userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket = io(API_INSTANCE, {
            query: { userId: userData._id}
        });
        setSocket(newSocket.connect());
        newSocket.on("getOnlineUsers", (allUserIds)=>{
            setOnlineUsers(allUserIds);
        })
    })
    useEffect(()=>{
        checkUserAuth();
    }, );

    const values = {
        onlineUser, userAuth, socket, 
    }
    return(
        <AuthContext.Provider value={values}>
            {Children}
        </AuthContext.Provider>
    )
}