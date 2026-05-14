import React, { useState } from 'react'

function LeftSidebar({selectedUser, setUser}) {
    const users = [
        { id: 2, name:"Wazir Khan", msg:"6ry ye?", },
        { id: 1, name:"Aqib", msg:"?",},
        { id: 3, name:"Khanii", msg:"Hmm...", },
        { id: 4, name:"Albaik ", msg:"No", },
        { id: 5, name:"Waz", msg:"Really?", },
    ]

    const [optsDisplay, setOpts] = useState(false)
  return (
        <div className={`flex flex-col w-[320px] border-r border-gray-400 ${selectedUser ? 'max-md:hidden' : ''}`}>
            {/* Hdr */}
            <div className='w-full flex justify-between items-center p-4'>
                {/* LeftLogo */}
                <div className='flex flex-col'>
                    <h2 className='text-blue-900/80 text-2xl font-bold'>ChatFlow</h2>
                    <p className='text-gray-700 text-sm'>Instant Messaging</p>
                </div>
                {/* Right icons */}
                <div className="flex gap-2">

          <button className=" flex items-center justify-center text-gray-700 ">
            <span className="text-2xl font-extrabold ">+</span>
          </button>
          <button onClick={()=> setOpts(!optsDisplay)} className=" text-gray-700 flex items-center justify-center">
            <span className="text-2xl font-extrabold">:</span>
          </button>
          </div>
            </div>
            {
            optsDisplay && (
              <div className="flex flex-col absolute left-35  top-16 bg-amber-50/70 rounded-md px-2 py-6 max-w-1/5 h-40 text-gray-700 inset-0 z-21">
                  <span className="hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer p-2">Edit Profile</span>
                  <span className="hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer p-2">Change Mode</span>
                  <span className="hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer p-2">Logout</span>
              </div>
            )
          }

            {/* SearchBar */}
            <div className='my-2 p-4 '>
                <input type="text" className='w-full bg-amber-50/25 p-2 rounded-md outline-none text-gray-700 ' placeholder='Search contact' />
            </div>
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
            {
                users.map((ech, idx)=>(
                    <div onClick={()=> {setUser(ech)}} key={idx} className='flex gap-x-2 place-items-start cursor-pointer hover:bg-amber-100/35 transition-all duration-200 rounded-full'>
                        <div className='flex items-center justify-center rounded-full w-12 h-12 bg-blue-500 text-gray-100'>
                            <span className='text-lg font-bold'>{ech.name.slice(0,1)}</span>
                        </div>
                        <div className='flex flex-col justify-start'>
                            <h2 className='font-semibold text-lg gap-1 flex items-center'>{ech.name}
                            <span className='w-3 h-3 rounded-full z-10 border border-yellow-400 bg-green-600 animate-pulse '></span>
                            </h2>
                            <p className='text-xs '>{ech.msg}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>

  )
}

export default LeftSidebar
