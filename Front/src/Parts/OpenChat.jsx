import { MdFeaturedVideo, MdSpatialAudioOff} from 'react-icons/md'
import { CgMenuRight } from "react-icons/cg";
import { RiVideoAddFill} from 'react-icons/ri'
import {PiPhoneCallFill} from 'react-icons/pi'
import { useContext, useEffect, useState } from 'react';
import MsgContext from '../Cntxts/MsgsCntxt';
import AuthContext from '../Cntxts/Context';
import { toast } from 'sonner';
function OpenChat() {

//   const {Users, Msgs, setMsgs, unseenMsgs, setUnseenMsgs, selectedUser, setTargetUser, sendMsg
//  } = useContext(MsgContext);

 const {onlineUsers} = useContext(AuthContext)
 const { selectedUser, sendMsg, msgs } = useContext(MsgContext)
  const [msgTxts, setMsgTxts] = useState("");
  // const [allChat, setChat] = useState([]);
// console.log("SLCTD:", selectedUser);
// console.log("online:", onlineUsers);
// console.log("MSGS:", getSelectedUserMsgs(selectedUser));

  console.log("MSGS:", msgs);
  
  return (
    <div className=" flex-1 flex-col h-screen overflow-y-scroll border-r border-gray-400">
      {/* Hdr */}
      <div className="flex justify-between h-14 p-4 text-gray-700">
        {/* Left */}
        <div className="flex gap-3">
            <div className="rounded-full w-12 h-12 overflow-hidden justify-center bg-blue-700/80 text-gray-100 flex items-center">
                    {
                      selectedUser?.uProPic ? <img src={selectedUser.uProPic} alt={selectedUser.uFullName} className='w-full h-full rounded-full' /> :
                      <h2 className="text-xl font-bold">
                        {selectedUser?.uFullName.slice(0,1)}
                        </h2>
                    }
            </div>
            <div className='flex-col flex flex-1' >
                    <h2 className="text-2xl font-semibold w-full">{selectedUser.uFullName}
                      
                    </h2>
                    <p className="text-sm text-gray-700 ">
                      {onlineUsers.includes(selectedUser._id) ? 'connected' : 'disconnected'} </p>
            </div>
        </div>

        {/* RIght */}
        <div className="flex justify-between gap-8">
            <button className="text-xl font-semibold cursor-pointer"><PiPhoneCallFill/></button>
            <button className="text-xl font-semibold cursor-pointer"><RiVideoAddFill/> </button>
            <button className="text-xl font-semibold cursor-pointer"><CgMenuRight/></button>
        </div>
      </div>
    <hr className='w-full overflow-y-hidden border-b border-gray-400 mt-5 bg-gray-500 rounded-full opacity-50' />

         {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* Incoming */}
          {/* {
            getSelectedUserMsgs
          } */}
          <div className="flex items-end gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500"></div>

            <div className="max-w-[500px] bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-5 py-4">
              <p className="text-gray-900">
                {msgs.sndrId}
              </p>

              <span className="text-xs text-gray-500 mt-2 block">
                10:24 PM
              </span>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className=" ">
          <div className="flex items-center gap-x-4 border-y border-gray-400 px-5 py-3">
            
            <button className="text-2xl text-gray-700 hover:text-gray-900 hover:bg-gray-200 p-1 cursor-pointer transition">
              +
            </button>

            <input
              type="text"
              value={msgTxts}
              onChange={(a)=> setMsgTxts(a.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-500"
            />

            <button onClick={()=> sendMsg(msgTxts)} className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-medium">
              Send
            </button>
          </div>
        </div>
    </div>
  )
}

export default OpenChat
