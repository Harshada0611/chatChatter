import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// redux action
import { SetSelectedChat } from "../../redux/slices/userSlice";

const ChatList = () => {
  const { UserDetails, allChats, selectedChat } = useSelector(
    (store) => store.userReducer
  );
  console.log("selected chat", selectedChat);
  const dispatch = useDispatch();

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
                onClick={() => dispatch(SetSelectedChat(chat))}
                key={i}
                className={`border-[1px] ${
                  selectedChat?._id === chat?._id ? "bg-blue-200" : "bg-white"
                } 
                rounded-md  flex items-center gap-2 py-2 px-1 
                ${
                  selectedChat?._id === chat?._id ? "" : "hover:bg-green-100"
                } cursor-pointer`}
              >
                <div>
                  {!receipient?.profilePic ? (
                    <p className="h-full">
                      <h1 className="h-full uppercase text-lg  rounded-full w-10 text-center py-1.5 font-medium text-black bg-gray-100 ">
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
                <div>
                  <p className="text-sm font-bold">{receipient?.name}</p>
                  {chat?.lastMessage ? (
                    <p className="text-xs flex justify-between gap-1">
                      <span>
                        {chat?.lastMessage?.sender?.name === UserDetails?.name
                          ? "You"
                          : chat?.lastMessage?.sender?.name}
                      </span>
                      :<span>{chat?.lastMessage?.text}</span>
                    </p>
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
