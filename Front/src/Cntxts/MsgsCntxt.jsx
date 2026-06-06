import { createContext, useContext, useState } from "react";
import AuthContext from "./Context";
import { API_INSTANCE } from "../Utls/API";

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
            }
        } catch (error) {
            console.log("MSG-Send", error.message);
        }
    }
    const values = {}
    return (
        <MsgContext.Provider value={values}>
            {children}
        </MsgContext.Provider>
    )
}
export default MsgContext;