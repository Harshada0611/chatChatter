import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";
//icons & images
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";
import wallpaper from "../../assets/chat-wallpaper.jpg";
// api fuctions
import { send_new_message, fetch_messages } from "../../api-calls/message";

const arr = [
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
  " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electron",
];

const ChatArea = () => {
  const dispatch = useDispatch();
  const loader = useSelector((store) => store.loaderReducer.loader);
  const token = localStorage.getItem("chattoken");
  const username = localStorage.getItem("username");
  const { UserDetails, selectedChat } = useSelector(
    (store) => store.userReducer
  );
  // console.log(selectedChat);
  const receipient = selectedChat?.members?.find(
    (user) => user.name !== username
  );

  const messagesRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom when the component is rendered or messages are updated
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [arr]);

  //send new message
  const [newMessage, setNewMessage] = useState("");
  const handleSendNewMessage = async () => {
    if (!newMessage) {
      return toast.error("Cannot send empty message");
    }
    const message = {
      chat: selectedChat?._id,
      sender: UserDetails?._id,
      text: newMessage,
    };
    try {
      dispatch(showLoader());
      const resp = await send_new_message(message, token);
      dispatch(hideLoader());
      // console.log("", resp);
      if (resp.success) {
        setAllMessages([...allMessages, resp?.savedMessage]);
        setNewMessage(" ");
      }
    } catch (err) {
      dispatch(showLoader());
      console.log(err);
    }
  };

  // fetch chat message
  const [allMessages, setAllMessages] = useState([]);
  const fetchChatMessages = async () => {
    try {
      dispatch(showLoader());
      const resp = await fetch_messages(selectedChat?._id, token);
      dispatch(hideLoader());
      // console.log("chat messages", resp.messages);
      setAllMessages(resp?.messages);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (selectedChat?._id) {
      fetchChatMessages();
    }
  }, [selectedChat]);

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
      <div
        className="h-[78%] w-full p-4  overflow-y-scroll"
        ref={messagesRef}
        style={{ background: `url(${wallpaper})` }}
      >
        <ul
          className={`relative	list-style-type: none space-y-5 flex flex-col `}
        >
          {allMessages?.length
            ? allMessages.map((msg, i) => {
                const createdAtDate = new Date(msg?.createdAt); // Convert to Date object
                const dateObj = {
                  date: createdAtDate.getDate(),
                  month: createdAtDate.getMonth(),
                  year: createdAtDate.getFullYear(),
                  hour: createdAtDate.getHours(),
                  min: createdAtDate.getMinutes(),
                };
                return (
                  <li key={i}>
                    <div
                      className={` w-[75%] border-[1px]  text-mds md:text-md py-2.5  px-2  ${
                        msg?.sender?.name === username
                          ? "md:ml-[16rem] ml-[4rem] bg-green-400 rounded-l-2xl rounded-tr-2xl"
                          : "bg-gray-300 rounded-r-2xl rounded-bl-2xl"
                      }`}
                    >
                      <p className="break-words">{msg?.text}</p>
                    </div>
                    <div
                      className={` flex gap-2   ${
                        msg?.sender?.name === username
                          ? "md:ml-[12rem] ml-[6rem] justify-end"
                          : ""
                      }`}
                    >
                      <p className="text-xs ">
                        {`${dateObj.date}-${dateObj?.month}-${dateObj?.year}`}
                      </p>
                      <p className=" text-xs ">
                        {`${dateObj?.hour}:${dateObj?.min}`}
                      </p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      {/* footer :input box to send message */}
      <div className="h-[12%] w-full border-t-2 border-gray300 rounded-b-md shadow-md shadow-gray-400 px-5 py-4 flex items-center">
        <section className="w-[90%] h-full px-4 border-2 bg-white rounded-md flex items-center gap-5">
          <input
            type="text"
            placeholder="Send Message"
            name="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full  h-full px-6 focus:outline-none "
          />
          <FaRegSmile className="text-xl text-orange-700 cursor-pointer" />
          {loader ? (
            <Loader />
          ) : (
            <IoSend
              className="text-xl cursor-pointer"
              onClick={handleSendNewMessage}
            />
          )}
        </section>
        <section className="w-[10%]  h-full flex justify-center items-center">
          <IoMdImages className="text-2xl cursor-pointer hover:animate-pulse" />
        </section>
      </div>
    </div>
  );
};

export default ChatArea;
