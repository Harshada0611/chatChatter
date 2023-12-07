import { useSelector } from "react-redux";

const UserList = () => {
  const allChats = useSelector((store) => store.userReducer.allChats);

  return (
    <div className="space-y-2 my-2 py-1  ">
      {allChats.length ? (
        <div>
          {allChats.map((chat, i) => {
            return (
              <div
                key={i}
                className="border-[1px] bg-white rounded-md  flex items-center gap-2 py-1 px-1 hover:bg-green-100 cursor-pointer"
              >
                <p className="h-full">
                  <h1 className="h-full uppercase text-lg  rounded-full w-10 text-center py-1.5 font-medium text-black bg-gray-100 ">
                    J
                  </h1>
                </p>
                <p className="text-sm">{console.log(chat)}</p>
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

export default UserList;
