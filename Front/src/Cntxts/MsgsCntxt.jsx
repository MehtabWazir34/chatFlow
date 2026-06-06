import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./Context";
import { API_INSTANCE } from "../Utls/API";
import { toast } from "sonner";

const MsgContext = createContext();

export const MsgProvider = ({children})=>{
    const [unseenMsgs, setUnseenMsgs] = useState({});
    const [Users, setUsers] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const {socket} = useContext(AuthContext);

    const getAllUsers = async()=>{
        try {
            const {data} = await API_INSTANCE.get("msg/users/");
            if(data.success){
                setUsers(data.users)
                setUnseenMsgs(data.unseenMsgs);
            }
        } catch (error) {
            console.log("ERR_ALLUSRs", error.message);
            
        }
    }

    const getSelectedUserMsgs = async(userId)=>{
        try {
            const {data} = await API_INSTANCE.post(`/msg/${userId}`);
            if(data.success){
                setMsgs(data.chat)
            }
        } catch (error) {
            console.log("MSG-Send", error.message);
        }
    }
    const sendMsg = async(msgData)=>{
        try {
            const {data} = await API_INSTANCE.post(`/msg/send-msg/${selectedUser._id}`, msgData);
            if(data.success){
                setMsgs((preMsgs)=> [...preMsgs, data.newMsg])
                toast.success("Msg sent")
            } else {
                toast.error("Failed to sent msg")
            }
        } catch (error) {
            console.log("MSG-Send", error.message);
            toast.error("Msg not sent")
        }
    }
    // Open chat msg retrievl
    const getInstantLiveMsg = async()=>{
        try {
            if(!socket) return;
            socket.on("newMsg", (newMsg)=>{
                if(selectedUser && newMsg.sndrId === selectedUser._id){
                    newMsg.msgSeen = true;
                    setMsgs((preMsgs)=> [...preMsgs, newMsg]);
                    API_INSTANCE.put(`/msg/msgseen-mark/${newMsg._id}`)
                } 
                // if slctduser chat is not open
                else {
                    setUnseenMsgs((preUnseenMsgs)=>(
                        {
                            ...preUnseenMsgs, [newMsg.sndrId] :
                            preUnseenMsgs[newMsg.sndrId] ? preUnseenMsgs[newMsg.sndrId] + 1 : 1
                        }
                    ))
                }
            })
        } catch (error) {
            console.log("MSG-Send", error.message);
            toast.error("Msg not sent")
        }
    }
    const getOffMsg = async()=>{
        if(socket) socket.off("newMsg");
    }

    useEffect(()=>{
        getInstantLiveMsg();
        return ()=> getOffMsg();
    }, [socket, selectedUser])

    const values = {
        Users, msgs, setMsgs, unseenMsgs, setUnseenMsgs, sendMsg, selectedUser, setSelectedUser
    }
    return (
        <MsgContext.Provider value={values}>
            {children}
        </MsgContext.Provider>
    )
}
export default MsgContext;