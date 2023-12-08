import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// api calls
import { fetchUserDetails } from "../api-calls/user";
import { get_all_chats, create_new_chat } from "../api-calls/chat";
// icons and images
import chaticon from "../assets/chat-icon.png";
import { ImSwitch } from "react-icons/im";
// components
import UserSearch from "./chat-components/UserSearch";
import ChatList from "./chat-components/ChatList";
import ChatArea from "./chat-components/ChatArea";
// redux actions
import { SetUserDetails, SetAllChats } from "../redux/slices/userSlice";

const ChatContainer = () => {
  const token = localStorage.getItem("chattoken");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { UserDetails, allChats, selectedChat } = useSelector(
    (store) => store.userReducer
  );

  // fetch login user details
  const handleFetchUserDetails = async () => {
    try {
      const resp = await fetchUserDetails(token);
      // console.log(resp);
      dispatch(SetUserDetails(resp));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleFetchUserDetails();
  }, []);

  // handle signout
  const handleSignout = async () => {
    localStorage.clear();
    navigate("/");
  };

  // search user
  const [searchKey, setSearchKey] = useState("");
  const [allSearchedUsers, setAllSearchedUsers] = useState([]);

  // fetch active chats
  const getAllActiveChats = async () => {
    try {
      const resp = await get_all_chats(token);
      // console.log("active chats", resp);
      dispatch(SetAllChats(resp?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllActiveChats();
  }, []);

  // create new chat
  const [receipient, setReceipient] = useState({});
  const createNewChat = async () => {
    try {
      const resp = await create_new_chat(
        [UserDetails._id, receipient._id],
        token
      );
      setReceipient({});
      dispatch(SetAllChats([...allChats, resp]));
      getAllActiveChats();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (receipient._id) {
      createNewChat();
    }
  }, [receipient]);

  return (
    <div className="h-screen w-screen bg-cover bg-gray-200">
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
        <div className="w-[25%] h-full">
          <UserSearch
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            allSearchedUsers={allSearchedUsers}
            setAllSearchedUsers={setAllSearchedUsers}
            setReceipient={setReceipient}
          />
          <ChatList
            searchKey={searchKey}
            allSearchedUsers={allSearchedUsers}
            getAllActiveChats={getAllActiveChats}
          />
        </div>
        {/* part 2: chat area */}
        <div className="shadow-lg w-[70%] rounded-md bg-white ">
          {!selectedChat ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-lg text-gray-400">
                Click on user to start conversation
              </p>
            </div>
          ) : (
            <ChatArea getAllActiveChats={getAllActiveChats} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
