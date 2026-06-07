import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Cntxts/Context'
import { useEffect } from 'react'
import { API_INSTANCE } from '../Utls/API'
import MsgContext from '../Cntxts/MsgsCntxt'
import OpenChat from './OpenChat'

function LeftSidebar() {
    const navigateTo = useNavigate();
    const { LogOut, onlineUsers } = useContext(AuthContext);
    const { Users, unseenMsgs, setUnseenMsgs, selectedUser, setSelectedUser } = useContext(MsgContext);

    const [optsDisplay, setOpts] = useState(false);
    const [srchValue, setSearchValue] = useState('');

    const filteredUsers = srchValue
        ? Users.filter((user) =>
            user.uFullName.toLowerCase().includes(srchValue.toLowerCase()))
        : Users;

    const LogOUT = async (a) => {
        a.preventDefault();
        await LogOut();
        navigateTo('/login');
    };

    return (
        <div className={`flex flex-col h-full w-[320px] pr-8 border-r border-gray-400 ${selectedUser ? 'max-md:hidden' : ''}`}>
            {/* Header */}
            <div className='w-full flex justify-between items-center p-4'>
                <div className='flex flex-col'>
                    <h2 className='text-blue-900/80 text-2xl font-bold'>ChatFlow</h2>
                    <p className='text-gray-700 text-sm'>Instant Messaging</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center justify-center text-gray-700">
                        <span className="text-2xl font-extrabold">+</span>
                    </button>
                    <button onClick={() => setOpts(!optsDisplay)} className="text-gray-700 flex items-center justify-center">
                        <span className="text-2xl font-extrabold">:</span>
                    </button>
                </div>
            </div>

            {optsDisplay && (
                <div className="flex flex-col absolute left-35 top-16 bg-amber-50/70 rounded-md px-2 py-6 max-w-1/5 h-40 text-gray-700 z-21">
                    <Link to={'/profile'} className="hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer p-2">Edit Profile</Link>
                    <span className="hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer p-2">Change Mode</span>
                    <button onClick={LogOUT} className="hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer p-2">Logout</button>
                </div>
            )}

            {/* Search */}
            <div className='my-2 p-4'>
                <input
                    type="text"
                    className='w-full bg-amber-50/25 p-2 rounded-md outline-none text-gray-700'
                    placeholder='Search user'
                    value={srchValue}
                    onChange={(a) => setSearchValue(a.target.value)}
                />
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
                {filteredUsers.length === 0
                    ? <p className='text-center text-gray-500 text-sm mt-4'>No users found</p>
                    : filteredUsers.map((ech, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedUser(ech._id)}
                            className={`flex gap-x-2 place-items-center cursor-pointer hover:bg-amber-100/35 transition-all duration-200 rounded-full p-1 ${selectedUser?._id === ech._id ? 'bg-amber-100/35' : ''}`}
                        >
                            <div className='relative flex items-center justify-center overflow-hidden rounded-full w-12 h-12 bg-blue-500 text-gray-100 shrink-0'>
                                {ech.uProPic
                                    ? <img src={ech.uProPic} alt={ech.uFullName} className='w-full h-full rounded-full object-cover' />
                                    : <span className='text-lg font-bold'>{ech.uFullName.slice(0, 1)}</span>
                                }
                                {onlineUsers.includes(ech._id) &&
                                    <span className='absolute right-1 bottom-1 animate-pulse w-3 h-3 rounded-full border-1 border-black bg-green-500'></span>
                                }
                            </div>
                            <div className='flex flex-col justify-start min-w-0'>
                                <h2 className='font-semibold text-sm text-gray-800 truncate'>{ech.uFullName}</h2>
                                {unseenMsgs[ech] &&
                                    <span className='text-xs text-white bg-blue-500 rounded-full px-2 w-fit'>
                                        {unseenMsgs[ech._id]}
                                    </span>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* {selectedUser && (
                <OpenChat />
            )} */}
        </div>
    );
}

export default LeftSidebar
