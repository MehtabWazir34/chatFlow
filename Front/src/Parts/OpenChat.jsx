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

 const {onlineUsers, userAuth} = useContext(AuthContext)
 const { selectedUser, sendMsg, msgs } = useContext(MsgContext)
  const [msgTxts, setMsgTxts] = useState("");
  const [msgImgFile, setMsgImgFile] = useState(null);
  const [showImgFile, setShowImgFile] = useState(null);
  const [chatFilePREVIEW, setChatFILEPReview] = useState(null);
  const [viewFile, setFIleVIew] = useState(null);
  // console.log("online:", onlineUsers);
  // console.log("MSGS:", getSelectedUserMsgs(selectedUser));
  
  // console.log("SLCTDusr:", selectedUser);
  console.log("MSGS:", msgs);
  const sendNEWMSg = ()=>{
    const msgData = new FormData();
    msgData.append("msgTxts", msgTxts);
    if(msgImgFile){
      msgData.append("msgImg", msgImgFile)
    }
    sendMsg(msgData)
    setShowImgFile(null);
    setMsgImgFile(null)
    setMsgTxts('')
  }

  useEffect(()=> {
    if(!msgImgFile){
      setShowImgFile(null);
      return;
    }
    const imgURL = URL.createObjectURL(msgImgFile);
    setShowImgFile(imgURL);
    return ()=> URL.revokeObjectURL(imgURL)
  }, [msgImgFile])

  const showFile = (imgURL)=>{
    // const imgURL = URL.createObjectURL(selectedImg);
    setFIleVIew(imgURL);
    // return ()=> URL.revokeObjectURL(imgURL);
  }

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
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
    {msgs.length === 0
        ? <p className="text-center text-gray-500 text-sm">No messages yet</p>
        : msgs.map((msg) => {
            const isMine = msg.sndrId === userAuth?._id;
            return (
                <div key={msg._id} className={`flex items-end gap-3 ${isMine ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 overflow-hidden">
                        {isMine
                            ? userAuth?.uProPic && <img src={userAuth.uProPic} className="w-full h-full object-cover" />
                            : selectedUser?.uProPic && <img src={selectedUser.uProPic} className="w-full h-full object-cover" />
                        }
                    </div>
                    <div className={`w-[60%] p-1 rounded-sm ${isMine ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-white/10 border border-white/10 text-gray-900 rounded-bl-sm'}`}>
                        {msg.msgImg && <img onClick={()=> showFile(msg.msgImg)} src={msg.msgImg} className="rounded-sm mb-2 cursor-pointer w-[full] h-[full]" />}
                        {msg.msgTxts && <p className="text-sm">{msg.msgTxts}</p>}
                        <span className="text-xs opacity-60 mt-1 block text-right">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <br />
                        {msg.msgSeen && isMine && <span >Seen</span>  }
                        </span>
                    </div>
                    
                </div>
                
            );
        })
    }
</div>

        {/* Message Input */}
          {
                        viewFile && (
                          <div className='max-w-4/12 mx-auto flex flex-col align-middle justify-center max-h-4/5 bg-gray-600/65 fixed top-10 right-1 z-50 inset-0 rounded-sm px-4 py-2'>
                            <span onClick={()=> setFIleVIew(null)} className='absolute -right-1 top-0 rounded-full px-2 py-1 text-center  cursor-pointer hover:bg-black bg-black/60 transition-colors duration-200 ' >x</span>
                            <img onClick={()=> setFIleVIew(!viewFile)} src={viewFile} alt="viewFile" className='max-w-full max-h-full rounded-sm' />
                          </div>
                        )
                      }
        <div className=" ">
          {
            showImgFile && ( <div className='mx-auto w-20 h-20 rounded-sm p-0.5
            border border-gray-400'>
                <img src={showImgFile} alt="msgImg" className='w-full h-full rounded-sm' />
            </div> )
          }
          <div className="flex items-center gap-x-4 border-y border-gray-400 px-5 py-3">
            <input type="file" onClick={(a)=> setMsgImgFile(a.target.files)} className="text-2xl text-gray-700 hover:text-gray-900 hover:bg-gray-200 p-1 cursor-pointer transition hidden" id='msgImg' />
            <label htmlFor="msgImg" className="text-2xl text-gray-700 hover:text-gray-900 hover:bg-gray-200 p-1 cursor-pointer transition">+</label>

            <input
              type="text"
              value={msgTxts}
              onChange={(a)=> setMsgTxts(a.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-500"
            />

            <button onClick={sendNEWMSg} className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-medium">
              Send
            </button>
          </div>
        </div>
    </div>

)

}

export default OpenChat
