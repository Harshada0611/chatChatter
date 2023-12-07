import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { loader: false },
  reducers: {
    showLoader: (state) => {
      state.loader = true;
    },
    hideLoader: (state) => {
      state.loader = false;
    },
  },
});

export default loaderSlice.reducer;
export const { showLoader, hideLoader } = loaderSlice.actions;
