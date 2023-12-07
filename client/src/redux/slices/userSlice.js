import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allChats: [],
    selectedChat: null,
  },

  reducers: {
    SetAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    SetSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { SetAllChats, SetSelectedChat } = userSlice.actions;
