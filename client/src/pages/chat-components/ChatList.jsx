import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// redux action
import { SetSelectedChat } from "../../redux/slices/userSlice";
// api functions
import { clear_unread_messages } from "../../api-calls/chat";

const ChatList = ({ getAllActiveChats }) => {
  const { UserDetails, allChats, selectedChat } = useSelector(
    (store) => store.userReducer
  );
  const dispatch = useDispatch();

  // handle select chat and show
  const [isChatSelected, setIsChatSelected] = useState(null);
  const handleSelectChat = async () => {
    dispatch(SetSelectedChat(isChatSelected));
  };
  useEffect(() => {
    if (isChatSelected?._id) {
      handleSelectChat();
    }
  }, [isChatSelected]);

  // handle clear all chats
  const clearUnreadMessages = async () => {
    try {
      const resp = await clear_unread_messages(selectedChat?._id);
      // console.log("clear chat messages", resp);
      getAllActiveChats();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (selectedChat?._id) {
      clearUnreadMessages();
      getAllActiveChats();
    }
  }, [selectedChat]);

  return (
    <div className="space-y-2 my-2 py-1 ">
      {allChats?.length ? (
        <div className="h-[33rem] overflow-y-auto space-y-2 ">
          {allChats.map((chat, i) => {
            const receipient = chat?.members?.find(
              (user) => user.name !== UserDetails.name
            );
            // console.log(receipient);
            return (
              <div
                onClick={() => setIsChatSelected(chat)}
                key={i}
                className={`w-full border-[1px] bg-white ${
                  selectedChat?._id === chat?._id ? "border-2 border-black" : ""
                } 
                rounded-md  flex  items-center gap-2 py-2 px-1 
                ${
                  selectedChat?._id === chat?._id ? "" : "hover:bg-green-50"
                } cursor-pointer`}
              >
                <div className="">
                  {!receipient?.profilePic ? (
                    <p className="h-full">
                      <h1 className="h-full uppercase text-lg rounded-full w-10 text-center py-1.5 font-medium text-black bg-gray-100 ">
                        {receipient?.name[0]}
                      </h1>
                    </p>
                  ) : (
                    <img
                      src={receipient?.profilePic}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                </div>
                <div className="w-[72%]">
                  <p className="text-sm font-bold">{receipient?.name}</p>
                  {chat?.lastMessage ? (
                    <p className="text-xs flex gap-1 ">
                      <span className="">
                        {chat?.lastMessage?.sender?.name === UserDetails?.name
                          ? "You :"
                          : ""}
                      </span>
                      <span>{chat?.lastMessage?.text.slice(0, 20)}...</span>
                    </p>
                  ) : null}
                </div>
                <div>
                  {chat?.lastMessage ? (
                    <div className="py-1  text-center  ">
                      {chat?.unreadMessages === 0 ? null : (
                        <p className="w-7 h-6  text-center rounded-full bg-blue-400 text-black">
                          {chat?.unreadMessages}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center text-gray-500 mt-[10rem]">
          <p>You have no active chats</p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
