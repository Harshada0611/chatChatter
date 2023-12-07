import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//icons
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";

const arr = [
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
];

const ChatArea = () => {
  const username = localStorage.getItem("username");
  const { selectedChat } = useSelector((store) => store.userReducer);
  console.log(selectedChat);
  const receipient = selectedChat?.members?.find(
    (user) => user.name !== username
  );

  const messagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component is rendered or messages are updated
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [arr]);

  return (
    <div className="w-full h-full ">
      {/* header */}
      <header className="w-full h-[10%] bg-blue-400 rounded-t-md px-5  flex items-center gap-5 shadow-lg shadow-gray-400 ">
        <div className="w-10 h-10 flex justify-center items-center bg-gray-200 shadow-sm shadow-black  rounded-full ">
          {receipient?.profilePic ? (
            <img src={receipient?.profilePic} className="rounded-full" />
          ) : (
            <p className="text-2xl ">{receipient?.name[0]}</p>
          )}
        </div>
        <div>
          <h1 className="text-xl">{receipient?.name}</h1>
        </div>
      </header>
      {/* message box */}
      <div className="h-[80%] w-full p-4  overflow-y-scroll" ref={messagesRef}>
        <ul
          className={`relative	list-style-type: none space-y-5 flex flex-col `}
        >
          {arr.map((msg, i) => {
            return (
              <li
                key={i}
                className={` w-[75%] border-[1px] text-xs md:text-sm p-1 rounded-lg px-2  ${
                  i % 2 === 0
                    ? "md:ml-[12rem] ml-[6rem] bg-green-100"
                    : "bg-gray-100"
                }`}
              >
                {msg}
              </li>
            );
          })}
        </ul>
      </div>
      {/* footer :input box to send message */}
      <div className="h-[10%] w-full bg-blue-400 rounded-b-md shadow-md shadow-gray-400 px-5 py-4 flex items-center">
        <section className="w-[90%] h-full px-4 bg-white rounded-full flex items-center gap-5">
          <input
            type=""
            placeholder="Send Message"
            className="w-full  h-full px-6 "
          />
          <FaRegSmile className="text-xl text-orange-700 cursor-pointer" />
          <IoSend className="text-xl cursor-pointer" />
        </section>
        <section className="w-[10%]  h-full flex justify-center items-center">
          <IoMdImages className="text-2xl cursor-pointer hover:animate-pulse" />
        </section>
      </div>
    </div>
  );
};

export default ChatArea;
