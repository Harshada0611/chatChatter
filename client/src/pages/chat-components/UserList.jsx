const UserList = (searchKey, allSearchedUsers) => {
  return (
    <div className="space-y-2 my-2 py-1">
      {[...Array(5)].map((ele, i) => {
        return (
          <div
            key={i}
            className="border-[1px] bg-white rounded-md  flex items-center gap-2 py-1 px-1"
          >
            <p className="h-full">
              <h1 className="h-full uppercase text-lg  rounded-full w-10 text-center py-1.5 font-medium text-black bg-gray-100 ">
                J
              </h1>
            </p>
            <p className="text-sm">username</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
