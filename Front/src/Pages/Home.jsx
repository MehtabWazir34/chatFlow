import { useContext, useState } from "react";
import LeftSidebar from "../Parts/UsersList";
import OpenChat from "../Parts/OpenChat";
import OpenProfile from "../Parts/OpenProfile";
// import LoginToAccount from "./Login";
import { Logo } from "../Parts/Logo";
import MsgContext from "../Cntxts/MsgsCntxt";
// import AuthContext from "../Cntxts/Context";
// import MsgContext from "../Cntxts/MsgsCntxt";

function Home() {
  // const { userAuth } = useContext(AuthContext)
  const {selectedUser} = useContext(MsgContext)
  // const [optsDisplay, setOpts] = useState(false);

  return (
    <div className={`h-screen w-full max-w-4xl backdrop-blur-2xl border flex-col rounded-2xl border-gray-200 text-white `}>
    <div className={`sm:hidden md:block h-[96vh] w-full rounded-2xl overflow-y-hidden backdrop-blur-2xl grid grid-cols-1 relative ${ selectedUser ? ' sm:grid-cols-1 md:grid-cols-[1fr_1.5fr_1.5fr] xl:grid-cols-[1fr_2fr_1.5fr]' : ' sm:grid-cols-1 md:grid-cols-2'} `}>
      
     <div className="w-72 h-full flex flex-col overflow-hidden">
        <LeftSidebar />
     </div>
     <div className="sm:flex-col md:flex h-full flex-1 flex-col overflow-y-auto md:overflow-hidden">
        {
          selectedUser ? (
            <>
            <div className={` sm:overflow-auto md:overflow-hidden`}>
            <OpenChat/> 
            </div>
            <div className="hidden md:block w-64 h-full overflow-auto flex-col border-l border-gray-400">
            <OpenProfile />
            </div>
            {/* </div> */}
            </>
          ) : (
            <div className="hidden md:block">
            <Logo/>
            </div>
          )
        }
    </div>
    </div>

    {/* Mobile home */}
    
    </div>
  );
}

export default Home;