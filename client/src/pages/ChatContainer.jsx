import { useState } from "react";
import { useNavigate } from "react-router-dom";
// icons and images
import chaticon from "../assets/chat-icon.png";
import { ImSwitch } from "react-icons/im";
// components
import UserSearch from "./chat-components/UserSearch";
import UserList from "./chat-components/UserList";
import ChatBox from "./chat-components/ChatBox";

const ChatContainer = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // handle signout
  const handleSignout = async () => {
    localStorage.clear();
    navigate("/");
  };

  // search user
  const [searchKey, setSearchKey] = useState("");
  const [allSearchedUsers, setAllSearchedUsers] = useState([]);

  return (
    <div className="h-screen w-screen bg-cover bg-[#B2EBF2]">
      <header className="h-[10%] px-5 w-full flex justify-between items-center bg-[#80DEEA]">
        <div className="flex gap-2">
          <img src={chaticon} />
          <h1 className="text-lg font-mono">ChatChatter</h1>
        </div>
        <div className="flex gap-2">
          <h4>{username}</h4>
          <ImSwitch
            className="text-md text-[#004D40] hover:text-[#D50000] cursor-pointer mt-1.5"
            onClick={handleSignout}
          />
        </div>
      </header>

      {/*chat wrapper  */}
      <div className="h-[90%] flex p-3 gap-10 ">
        {/* part 1: user search and list */}
        <div className="w-[35%] h-full">
          <UserSearch
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            allSearchedUsers={allSearchedUsers}
            setAllSearchedUsers={setAllSearchedUsers}
          />
          <UserList searchKey={searchKey} allSearchedUsers={allSearchedUsers} />
        </div>

        {/* part 2: chat area */}
        <div className="w-[60%] rounded-md bg-gray-100">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
