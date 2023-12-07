import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    UserDetails: null,
    allChats: [],
    selectedChat: null,
  },

  reducers: {
    SetUserDetails: (state, action) => {
      state.UserDetails = action.payload;
    },
    SetAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    SetSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { SetUserDetails, SetAllChats, SetSelectedChat } =
  userSlice.actions;
