//icons
import { FaSearch } from "react-icons/fa";
// api actions
import { searchUser } from "../../api-calls/user";
import { useEffect } from "react";

const UserSearch = ({
  searchKey,
  setSearchKey,
  allSearchedUsers,
  setAllSearchedUsers,
  setReceipient,
}) => {
  const token = localStorage.getItem("chattoken");

  //search user
  const handleSearhcUser = async () => {
    // console.log(searchKey);
    try {
      const resp = await searchUser(searchKey, token);
      // console.log(resp?.findUsers);
      setAllSearchedUsers(resp?.findUsers);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchKey.length) {
      handleSearhcUser();
    }
  }, [searchKey]);

  return (
    <div className="w-full relative">
      <section className="w-full py-2 px-3 flex justify-center items-center bg-white rounded-full ">
        <FaSearch />
        <input
          type="text"
          className="w-full px-2 focus:outline-none"
          placeholder="Search by name/email"
          name="searchKey"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </section>

      {allSearchedUsers.length && searchKey.length ? (
        <section className="z-10 absolute mt-2 w-full h-[35rem] overflow-y-auto bg-blue-900/90 px-2 rounded-md py-2 shadow-xl shadow-blue-800 ">
          <p className="text-blue-100">{allSearchedUsers.length} users</p>
          <div className="space-y-3 py-1.5 ">
            {allSearchedUsers.map((user) => {
              return (
                <div
                  onClick={() => {
                    setReceipient(user);
                    setSearchKey("");
                  }}
                  key={user._id}
                  className="border-[1px] bg-white rounded-md  flex items-center gap-2 py-1 px-1 hover:bg-green-100 cursor-pointer"
                >
                  {user.profilePic && (
                    <img src={user.profilePic} className="w-8 h-8" />
                  )}
                  {!user.profilePic && (
                    <p className="h-full">
                      <h1 className="h-full uppercase text-lg  rounded-full w-10 text-center py-1.5 font-medium text-black bg-gray-100 ">
                        {user.name[0]}
                      </h1>
                    </p>
                  )}
                  <p className="text-sm">{user.name}</p>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default UserSearch;
