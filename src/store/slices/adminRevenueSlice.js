import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// 🔥 FETCH MONTHLY REVENUE
export const fetchRevenue = createAsyncThunk(
  "adminRevenue/fetchRevenue",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/revenue");
      return res.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed"
      );
    }
  }
);

// 🔥 FETCH TOP CAMPAIGNS
export const fetchTopCampaigns = createAsyncThunk(
  "adminRevenue/fetchTopCampaigns",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/top-campaigns");
      return res.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed"
      );
    }
  }
);

// ✅ INITIAL STATE
const initialState = {
  revenueData: [],
  topCampaigns: [],
  loading: false,
  error: null,
};

const adminRevenueSlice = createSlice({
  name: "adminRevenue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 REVENUE
      .addCase(fetchRevenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueData = action.payload || [];
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 TOP CAMPAIGNS
      .addCase(fetchTopCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.topCampaigns = action.payload || [];
      })
      .addCase(fetchTopCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminRevenueSlice.reducer;