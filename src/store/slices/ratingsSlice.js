import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

export const rateArticle = createAsyncThunk(
  "ratings/rateArticle",
  async ({ articleId, rating }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/ratings/${articleId}`, { rating });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Rating failed"
      );
    }
  }
);

const ratingsSlice = createSlice({
  name: "ratings",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(rateArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(rateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ratingsSlice.reducer;