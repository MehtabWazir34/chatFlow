import React from 'react'

function OpenProfile({selectedUser, setUser}) {
  return (
    <div className='w-75 p-4 flex flex-col gap-y-3 text-gray-900'>
      <div className='flex flex-col items-center justify-center border-b border-gray-500'>
        <div className='rounded-full w-16 h-16 flex items-center justify-center bg-blue-500/80 border border-gray-500'>
            <span className='text-2xl font-bold'>MW</span>
        </div>
        <p className='text-sm w-full my-2'>Hey, I'm using ChatFlow for Instant chats.</p>
      </div>

        <div className='flex flex-col space-y-2 pb-5 border-b border-gray-500'>
            <h1 className='text-[15px]'>Shared media</h1>
            <div className='flex justify-start gap-1'>
                <div className='w-14 h-14 rounded-md bg-green-500/80'></div>
                <div className='w-14 h-14 rounded-md bg-gray-500/15'></div>
                <div className='w-14 h-14 rounded-md bg-blue-50/55'></div>
                <div className='w-14 h-14 rounded-md bg-yellow-500/75'></div>
            </div>
        </div>
    </div>
  )
}

export default OpenProfile
