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
  const { selectedUser } = useContext(MsgContext);

  return (
    <div className="h-screen w-full max-w-4xl backdrop-blur-2xl border rounded-2xl border-gray-200 text-white">
      <div
        className={`h-[96vh] w-full rounded-2xl overflow-hidden grid grid-cols-1 relative
        ${selectedUser
          ? 'md:grid-cols-[1fr_1.5fr_1.5fr] xl:grid-cols-[1fr_2fr_1.5fr]'
          : 'md:grid-cols-2'
        }`}
      >
        {/* Column 1 — Sidebar */}
        <div className={`h-full flex flex-col overflow-hidden ${selectedUser ? 'max-md:hidden' : ''}`}>
          <LeftSidebar />
        </div>

        {/* Column 2 — Chat (only renders when user selected) */}
        {selectedUser && (
          <div className="h-full flex flex-col overflow-hidden">
            <OpenChat />
          </div>
        )}

        {/* Column 3 — Profile (hidden on smaller screens, only on selected) */}
        {selectedUser && (
          <div className="hidden lg:flex h-full flex-col overflow-y-auto border-l border-gray-400">
            <OpenProfile />
          </div>
        )}

        {/* Empty state — only on larger screens, sidebar fills mobile */}
        {!selectedUser && (
          <div className="hidden md:flex items-center justify-center">
            <Logo />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;