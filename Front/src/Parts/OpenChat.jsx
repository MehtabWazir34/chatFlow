import { MdFeaturedVideo } from 'react-icons/md'
import { RiVideoAddFill } from 'react-icons/ri'
import { PiPhoneCallFill } from 'react-icons/pi'
import { SlOptionsVertical } from "react-icons/sl";
import { CgMenuRight } from "react-icons/cg";
import { IoIosArrowRoundBack } from "react-icons/io";

import { useContext, useEffect, useRef, useState } from 'react';
import MsgContext from '../Cntxts/MsgsCntxt';
import AuthContext from '../Cntxts/Context';
import { useNavigate } from 'react-router-dom';

function OpenChat() {
    const { onlineUsers, userAuth } = useContext(AuthContext);
    const { selectedUser, setSelectedUser, sendMsg, msgs, deleteMsg } = useContext(MsgContext);

    const [msgTxts, setMsgTxts] = useState(""); //msg inpute txts
    const [msgImgFile, setMsgImgFile] = useState(null); //selct imgfile for msgImg
    const [previewMsgImgFile, setMsgImgPreview] = useState(null); //view Before sending msg
    const [viewMsgImgFile, setViewMsgImgFile] = useState(null); // Big onclick view after sending msg
    const [msgOpts, setMsgOpts] = useState(null); // msgs opts edit, delete, frwrd. stores msg._id, not boolean
    const bottomRef = useRef(null);

    // console.log("MSGIMG:", msgImgFile);
    
    // Auto scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs]);

    const sendNEWMSg = () => {
        if (!msgTxts && !msgImgFile) return;
        const msgData = new FormData();
        msgData.append("msgTxts", msgTxts);
        if (msgImgFile) msgData.append("msgImg", msgImgFile);
        sendMsg(msgData);
        setMsgImgPreview(null);
        setMsgImgFile(null);
        setMsgTxts('');
    };

    // Send on Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendNEWMSg();
        }
    };

    useEffect(() => {
        if (!msgImgFile) return; 
        const imgURL = URL.createObjectURL(msgImgFile);
        setMsgImgPreview(imgURL);

        return () => URL.revokeObjectURL(imgURL);
    }, [msgImgFile]);
    const navigateTo = useNavigate()
    const gotoProfile=()=>{
        navigateTo('/openprofile')
    }


    return (
        <div className="flex-1 flex flex-col min-h-screen md:h-screen md:border-r border-gray-400">
            {/* Header */}
            <div className="flex justify-between h-14 px-8 md:p-4 text-gray-700 bg-amber-100/50 sticky top-0">
                <div className="flex gap-3 items-center">
                    <span onClick={()=> setSelectedUser(null)} className=' hover:bg-gray-500/50 flex place-items-center text-center -ml-6 w-6 h-6 rounded-full p-0.5 cursor-pointer'><IoIosArrowRoundBack className='font-extrabold text-xl'/></span>
                    <div className="rounded-full w-10 h-10 overflow-hidden bg-blue-700/80 text-gray-100 flex items-center justify-center shrink-0">
                        {selectedUser?.uProPic
                            ? <img src={selectedUser.uProPic} alt={selectedUser.uFullName} className='w-full h-full object-cover' />
                            : <h2 className="text-xl font-bold">{selectedUser?.uFullName.slice(0, 1)}</h2>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <h2 className="text-md max-w-full font-semibold">{selectedUser?.uFullName}</h2>
                        <p className="text-xs text-gray-500">
                            {onlineUsers.includes(selectedUser?._id) ? '🟢 Online' : '⚫ Offline'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-xl cursor-pointer"><PiPhoneCallFill /></button>
                    <button className="text-xl cursor-pointer"><RiVideoAddFill /></button>
                    <button onClick={gotoProfile} className="text-xl cursor-pointer"><CgMenuRight /></button>
                </div>
            </div>

            <hr className='border-gray-400 opacity-50 hidden md:block' />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {msgs.length === 0
                    ? <p className="text-center text-gray-500 text-sm mt-10">No messages yet</p>
                    : msgs.map((msg) => {
                        const isMine = msg.sndrId === userAuth?._id;
                        const isOptsOpen = msgOpts === msg._id; // ✅ per message

                        return (
                            <div
                                key={msg._id}
                                className={` flex items-end gap-2 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                {/* Avatar */}
                                <div className="w-8 h-8 rounded-full bg-blue-500 shrink-0 overflow-hidden">
                                    {isMine
                                        ? userAuth?.uProPic && <img src={userAuth.uProPic} className="w-full h-full object-cover" />
                                        : selectedUser?.uProPic && <img crossOrigin="anonymous" src={selectedUser.uProPic} className="w-full h-full object-cover" />
                                    }
                                </div>

                                {/* Bubble + Options */}
                                <div className={`flex items-center gap-2 max-w-[60%] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>

                                    {/* Bubble */}
                                    <div className={`px-4 py-2 rounded-2xl text-sm ${isMine ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white/10 border border-white/10 text-gray-900 rounded-bl-none'}`}>
                                        {msg.msgImg && (
                                            <img crossOrigin="anonymous"
                                                onClick={() => setViewMsgImgFile(msg.msgImg)}
                                                src={msg.msgImg}
                                                className="rounded-md mb-2 max-w-[200px] cursor-pointer"
                                            />
                                        )}
                                        {msg.msgTxts && <p>{msg.msgTxts}</p>}
                                        <div className="flex items-center justify-end gap-1 mt-1">
                                            <span className="text-xs opacity-50">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {msg.msgSeen && isMine && <span className="text-xs opacity-50">✓ Seen</span>}
                                        </div>
                                    </div>

                                    {/* Options button — right side for isMine, left for others */}
                                    <div className="relative">
                                        <span
                                            onClick={() => setMsgOpts(isOptsOpen ? null : msg._id)} // ✅ toggle per message
                                            className='text-gray-400 hover:text-gray-600 cursor-pointer text-sm'
                                        >
                                            <SlOptionsVertical />
                                        </span>
                                        {isOptsOpen && ( // ✅ only open for clicked message
                                            <ul className={`absolute z-50 flex flex-col bg-white shadow-md rounded-md p-1 text-gray-700 text-sm w-24 ${isMine ? 'right-6' : 'left-6'} bottom-0`}>
                                                <li className='hover:bg-gray-100 px-2 py-1 rounded cursor-pointer'>Edit</li>
                                                <li className='hover:bg-gray-100 px-2 py-1 rounded cursor-pointer'>Forward</li>
                                                <button onClick={()=> deleteMsg(msg._id)} className='hover:bg-gray-100 px-2 py-1 rounded cursor-pointer text-red-500'>Delete</button>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                <div ref={bottomRef} /> {/* ✅ auto scroll anchor */}
            </div>

            {/* Image preview */}
            {viewMsgImgFile && (
                <div onClick={() => setViewMsgImgFile(null)} className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
                    <div className='relative max-w-2xl max-h-[80vh]'>
                        <span
                            onClick={() => setViewMsgImgFile(null)}
                            className='absolute -top-3 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer text-xs'
                        >x</span>
                        <img onClick={() => setViewMsgImgFile(null)} src={viewMsgImgFile} alt="preview" className='max-w-full max-h-[80vh] rounded-md' />
                    </div>
                </div>
            )}

            {/* Input area */}
            <div className="border-t border-gray-400">
                {previewMsgImgFile && (
                    <div className='px-5 pt-3'>
                        <div className='relative w-20 h-20 rounded-md border border-gray-400 overflow-hidden'>
                            <img src={previewMsgImgFile} alt="preview" className='w-full h-full object-cover' />
                            <span
                                onClick={() =>{ setMsgImgPreview(null); setMsgImgFile(null)}}
                                className='absolute top-0 right-0 bg-black/60 text-white text-xs px-1 cursor-pointer'
                            >x</span>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-4 px-5 py-3">
                    <input
                        type="file"
                        onChange={(a) => setMsgImgFile(a.target.files[0])} // ✅ onChange, not onClick
                        className="hidden"
                        id='msgImg'
                        accept="image/*"
                    />
                    <label htmlFor="msgImg" className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer">+</label>
                    <input
                        type="text"
                        value={msgTxts}
                        onChange={(a) => setMsgTxts(a.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-500"
                    />
                    <button
                        onClick={sendNEWMSg}
                        className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-medium text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OpenChat;