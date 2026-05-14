import { useState } from "react";
import LeftSidebar from "../Parts/UsersList";
import OpenChat from "../Parts/OpenChat";
import OpenProfile from "../Parts/OpenProfile";
import LoginToAccount from "./Login";
import { Logo } from "../Parts/Logo";

function Home() {
  const [selectedUser, setUser] = useState(false)
  const [optsDisplay, setOpts] = useState(false);

  return (
    <div className={`min-h-screen max-w-5xl  rounded-2xl backdrop-blur-2xl border p-6 border-gray-200 text-white `}>
    <div className={`min-h-full w-full  overflow-hidden backdrop-blur-2xl grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'} `}>
      
     
        <LeftSidebar selectedUser={selectedUser} setUser={setUser}/>
        {
          selectedUser ? (
            <>
            <OpenChat selectedUser={selectedUser} setUser={setUser}/>
            <OpenProfile selectedUser={selectedUser} setUser={setUser}/>
            </>
          ) : (
            <Logo/>
          )
        }
    </div>
    </div>
  );
}

export default Home;