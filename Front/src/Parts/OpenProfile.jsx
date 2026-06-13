import React, { useContext, useEffect, useState } from 'react'
import MsgContext from '../Cntxts/MsgsCntxt'

function OpenProfile() {
  const {selectedUser, msgs} = useContext(MsgContext)
  console.log("PROFILE_SLCTDUSR:", selectedUser);
  const [mediaFIles, setMdia] = useState([]);
  const [viewFile, setFIleVIew] = useState(false);
   

  return (
    <div className='w-full flex-1 p-4 flex flex-col gap-y-3 text-gray-900'>
      <div className='flex flex-col items-center justify-center border-b border-gray-500'>
        <div className='rounded-full w-16 h-16 flex items-center justify-center bg-blue-500/80 border border-gray-500'>
        {
          selectedUser?.uProPic ? <img src={selectedUser.uProPic} alt="profile pic" className='rounded-full p-1 border border-black w-full h-full object-cover' /> :
            <span className='text-2xl font-bold'>{selectedUser?.uFullName.slice(0,1)}</span>
        }
        </div>
        <h2 className='text-lg font-semibold text-center w-full'>{selectedUser.uFullName}</h2>
        <p className='text-sm w-full mb-2'>{selectedUser.uBio}</p>
      </div>

        <div className='flex flex-col space-y-2 pb-5 border-b border-gray-500'>
            <h1 className='text-[15px]'>Shared media</h1>
            <div className='grid grid-cols-4 gap-2 [direction:rtl]'>
              {/* { msgs } */}
              { 
                msgs.map((msg)=> (

                  <div key={msg._id} className='[direction:ltr] w-20 h-20 rounded-md border p-0.5'>
                    <img onClick={()=> setFIleVIew(msg.msgImg)} src={msg?.msgImg} alt="msgmedia" className='w-full h-full' />
                    {/* { !msg.msgImg && <p>No shared media</p> } */}
                  </div>
                ))
              }
            </div>
            {/* <div className='flex justify-start gap-1'>
                <div className='w-20 h-20 rounded-md bg-gray-500/15'></div>
                <div className='w-20 h-20 rounded-md bg-blue-50/55'></div>
                <div className='w-20 h-20 rounded-md bg-green-500/80'></div>
            </div> */}
        {
                      viewFile && (
                        <div className='w-10/12 h-11/12 rounded-sm p-2'>
                          <span onClick={()=> setFIleVIew(!viewFile)} className='relative right-1 top-2 rounded-full p-1 cursor-pointer hover:bg-black bg-black/60 transition-colors duration-200 w-4 h-4' >x</span>
                          <img onClick={()=> setFIleVIew(!viewFile)} src={viewFile} alt="viewFile" className='w-full h-full rounded-sm' />
                        </div>
                      )
                    }
        </div>
    </div>
  )
}

export default OpenProfile
