import React, { useContext, useEffect, useState } from 'react'
import MsgContext from '../Cntxts/MsgsCntxt'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

function OpenProfile() {
  const {selectedUser, setSelectedUser, msgs} = useContext(MsgContext)
  console.log("PROFILE_SLCTDUSR:", selectedUser);
  const [viewFile, setFIleVIew] = useState(false);
   

  const sharedMedia = msgs.filter((msg)=>  msg.msgImg)
  useEffect(()=>{
    sharedMedia;
  }, [sharedMedia])
  console.log('mmm', sharedMedia);
  const navigateTo = useNavigate()
  
  return (
    <div className='w-full flex-1 p-4 flex flex-col gap-y-3 text-gray-900'>
      <div className=' flex flex-col items-center justify-center border-b border-gray-500'>

        <span onClick={()=> navigateTo(-1)} className='absolute bg-gray-500/70 flex place-items-center text-center top-12 left-2 w-6 h-6 rounded-full p-0.5 cursor-pointer'><IoIosArrowRoundBack className='font-extrabold text-xl'/></span>

        {/* Profile pic */}
        <div className='rounded-full w-16 h-16 flex items-center justify-center  border border-gray-500'>
        {
          selectedUser?.uProPic ? <img  src={selectedUser.uProPic} alt="profile pic" className='rounded-full p-1 border border-black w-full h-full object-cover' /> :
            <span className='text-2xl font-bold'>{selectedUser?.uFullName.slice(0,1)}</span>
        }
        </div>
        <h2 className='text-lg font-semibold text-center w-full'>{selectedUser.uFullName}</h2>
        <p className='text-sm w-full mb-2'>{selectedUser.uBio}</p>
      </div>

        <div className='flex flex-col space-y-2 pb-5 border-b border-gray-500'>
            <h1 className='text-[15px]'>Shared media</h1>
            <div className='grid grid-cols-4 gap-2 overflow-y-auto max-h-64'>
              {sharedMedia.length === 0
    ? <p className="text-xs text-gray-500">No shared media yet</p>
    : sharedMedia.map((msg) => (
        <div key={msg._id} className='w-20 h-20 rounded-md border p-0.5 overflow-hidden cursor-pointer'>
            <img 
                onClick={() => setFIleVIew(msg.msgImg)}
                src={msg.msgImg}
                alt="media"
                className='w-full h-full object-cover rounded-md'
            />
        </div>
    ))
}
            </div>
        {
                      viewFile && (
                        <div className='fixed inset-0 z-50 grid place-items-center bg-black/60'>
                        <div className='relative max-w-2xl max-h-[80vh] rounded-sm'>
                          <span onClick={()=> setFIleVIew(!viewFile)} className='absolute right-0 -top-3 rounded-full p-1 cursor-pointer hover:bg-black/80 bg-black transition-colors duration-200 w-6 h-6 flex items-center justify-center text-white' >x</span>
                          <img onClick={()=> setFIleVIew(!viewFile)} src={viewFile} alt="viewFile" className='max-w-full max-h-[80vh] rounded-sm' />
                        </div>
                        </div>
                      )
                    }
        </div>
    </div>
  )
}

export default OpenProfile
