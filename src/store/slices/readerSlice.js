import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// ✅ EXPORT THIS PROPERLY
export const getReaderDashboard = createAsyncThunk(
  "reader/getDashboard",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/reader/dashboard");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard"
      );
    }
  }
);

const readerSlice = createSlice({
  name: "reader",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getReaderDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReaderDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getReaderDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default readerSlice.reducer;