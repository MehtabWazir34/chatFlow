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
    const {socket, userAuth} = useContext(AuthContext);

    const getAllUsers = async()=>{
        try {
            const {data} = await API_INSTANCE.get("/msgs/users");
            if(data){
                setUsers(data.users)
                setUnseenMsgs(data.unseenMsgs);
            }
        } catch (error) {
            console.log("ERR_ALLUSRs", error.message);
            
        }
    }

    useEffect(()=>{
        if(userAuth){
            getAllUsers();
        }
    }, [userAuth])
    const getSelectedUserMsgs = async(userId)=>{
        try {
            const {data} = await API_INSTANCE.get(`/msgs/${userId}`);
            if(data.success){
                setMsgs(data.chat)
                // console.log("CHAT:", data.chat);
                
            }
        } catch (error) {
            console.log("GETMSGs", error.message);
        }
    }
    const sendMsg = async(msgData)=>{
        try {
            const {data} = await API_INSTANCE.post(`/msgs/send-msg/${selectedUser._id}`, msgData);
            if(data.success){
                setMsgs((preMsgs)=> [...preMsgs, data.newMsg])
                toast.success("Msg sent")
                console.log("DATA:", msgData);
                
            } 
            else {
                toast.error("Failed to sent msg")
                console.error("SNDFaild:", msgData);
                
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
                    API_INSTANCE.put(`/msgs/msgseen-mark/${newMsg._id}`)
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
    const deleteMsg = async(msgID)=>{
        
        const {data} = await API_INSTANCE.delete(`/msgs/dlt-msg/${msgID}`);
        if(data.success){
            setMsgs((pre)=> pre.filter((msg)=> msg._id !== msgID))
            toast.success("Msg deleted")
        } else {
            toast.error("Failed msgdlt")
        }
    };

    useEffect(()=>{
        if(selectedUser){
            getSelectedUserMsgs(selectedUser._id)
            if(unseenMsgs[selectedUser._id]){
                setUnseenMsgs((preMsgs)=>{
                    let updateSeen = {...preMsgs};
                    delete updateSeen[selectedUser._id];
                    return updateSeen
                })
            }
        }
    }, [selectedUser]);
    useEffect(()=>{
        getInstantLiveMsg();
        return ()=> getOffMsg();
    }, [socket, selectedUser])

    const values = { getAllUsers,
        Users, msgs, setMsgs, unseenMsgs, setUnseenMsgs, sendMsg, selectedUser, setSelectedUser, deleteMsg
    }
    return (
        <MsgContext.Provider value={values}>
            {children}
        </MsgContext.Provider>
    )
}
export default MsgContext;