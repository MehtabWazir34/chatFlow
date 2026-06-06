import { createContext, useEffect, useState } from "react";
import {API_INSTANCE} from '../Utls/API'
import { io } from 'socket.io-client'
const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userAuth, setUserAuth] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null)

    const checkUserAuth = async()=>{
        try {
            let {data} = await API_INSTANCE.get("/user/check-auth");
            if(data){
                setUserAuth(data.user)
                socketConnection( data.user);
            }
            console.log("DATA:", data);
            
        } catch (error) {
            console.log("ERR-AUTH:", error.message);  
            setUserAuth(null)
            setToken(null)
            localStorage.removeItem("token")
            // delete API_INSTANCE.defaults.headers.common["Authorization"]          
        }   
    }
    const SIGNup = async(inData)=>{
        try {
            let {data} = await API_INSTANCE.post("/user/create", inData);
            setUserAuth(data.user);
            setToken(data.token);
            API_INSTANCE.defaults.headers.common["token"] = data.token
            localStorage.setItem("token", data.token);
            console.log("SIGNUP_data", data);
        } catch (error) {
            console.log("SIGNUP_ERR:", error.message);  
        }
    }
    const LogIN = async(inData)=>{
        try {
            let {data} = await API_INSTANCE.post("/user/login", inData);
            setUserAuth(data.user);
            setToken(data.token);
            API_INSTANCE.defaults.headers.common["token"] = data.token
            localStorage.setItem("token", data.token);
            
        } catch (error) {
            console.log("ERR_LOGIN", error.message);
            
        }
    }
    const getProfile = async()=>{
        if(userAuth){
            let rsp = await API_INSTANCE.get('/user/profile');
            console.log("PROFILE:", rsp.data);  
        }
    }
    const LogOut = ()=>{
        localStorage.removeItem("token")
        setToken(null);
        delete API_INSTANCE.defaults.headers.common["token"];
        setUserAuth(null);
        setOnlineUsers([]);
        socket.disconnect();
        // navigateTO('/login')
    }
    const editInfo = async(body)=>{
        try {
            let resp = await API_INSTANCE.put('/user/update', body, {
                headers:{ "Content-Type": "multipart/form-data"}
            });
            setUserAuth(resp.data.user)
            console.log("RES_EDIT;", resp.data);
            console.log("RES_EDIT AXIOS;", API_INSTANCE.defaults.headers.common);

            // navigateTO('/')
        } catch (error) {
            console.log("ERR-EDIT", error.message);
        }
    }
    const socketConnection = ((userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket = io(import.meta.env.VITE_API_URL, {
            query: { userId: userData._id}
        });
        setSocket(newSocket.connect());
        newSocket.on("getOnlineUsers", (allUserIds)=>{
            setOnlineUsers(allUserIds);
        })
    })
   // Context.jsx
useEffect(() => {
    // const getME = ()=>{
        console.log("TOKEN", token);
        
        // const storedToken = localStorage.getItem("token");
        setToken(localStorage.getItem("token"));
        if (token) {
            API_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            checkUserAuth();
        }
    // }
    // getME()
}, []);

    const values = { API_INSTANCE, 
        onlineUsers, userAuth, setUserAuth, socket, LogOut , editInfo, getProfile, LogIN, SIGNup
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;