import { createSlice } from "@reduxjs/toolkit";

const uiMessageSlice = createSlice({
  name: "uiMessage",
  initialState: {
    message: "",
    type: "success",
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    clearToast: (state) => {
      state.message = "";
    },
  },
});

export const { showToast, clearToast } = uiMessageSlice.actions;
export default uiMessageSlice.reducer;