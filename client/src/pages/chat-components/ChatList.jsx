import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// redux action
import { SetSelectedChat } from "../../redux/slices/userSlice";

const ChatList = () => {
  const { UserDetails, allChats, selectedChat } = useSelector(
    (store) => store.userReducer
  );
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

                <p className="text-sm">{receipient?.name}</p>
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
