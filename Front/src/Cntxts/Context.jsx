import { createContext, useEffect, useState } from "react";
import { API_INSTANCE } from '../Utls/API';
import { io } from 'socket.io-client';
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userAuth, setUserAuth] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const checkUserAuth = async () => {
        try {
            let { data } = await API_INSTANCE.get("/user/check-auth");
            if (data) {
                setUserAuth(data.user);
                socketConnection(data.user);
            }
        } catch (error) {
            console.log("ERR-AUTH:", error.message);
            setUserAuth(null);
            setToken(null);
            localStorage.removeItem("token");
            delete API_INSTANCE.defaults.headers.common["Authorization"];
        }
    };

    const SIGNup = async (myFormData) => {
        try {
            let { data } = await API_INSTANCE.post("/user/create", myFormData);
            if (data.success) {
                setUserAuth(data.user);
                setToken(data.token);
                API_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("token", data.token);
                toast.success("Account Created");
            }
        } catch (error) {
            toast.error("Signup failed");
            console.log("SIGNUP_ERR:", error.message);
        }
    };

    const LogIN = async (myFormData) => {
        try {
            let { data } = await API_INSTANCE.post("/user/login", myFormData);
            if (data.success) {
                setUserAuth(data.user);
                setToken(data.token);
                API_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                localStorage.setItem("token", data.token);
                toast.success("Logged In");
            }
        } catch (error) {
            console.log("ERR_LOGIN", error.message);
            toast.error("Login failed");
        }
    };

    const LogOut = () => {
        localStorage.removeItem("token");
        setToken(null);
        delete API_INSTANCE.defaults.headers.common["Authorization"];
        setUserAuth(null);
        setOnlineUsers([]);
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    };

    const editInfo = async (body) => {
        try {
            let resp = await API_INSTANCE.put('/user/update', body, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setUserAuth(resp.data.user);
            toast.success("Profile updated");
        } catch (error) {
            console.log("ERR-EDIT", error.message);
            toast.error("Update failed");
        }
    };

    const socketConnection = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(import.meta.env.VITE_API_URL, {
            query: { userId: userData._id }
        });
        setSocket(newSocket); // ✅ not newSocket.connect()
        newSocket.on("getOnlineUsers", (allUserIds) => {
            setOnlineUsers(allUserIds);
        });
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            API_INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
            checkUserAuth();
        }
    }, []);

    const values = {
        onlineUsers, userAuth, setUserAuth,
        socket, LogOut, editInfo, LogIN, SIGNup
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;