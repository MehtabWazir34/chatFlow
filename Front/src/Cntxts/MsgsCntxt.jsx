import { createContext, useState } from "react";
import AuthContext from "./Context";
import { API_INSTANCE } from "../Utls/API";

export const msgContext = createContext();

const chatContextProvider = ({children})=>{

    const [Users, setUsers] = useState([]);
    const [unseenMsgs, setUnseenMsgs] = useState({});
    const [Msgs, setMsgs] = useState([]);
    const [targetUser, setTargetUser] = useState(null);
    const {socket} = AuthContext();


    const getUsers = async()=>{
        try {
            const {data } = await API_INSTANCE.get('/msgs/users');
            if(data.success){
                setUsers(data.users)
                setUnseenMsgs(data.unseenMsgs)
            }
        } catch (error) {
            console.log("GEtUSERS-chatContext!", error);
            
        }
    };
    const getChat = async(usrId)=>{
        try {
            const {data} = await API_INSTANCE.get(`/msgs/${usrId}`);
            if(data.success){
                setMsgs(data.chat)
            }
        } catch (error) {
            console.log("GEtChat-chatContext!", error);        
        }
    };
    const sendMsg = async(newMsgData)=>{
        try {
            const {data} = await API_INSTANCE.post(`/msgs/send-msg/${targetUser._id}`, newMsgData);
            if(data.success){
                setMsgs((preChat)=> [...preChat, data.newMsg])
            }
        } catch (error) {
            console.log("sndMsg-chatContext!", error);        

        }
    }
    const values = {

    }
    return (
        <chatContextProvider.Provider value={values} >
            {children}
        </chatContextProvider.Provider>
    )
}
export default chatContextProvider;